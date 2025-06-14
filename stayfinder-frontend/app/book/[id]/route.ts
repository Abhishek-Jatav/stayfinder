// app/book/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const listingId = params.id;

  // Here you would normally extract the user ID from session.
  const guestId = "some-guest-id"; // TEMP hardcoded

  try {
    const booking = await prisma.booking.create({
      data: {
        listingId,
        guestId,
        startDate: new Date(), // Replace with actual values
        endDate: new Date(), // Replace with actual values
      },
    });

    return NextResponse.redirect(new URL("/bookings/confirmation", req.url));
  } catch (err) {
    console.error(err);
    return new NextResponse("Error creating booking", { status: 500 });
  }
}
