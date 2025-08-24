import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const settlements = await prisma.settlement.findMany({
      include: {
        lines: {
          include: {
            partner: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json(settlements)
  } catch (error) {
    console.error('Error fetching settlements:', error)
    return NextResponse.json(
      { error: 'خطأ في جلب المخالصات' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.settlementNo || !data.date || !data.type || !data.lines || data.lines.length === 0) {
      return NextResponse.json(
        { error: 'جميع الحقول المطلوبة يجب ملؤها' },
        { status: 400 }
      )
    }

    // Check if settlement number already exists
    const existingSettlement = await prisma.settlement.findUnique({
      where: { settlementNo: data.settlementNo }
    })

    if (existingSettlement) {
      return NextResponse.json(
        { error: 'رقم المخالصة موجود مسبقاً' },
        { status: 400 }
      )
    }

    // Create settlement with lines
    const settlement = await prisma.settlement.create({
      data: {
        settlementNo: data.settlementNo,
        date: new Date(data.date),
        type: data.type,
        status: data.status || 'draft',
        totalAmount: data.totalAmount || 0,
        note: data.note,
        lines: {
          create: data.lines.map((line: any) => ({
            partnerId: line.partnerId,
            amount: line.amount,
            type: line.type,
            description: line.description
          }))
        }
      },
      include: {
        lines: {
          include: {
            partner: true
          }
        }
      }
    })

    return NextResponse.json(settlement)
  } catch (error) {
    console.error('Error creating settlement:', error)
    return NextResponse.json(
      { error: 'خطأ في إنشاء المخالصة' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'معرف المخالصة مطلوب' },
        { status: 400 }
      )
    }

    const data = await request.json()

    // Update settlement
    const settlement = await prisma.settlement.update({
      where: { id },
      data: {
        date: data.date ? new Date(data.date) : undefined,
        type: data.type,
        status: data.status,
        totalAmount: data.totalAmount,
        note: data.note,
      },
      include: {
        lines: {
          include: {
            partner: true
          }
        }
      }
    })

    return NextResponse.json(settlement)
  } catch (error) {
    console.error('Error updating settlement:', error)
    return NextResponse.json(
      { error: 'خطأ في تحديث المخالصة' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'معرف المخالصة مطلوب' },
        { status: 400 }
      )
    }

    // Delete settlement (this will also delete related lines due to cascade)
    await prisma.settlement.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting settlement:', error)
    return NextResponse.json(
      { error: 'خطأ في حذف المخالصة' },
      { status: 500 }
    )
  }
}