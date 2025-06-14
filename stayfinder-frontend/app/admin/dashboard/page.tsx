"use client";

import { useEffect, useState } from "react";
import { fetchAdminListings, fetchAdminBookings } from "@/lib/actions";

export default function AdminDashboard() {
  const [listings, setListings] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const l = await fetchAdminListings();
      const b = await fetchAdminBookings();
      setListings(l);
      setBookings(b);
    };
    loadData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">All Listings</h2>
        <div className="grid gap-4">
          {listings.map((listing) => (
            <div key={listing.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{listing.title}</h3>
              <p>{listing.location}</p>
              <p>Host: {listing.user.email}</p>
              <p>Bookings: {listing.bookings.length}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border p-4 rounded shadow">
              <p>
                <strong>Listing:</strong> {booking.listing.title}
              </p>
              <p>
                <strong>User:</strong> {booking.user.email}
              </p>
              <p>
                <strong>Dates:</strong>{" "}
                {new Date(booking.startDate).toLocaleDateString()} →{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
              <p>Total: ₹{booking.totalPrice}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
