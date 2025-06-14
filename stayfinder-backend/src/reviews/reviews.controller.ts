import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // ✅ Create a review (auth required)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: Request,
    @Body() dto: { listingId: number; rating: number; comment: string },
  ) {
    const user = req.user as any;
    return this.reviewsService.createReview(user.userId, dto);
  }

  // ✅ Get all reviews for a listing
  @Get('listing/:id')
  async getReviews(@Param('id') listingId: string) {
    return this.reviewsService.getListingReviews(Number(listingId));
  }

  // ✅ Get average rating for a listing
  @Get('listing/:id/average')
  async getAverageRating(@Param('id') listingId: string) {
    return this.reviewsService.getAverageRating(Number(listingId));
  }
}
