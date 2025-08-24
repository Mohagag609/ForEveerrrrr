'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileSpreadsheet, FileText } from "lucide-react"
import { useToast } from "@/lib/hooks/useToast"

interface ExportButtonProps {
  data: any[]
  filename: string
  columns?: Array<{
    key: string
    label: string
  }>
  title?: string
}

export function ExportButton({ 
  data, 
  filename, 
  columns,
  title = "تصدير البيانات" 
}: ExportButtonProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleExportExcel = async () => {
    setLoading(true)
    try {
      // Lazy load xlsx library
      const XLSX = await import('xlsx')
      
      // Prepare data for export
      const exportData = data.map(item => {
        if (columns) {
          const row: any = {}
          columns.forEach(col => {
            row[col.label] = item[col.key] || ''
          })
          return row
        }
        return item
      })

      // Create workbook
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(exportData)
      
      // Auto-size columns
      const maxWidths: any = {}
      exportData.forEach(row => {
        Object.keys(row).forEach(key => {
          const value = String(row[key] || '')
          maxWidths[key] = Math.max(maxWidths[key] || 10, value.length + 2)
        })
      })
      
      ws['!cols'] = Object.keys(maxWidths).map(key => ({ wch: maxWidths[key] }))
      
      XLSX.utils.book_append_sheet(wb, ws, 'البيانات')
      XLSX.writeFile(wb, `${filename}.xlsx`)
      
      toast({
        title: "تم التصدير بنجاح",
        description: "تم تصدير البيانات إلى ملف Excel"
      })
    } catch (error) {
      console.error('Export error:', error)
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء تصدير البيانات",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleExportPDF = async () => {
    setLoading(true)
    try {
      // Lazy load pdfmake library
      const pdfMake = (await import('pdfmake/build/pdfmake')).default
      const pdfFonts = (await import('pdfmake/build/vfs_fonts')).default
      pdfMake.vfs = pdfFonts.pdfMake.vfs

      // Add Arabic font
      pdfMake.fonts = {
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Medium.ttf',
          italics: 'Roboto-Italic.ttf',
          bolditalics: 'Roboto-MediumItalic.ttf'
        }
      }

      // Prepare table data
      const tableHeaders = columns 
        ? columns.map(col => ({ text: col.label, style: 'tableHeader' }))
        : Object.keys(data[0] || {}).map(key => ({ text: key, style: 'tableHeader' }))

      const tableBody = data.map(item => {
        if (columns) {
          return columns.map(col => String(item[col.key] || ''))
        }
        return Object.values(item).map(val => String(val || ''))
      })

      // Create PDF document
      const docDefinition: any = {
        content: [
          { text: title, style: 'header' },
          { text: new Date().toLocaleDateString('ar-EG'), style: 'date' },
          { text: ' ', margin: [0, 10] },
          {
            table: {
              headerRows: 1,
              widths: Array(tableHeaders.length).fill('*'),
              body: [
                tableHeaders,
                ...tableBody
              ]
            },
            layout: 'lightHorizontalLines'
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },
          date: {
            fontSize: 10,
            alignment: 'center',
            color: '#666'
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            color: 'black',
            fillColor: '#f3f4f6'
          }
        },
        defaultStyle: {
          alignment: 'right',
          direction: 'rtl'
        }
      }

      pdfMake.createPdf(docDefinition).download(`${filename}.pdf`)
      
      toast({
        title: "تم التصدير بنجاح",
        description: "تم تصدير البيانات إلى ملف PDF"
      })
    } catch (error) {
      console.error('Export error:', error)
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء تصدير البيانات",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={loading} className="gap-2">
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              جاري التصدير...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              تصدير
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportExcel}>
          <FileSpreadsheet className="ml-2 h-4 w-4" />
          تصدير Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF}>
          <FileText className="ml-2 h-4 w-4" />
          تصدير PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}