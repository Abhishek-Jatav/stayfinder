import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ListingsModule } from './listings/listings.module';
import { ListingsService } from './listings/listings.service';
import { PrismaModule } from './prisma/prisma.module'; // ✅ Add this
import { BookingsModule } from './bookings/bookings.module';
import { AdminModule } from './admin/admin.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, // ✅ Use Prisma, not TypeORM
    AuthModule,
    ListingsModule,
    BookingsModule,
    AdminModule,
    ReviewsModule,
    FavoritesModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly listingsService: ListingsService) {}

  async onApplicationBootstrap() {
    const shouldSeed = process.env.SEED_DUMMY_DATA === 'true';
    if (shouldSeed) {
      try {
        await this.listingsService.createDummyData();
        console.log('✅ Dummy listings created successfully');
      } catch (err) {
        console.error('❌ Error creating dummy listings:', err);
      }
    }
  }
}
