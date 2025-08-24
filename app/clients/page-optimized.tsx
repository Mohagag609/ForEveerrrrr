'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DataTable } from "@/components/ui/data-table"
import { MotionSection } from "@/components/ui/motion-section"
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb"
import { Plus, Mail, Phone, MapPin } from "lucide-react"
import { ExportButton } from "@/components/export/export-button"
import { ImportButton } from "@/components/import/import-button"
import { useClients, useCreateClient, useUpdateClient, useDeleteClient } from "@/lib/hooks/use-clients"
import { useToast } from "@/lib/hooks/useToast"
import { useDebounce } from '@/lib/hooks/use-debounce'
import type { ColumnDef } from "@tanstack/react-table"

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
  }
}

export default function ClientsPageOptimized() {
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: ''
  })
  
  const { toast } = useToast()
  const debouncedSearch = useDebounce(searchTerm, 300)
  
  // React Query hooks
  const { data: clients = [], isLoading } = useClients(debouncedSearch)
  const createMutation = useCreateClient()
  const updateMutation = useUpdateClient()
  const deleteMutation = useDeleteClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingClient) {
        await updateMutation.mutateAsync({
          id: editingClient.id,
          data: formData
        })
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات العميل"
        })
      } else {
        await createMutation.mutateAsync(formData)
        toast({
          title: "تم الإضافة بنجاح",
          description: "تم إضافة العميل الجديد"
        })
      }
      
      setShowForm(false)
      setEditingClient(null)
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        note: ''
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      phone: client.phone || '',
      email: client.email || '',
      address: client.address || '',
      note: client.note || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العميل؟')) {
      try {
        await deleteMutation.mutateAsync(id)
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف العميل"
        })
      } catch (error) {
        toast({
          title: "خطأ في الحذف",
          description: "لا يمكن حذف العميل",
          variant: "destructive"
        })
      }
    }
  }

  const handleImport = async (data: any[]) => {
    // Process imports in batches for better performance
    const batchSize = 10
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)
      await Promise.all(
        batch.map(row => {
          if (row.name) {
            return createMutation.mutateAsync(row)
          }
        })
      )
    }
  }

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "code",
      header: "الكود",
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("code")}</Badge>
      ),
    },
    {
      accessorKey: "name",
      header: "اسم العميل",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "رقم الهاتف",
      cell: ({ row }) => {
        const phone = row.getValue("phone") as string
        return phone ? (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span dir="ltr">{phone}</span>
          </div>
        ) : null
      },
    },
    {
      accessorKey: "email",
      header: "البريد الإلكتروني",
      cell: ({ row }) => {
        const email = row.getValue("email") as string
        return email ? (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{email}</span>
          </div>
        ) : null
      },
    },
    {
      id: "stats",
      header: "الإحصائيات",
      cell: ({ row }) => {
        const client = row.original
        return (
          <div className="flex gap-2">
            {client._count?.contracts && client._count.contracts > 0 && (
              <Badge variant="secondary">
                {client._count.contracts} عقد
              </Badge>
            )}
            {client._count?.projects && client._count.projects > 0 && (
              <Badge variant="secondary">
                {client._count.projects} مشروع
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "الإجراءات",
      cell: ({ row }) => {
        const client = row.original
        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(client)}
            >
              تعديل
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(client.id)}
              disabled={deleteMutation.isLoading}
            >
              حذف
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <MotionSection className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>العملاء</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">العملاء</h1>
          <p className="text-muted-foreground">إدارة بيانات العملاء</p>
        </div>
        <div className="flex gap-2">
          <ImportButton
            onImport={handleImport}
            columns={[
              { key: 'name', label: 'اسم العميل', required: true },
              { key: 'phone', label: 'رقم الهاتف' },
              { key: 'email', label: 'البريد الإلكتروني' },
              { key: 'address', label: 'العنوان' },
              { key: 'note', label: 'ملاحظات' }
            ]}
            templateName="clients"
          />
          <ExportButton
            data={clients}
            filename="clients"
            title="قائمة العملاء"
            columns={[
              { key: 'code', label: 'كود العميل' },
              { key: 'name', label: 'اسم العميل' },
              { key: 'phone', label: 'رقم الهاتف' },
              { key: 'email', label: 'البريد الإلكتروني' },
              { key: 'address', label: 'العنوان' }
            ]}
          />
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="بحث في العملاء..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={clients}
            loading={isLoading}
            onAdd={() => {
              setEditingClient(null)
              setFormData({
                name: '',
                phone: '',
                email: '',
                address: '',
                note: ''
              })
              setShowForm(true)
            }}
            emptyStateTitle="لا يوجد عملاء"
            emptyStateDescription="ابدأ بإضافة أول عميل"
          />
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingClient ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}
            </DialogTitle>
            <DialogDescription>
              {editingClient ? 'قم بتحديث بيانات العميل' : 'أدخل بيانات العميل الجديد'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم العميل *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">العنوان</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="note">ملاحظات</Label>
                <Input
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                إلغاء
              </Button>
              <Button 
                type="submit" 
                disabled={createMutation.isLoading || updateMutation.isLoading}
              >
                {createMutation.isLoading || updateMutation.isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    جاري الحفظ...
                  </>
                ) : editingClient ? 'تحديث' : 'حفظ'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </MotionSection>
  )
}