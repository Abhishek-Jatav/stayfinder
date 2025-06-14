"use client";
import { useEffect, useState } from "react";

export function ListingReviews({ listingId }: { listingId: number }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(
        `http://localhost:3000/reviews/listing/${listingId}`
      );
      const data = await res.json();
      setReviews(data);

      const avg = await fetch(
        `http://localhost:3000/reviews/listing/${listingId}/average`
      );
      const avgData = await avg.json();
      setAvgRating(avgData);
    }
    fetchReviews();
  }, [listingId]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">
        Average Rating: {avgRating.toFixed(1)}⭐
      </h3>
      <ul className="space-y-2 mt-2">
        {reviews.map((r) => (
          <li key={r.id} className="border p-3 rounded">
            <p className="font-medium">{r.user.email}</p>
            <p>{r.rating}⭐</p>
            <p>{r.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
