// listings.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findFiltered(filters: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    return this.prisma.listing.findMany({
      where: {
        location: filters.location
          ? { contains: filters.location, mode: 'insensitive' }
          : undefined,
        price: {
          gte: filters.minPrice,
          lte: filters.maxPrice,
        },
      },
    });
  }

  async getAllListings(page = 1, limit = 6) {
    const skip = (page - 1) * limit;

    const [listings, total] = await this.prisma.$transaction([
      this.prisma.listing.findMany({
        skip,
        take: limit,
        orderBy: { id: 'desc' }, // you can also sort by createdAt if field exists
      }),
      this.prisma.listing.count(),
    ]);

    return {
      data: listings,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async searchAndFilterListings(query: {
    location?: string;
    title?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    return this.prisma.listing.findMany({
      where: {
        location: query.location
          ? { contains: query.location, mode: 'insensitive' }
          : undefined,
        title: query.title
          ? { contains: query.title, mode: 'insensitive' }
          : undefined,
        price: {
          ...(query.minPrice !== undefined && { gte: query.minPrice }),
          ...(query.maxPrice !== undefined && { lte: query.maxPrice }),
        },
      },
    });
  }

  async getAllListingsForAdmin() {
    return this.prisma.listing.findMany({
      include: {
        user: true,
        bookings: true,
      },
    });
  }

  async getAll() {
    return this.prisma.listing.findMany();
  }

  async getById(id: number) {
    if (!id) throw new Error('Listing ID is required');

    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) throw new NotFoundException('Listing not found');
    return listing;
  }

  async findByHostId(hostId: number) {
    return this.prisma.listing.findMany({
      where: {
        userId: hostId,
      },
    });
  }

  async create(dto: CreateListingDto, userId: number) {
    if (!userId) throw new Error('User ID is required to create a listing');

    return this.prisma.listing.create({
      data: {
        title: dto.title,
        description: dto.description,
        location: dto.location,
        price: dto.price,
        image: dto.image,
        userId,
      },
    });
  }

  async createDummyData() {
    const count = await this.prisma.listing.count();
    if (count > 0) return;

    let user = await this.prisma.user.findUnique({
      where: { email: 'demo@example.com' },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: 'demo@example.com',
          password: await bcrypt.hash('password123', 10),
        },
      });
    }

    await this.prisma.listing.createMany({
      data: [
        {
          title: 'Beachfront Bungalow',
          description: 'A beautiful bungalow near the beach.',
          location: 'Goa, India',
          price: 3000,
          image: 'https://source.unsplash.com/400x300/?beach,house',
          userId: user.id,
        },
        {
          title: 'Mountain Cabin',
          description: 'Cozy cabin in the hills of Manali.',
          location: 'Manali, India',
          price: 2500,
          image: 'https://source.unsplash.com/400x300/?mountain,cabin',
          userId: user.id,
        },
      ],
    });
  }
}
