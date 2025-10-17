import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async executeTransaction<T>(
    fn: (prisma: PrismaClient) => Promise<T>,
  ): Promise<T> {
    return this.$transaction(fn);
  }

  async safeQuery<T>(
    queryFn: () => Promise<T>,
    defaultValue?: T,
  ): Promise<T | null> {
    try {
      return await queryFn();
    } catch (error) {
      console.error('Prisma Query Error:', error);
      return defaultValue ?? null;
    }
  }
}
