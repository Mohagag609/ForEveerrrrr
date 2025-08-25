import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            code: true
          }
        },
        supplier: {
          select: {
            id: true,
            name: true,
            code: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json(
      { error: 'خطأ في جلب الفواتير' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.invoiceNo || !data.date || !data.type || !data.totalAmount) {
      return NextResponse.json(
        { error: 'جميع الحقول المطلوبة يجب ملؤها' },
        { status: 400 }
      )
    }

    // Check if invoice number already exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { invoiceNo: data.invoiceNo }
    })

    if (existingInvoice) {
      return NextResponse.json(
        { error: 'رقم الفاتورة موجود مسبقاً' },
        { status: 400 }
      )
    }

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNo: data.invoiceNo,
        date: new Date(data.date),
        type: data.type,
        clientId: data.type === 'sales' && data.clientId ? data.clientId : undefined,
        supplierId: data.type === 'purchase' && data.supplierId ? data.supplierId : undefined,
        totalAmount: data.totalAmount,
        taxAmount: data.taxAmount || 0,
        discount: data.discount || 0,
        status: data.status || 'draft',
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        notes: data.notes
      },
      include: {
        client: true,
        supplier: true
      }
    })

    return NextResponse.json(invoice)
  } catch (error) {
    console.error('Error creating invoice:', error)
    return NextResponse.json(
      { error: 'خطأ في إنشاء الفاتورة' },
      { status: 500 }
    )
  }
}