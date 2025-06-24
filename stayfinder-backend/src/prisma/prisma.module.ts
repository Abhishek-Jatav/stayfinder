import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ✅ optional but makes Prisma globally available
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ✅ export so other modules can use it
})
export class PrismaModule {}
