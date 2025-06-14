"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingForm({
  listingId,
  userId,
}: {
  listingId: number;
  userId: number;
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const totalPrice = parseFloat(price); // Simplified; calculate dynamically if needed

    const res = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        listingId,
        startDate,
        endDate,
        totalPrice,
      }),
    });

    if (res.ok) {
      alert("Booking successful!");
      router.push("/");
    } else {
      alert("Booking failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Book
      </button>
    </form>
  );
}
