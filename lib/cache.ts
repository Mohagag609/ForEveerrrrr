import { unstable_cache } from 'next/cache'

// Cache configurations
export const CACHE_TAGS = {
  clients: 'clients',
  suppliers: 'suppliers',
  projects: 'projects',
  units: 'units',
  contracts: 'contracts',
  invoices: 'invoices',
  payments: 'payments',
  installments: 'installments',
  accounts: 'accounts',
  all: 'all-data'
} as const

// Cache durations in seconds
export const CACHE_DURATIONS = {
  short: 60, // 1 minute
  medium: 300, // 5 minutes
  long: 900, // 15 minutes
  veryLong: 3600 // 1 hour
} as const

// Reusable cache wrapper
export function cacheQuery<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyParts: string[],
  options?: {
    revalidate?: number
    tags?: string[]
  }
): T {
  return unstable_cache(
    fn,
    keyParts,
    {
      revalidate: options?.revalidate ?? CACHE_DURATIONS.medium,
      tags: options?.tags ?? []
    }
  ) as T
}

// Cache invalidation helper
export async function invalidateCache(tags: string | string[]) {
  const { revalidateTag } = await import('next/cache')
  const tagsArray = Array.isArray(tags) ? tags : [tags]
  
  for (const tag of tagsArray) {
    revalidateTag(tag)
  }
}