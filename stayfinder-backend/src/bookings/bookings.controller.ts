// src/bookings/bookings.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Request } from 'express';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // Admin or Host can fetch all bookings
  @UseGuards(RolesGuard)
  @Roles('admin', 'host')
  @Get()
  getAllBookings() {
    return this.bookingsService.getAllBookings();
  }

  // Admin-only endpoint to get all bookings
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('admin')
  getAdminBookings() {
    return this.bookingsService.getAllBookingsForAdmin();
  }

  // Fetch bookings for currently logged-in user
  @Get('me')
  getMyBookings(@Req() req: Request) {
    const user = req.user as any;
    return this.bookingsService.findByUser(user.userId);
  }

  // Get bookings by userId (admin can use this)
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('user/:userId')
  getBookingsByUser(@Param('userId') userId: string) {
    return this.bookingsService.getBookingsByUserId(Number(userId));
  }

  // Get bookings for a host by their user ID
  @UseGuards(RolesGuard)
  @Roles('admin', 'host')
  @Get('host/:userId')
  getHostBookings(@Param('userId') userId: string) {
    return this.bookingsService.getBookingsForHost(Number(userId));
  }

  // Create a new booking
  @Post()
  create(@Req() req: Request, @Body() dto: CreateBookingDto) {
    const user = req.user as any;
    return this.bookingsService.create(user.userId, dto);
  }

  // Cancel booking by currently logged-in user
  @Delete(':id')
  cancelMyBooking(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.bookingsService.cancelBooking(id, user.userId);
  }

  // Admin cancels any booking
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete('admin/:id')
  adminCancelBooking(@Param('id') id: string) {
    return this.bookingsService.cancelBooking(id, 0, true);
  }
}
