"use client";

import { fetchUserBookings, cancelBooking } from "../../../../lib/actions";
import { useState } from "react";
import { useEffect } from "react";

export default async function BookingsPage() {
  const userId = 1; // Replace with real user auth later
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchUserBookings(userId);
      setBookings(data);
    };
    load();
  }, []);

  const handleCancel = async (id: string) => {
    await cancelBooking(id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{booking.listing.title}</h3>
            <p>{booking.listing.location}</p>
            <p>
              {new Date(booking.startDate).toLocaleDateString()} →{" "}
              {new Date(booking.endDate).toLocaleDateString()}
            </p>
            <p>Total: ₹{booking.totalPrice}</p>
            <button
              className="mt-2 text-sm text-red-600 hover:underline"
              onClick={() => handleCancel(booking.id)}>
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
