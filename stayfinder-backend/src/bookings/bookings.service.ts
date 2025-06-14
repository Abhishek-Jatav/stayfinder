// src/bookings/bookings.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new booking
  async create(userId: number, dto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        userId,
        listingId: dto.listingId,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        totalPrice: dto.totalPrice,
      },
    });
  }

  // Get bookings for the currently logged-in user
  async getBookingsForUser(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { listing: true },
      orderBy: { startDate: 'desc' },
    });
  }

  // Admin or host: Get all bookings
  async getAllBookings() {
    return this.prisma.booking.findMany({
      include: {
        listing: true,
        user: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  // Admin only
  async getAllBookingsForAdmin() {
    return this.prisma.booking.findMany({
      include: {
        user: true,
        listing: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  // Get bookings where host is the listing owner
  async getBookingsForHost(userId: number) {
    return this.prisma.booking.findMany({
      where: {
        listing: {
          userId,
        },
      },
      include: {
        listing: true,
        user: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  // Cancel a booking with auth checks
  async cancelBooking(bookingId: string, userId: number, isAdmin = false) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) throw new Error('Booking not found');

    if (!isAdmin && booking.userId !== userId)
      throw new Error('Not authorized to cancel this booking');

    const now = new Date();
    if (!isAdmin && new Date(booking.startDate) <= now)
      throw new Error('Cannot cancel past or ongoing booking');

    return this.prisma.booking.delete({
      where: { id: bookingId },
    });
  }

  // Admin can get bookings by any user ID
  async getBookingsByUserId(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        listing: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  // Duplicate of getBookingsForUser - used by controller
  async findByUser(userId: number) {
    return this.getBookingsForUser(userId);
  }

  // Optional: if you want a method to fetch all raw bookings (already covered above)
  async findAll() {
    return this.getAllBookings();
  }
}
