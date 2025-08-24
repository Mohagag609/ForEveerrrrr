import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 بدء عملية البذر...')

  // 1. إنشاء الحسابات الأساسية
  console.log('📊 إنشاء الحسابات الأساسية...')
  
  const accounts = await Promise.all([
    prisma.account.create({
      data: {
        code: 'ACC-001',
        name: 'الصندوق الرئيسي',
        type: 'CASH',
        balance: 0,
        description: 'الصندوق النقدي الرئيسي للشركة'
      }
    }),
    prisma.account.create({
      data: {
        code: 'ACC-002',
        name: 'البنك الأهلي',
        type: 'BANK',
        balance: 0,
        description: 'حساب البنك الأهلي التجاري'
      }
    }),
    prisma.account.create({
      data: {
        code: 'ACC-003',
        name: 'حساب العملاء',
        type: 'RECEIVABLE',
        balance: 0,
        description: 'حساب مديونية العملاء'
      }
    }),
    prisma.account.create({
      data: {
        code: 'ACC-004',
        name: 'حساب الموردين',
        type: 'PAYABLE',
        balance: 0,
        description: 'حساب مديونية الموردين'
      }
    })
  ])

  console.log(`✅ تم إنشاء ${accounts.length} حسابات`)

  // 2. إنشاء الصندوق
  console.log('💰 إنشاء الصندوق...')
  
  const cashbox = await prisma.cashbox.create({
    data: {
      name: 'الصندوق الرئيسي',
      balance: 0,
      description: 'الصندوق النقدي الرئيسي'
    }
  })

  console.log('✅ تم إنشاء الصندوق')

  // 3. إنشاء المخزن الرئيسي
  console.log('🏭 إنشاء المخزن...')
  
  const warehouse = await prisma.warehouse.create({
    data: {
      code: 'WH-001',
      name: 'المخزن الرئيسي',
      location: 'الرياض',
      manager: 'أحمد محمد',
      phone: '0501234567'
    }
  })

  console.log('✅ تم إنشاء المخزن')

  // 4. إنشاء بعض المواد الأساسية
  console.log('📦 إنشاء المواد الأساسية...')
  
  const materials = await Promise.all([
    prisma.material.create({
      data: {
        code: 'MAT-001',
        name: 'أسمنت',
        unit: 'كيس',
        unitPrice: 25,
        minQuantity: 100,
        currentQuantity: 0,
        warehouseId: warehouse.id
      }
    }),
    prisma.material.create({
      data: {
        code: 'MAT-002',
        name: 'حديد تسليح',
        unit: 'طن',
        unitPrice: 5000,
        minQuantity: 10,
        currentQuantity: 0,
        warehouseId: warehouse.id
      }
    }),
    prisma.material.create({
      data: {
        code: 'MAT-003',
        name: 'رمل',
        unit: 'متر مكعب',
        unitPrice: 80,
        minQuantity: 50,
        currentQuantity: 0,
        warehouseId: warehouse.id
      }
    })
  ])

  console.log(`✅ تم إنشاء ${materials.length} مواد أساسية`)



  console.log('\n🎉 تمت عملية البذر بنجاح!')
  
  // عرض ملخص
  console.log('\n📊 ملخص البيانات المنشأة:')
  console.log(`- الحسابات: ${accounts.length}`)
  console.log(`- الصناديق: 1`)
  console.log(`- المخازن: 1`)
  console.log(`- المواد: ${materials.length}`)

}

main()
  .catch((e) => {
    console.error('❌ خطأ في عملية البذر:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })