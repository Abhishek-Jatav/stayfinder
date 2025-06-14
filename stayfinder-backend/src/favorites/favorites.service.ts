import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async toggleFavorite(userId: number, listingId: number) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_listingId: { userId, listingId } },
    });

    if (existing) {
      await this.prisma.favorite.delete({
        where: { userId_listingId: { userId, listingId } },
      });
      return { message: 'Removed from favorites' };
    }

    await this.prisma.favorite.create({ data: { userId, listingId } });
    return { message: 'Added to favorites' };
  }

  async getUserFavorites(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        favorites: true,
      },
    });
  }
}
