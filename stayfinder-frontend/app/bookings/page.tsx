"use client";
import { useEffect, useState } from "react";

// Define the expected shape of booking data
type Booking = {
  id: number;
  listing: {
    title: string;
    location: string;
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
};

export default function BookingHistory() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/bookings/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    load();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b) => {
          const future = new Date(b.startDate) > new Date();
          return (
            <div key={b.id} className="border rounded p-4 mb-2">
              <h3 className="text-lg font-medium">{b.listing?.title}</h3>
              <p>{b.listing?.location}</p>
              <p>
                {new Date(b.startDate).toLocaleDateString()} -{" "}
                {new Date(b.endDate).toLocaleDateString()}
              </p>
              <p>₹{b.totalPrice}</p>

              {future && (
                <button
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                  onClick={async () => {
                    const token = localStorage.getItem("token");
                    if (!token) return;

                    const res = await fetch(
                      `http://localhost:3000/bookings/${b.id}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    if (res.ok) {
                      setBookings((prev) =>
                        prev.filter((bk) => bk.id !== b.id)
                      );
                    } else {
                      alert("Error cancelling booking");
                    }
                  }}>
                  Cancel Booking
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
