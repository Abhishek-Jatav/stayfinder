import { Controller } from '@nestjs/common';
import { Post, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post(':listingId')
  async toggle(@Param('listingId') listingId: string, @Req() req: Request) {
    const user = req.user as any;
    return this.favoritesService.toggleFavorite(user.id, +listingId);
  }

  @Get()
  async getFavorites(@Req() req: Request) {
    const user = req.user as any;
    return this.favoritesService.getUserFavorites(user.id);
  }
}
