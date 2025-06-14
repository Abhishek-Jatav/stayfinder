import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.statergy'; // ✅ Import JwtStrategy
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // ✅ Add Prisma

@Module({
  imports: [
    PrismaModule, // ✅ Use PrismaModule instead of TypeOrmModule
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // ✅ Add JwtStrategy to providers
  exports: [AuthService, JwtModule], // ✅ Export AuthService and JwtModule
})
export class AuthModule {}
