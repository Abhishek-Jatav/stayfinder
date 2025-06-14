// listings.controller.ts

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  findAll(
    @Query('location') location?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    return this.listingsService.findFiltered({
      location,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    });
  }

  @Get('search')
  async search(@Query() query: any) {
    return this.listingsService.searchAndFilterListings({
      location: query.location,
      title: query.title,
      minPrice: query.minPrice ? parseFloat(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? parseFloat(query.maxPrice) : undefined,
    });
  }

  @Get('admin')
  getAdminListings() {
    return this.listingsService.getAllListingsForAdmin();
  }

  @Get('/my-listings')
  @UseGuards(JwtAuthGuard)
  async getMyListings(@Req() req: Request) {
    const userId = (req.user as any).id;
    return this.listingsService.findByHostId(userId);
  }

  @Get()
  getAll(@Query('page') page: string, @Query('limit') limit: string) {
    return this.listingsService.getAllListings(
      Number(page) || 1,
      Number(limit) || 6,
    );
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.listingsService.getById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateListingDto, @Req() req: Request) {
    const userId = (req.user as any).id;
    return this.listingsService.create(dto, userId);
  }
}
