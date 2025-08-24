'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/react-query'
import { parseApiResponse } from '@/lib/api-utils'

interface Client {
  id: string
  code: string
  name: string
  phone?: string
  email?: string
  address?: string
  note?: string
  createdAt: string
  _count?: {
    contracts: number
    projects: number
    installments: number
  }
}

// Fetch clients with caching
export function useClients(search?: string) {
  return useQuery({
    queryKey: [...queryKeys.clients(), { search }],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      
      const response = await fetch(`/api/clients?${params}`)
      if (!response.ok) throw new Error('Failed to fetch clients')
      
      return response.json() as Promise<Client[]>
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Create client with optimistic update
export function useCreateClient() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: Omit<Client, 'id' | 'code' | 'createdAt'>) => {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await parseApiResponse(response)
      if (!response.ok) throw new Error(result.error || 'Failed to create client')
      
      return result as Client
    },
    onMutate: async (newClient) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.clients() })
      
      // Snapshot the previous value
      const previousClients = queryClient.getQueryData(queryKeys.clients())
      
      // Optimistically update to the new value
      queryClient.setQueryData(queryKeys.clients(), (old: Client[] = []) => [
        {
          ...newClient,
          id: 'temp-' + Date.now(),
          code: 'TEMP',
          createdAt: new Date().toISOString(),
        },
        ...old,
      ])
      
      // Return a context object with the snapshotted value
      return { previousClients }
    },
    onError: (err, newClient, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousClients) {
        queryClient.setQueryData(queryKeys.clients(), context.previousClients)
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.clients() })
    },
  })
}

// Update client
export function useUpdateClient() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Client> }) => {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await parseApiResponse(response)
      if (!response.ok) throw new Error(result.error || 'Failed to update client')
      
      return result as Client
    },
    onSuccess: (data) => {
      // Update the specific client in cache
      queryClient.setQueryData(queryKeys.client(data.id), data)
      // Invalidate the list to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.clients() })
    },
  })
}

// Delete client
export function useDeleteClient() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete client')
    },
    onSuccess: (_, id) => {
      // Remove from cache immediately
      queryClient.setQueryData(queryKeys.clients(), (old: Client[] = []) =>
        old.filter(client => client.id !== id)
      )
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: queryKeys.clients() })
    },
  })
}