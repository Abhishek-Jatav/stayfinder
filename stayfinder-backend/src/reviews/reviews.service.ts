import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

interface CreateReviewDto {
  listingId: number;
  rating: number;
  comment: string;
}

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(userId: number, dto: CreateReviewDto) {
    return this.prisma.review.create({
      data: {
        userId,
        listingId: dto.listingId,
        rating: dto.rating,
        comment: dto.comment,
      },
    });
  }

  async getListingReviews(listingId: number) {
    return this.prisma.review.findMany({
      where: { listingId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            // Add any other user fields you'd like to return
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAverageRating(listingId: number) {
    const result = await this.prisma.review.aggregate({
      where: { listingId },
      _avg: {
        rating: true,
      },
    });

    return result._avg.rating ?? 0;
  }
}
