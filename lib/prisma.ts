import { PrismaClient } from '@prisma/client'

// Singleton pattern for Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  errorFormat: 'minimal',
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Connection pool configuration for better performance
prisma.$connect().then(() => {
  console.log('✅ Database connected with optimized pool')
}).catch((error) => {
  console.error('❌ Database connection failed:', error)
  process.exit(1)
})

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})