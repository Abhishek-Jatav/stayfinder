"use client";

import { useEffect, useState } from "react";
import { fetchHostBookings } from "@/lib/actions";

export default function HostBookingsPage() {
  const userId = 1; // replace with real auth later
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchHostBookings(userId);
      setBookings(data);
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bookings on Your Listings</h2>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{booking.listing.title}</h3>
            <p>Location: {booking.listing.location}</p>
            <p>Booked by: {booking.user.email}</p>
            <p>
              {new Date(booking.startDate).toLocaleDateString()} →{" "}
              {new Date(booking.endDate).toLocaleDateString()}
            </p>
            <p>Total Price: ₹{booking.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
