import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'error', 'warn'],
    errorFormat: 'pretty',
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Test database connection on initialization
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((e) => {
    console.error('❌ Database connection failed:', e);
  });


