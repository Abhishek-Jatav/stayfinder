// src/bookings/dto/create-booking.dto.ts
import { IsDateString, IsInt, IsUUID, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  listingId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  totalPrice: number;
}
