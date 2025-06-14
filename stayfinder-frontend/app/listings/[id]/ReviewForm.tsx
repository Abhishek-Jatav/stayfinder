"use client";

import { useState } from "react";

export function SubmitReview({ listingId }: { listingId: number }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  async function submit() {
    const res = await fetch("http://localhost:3000/reviews", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId, rating, comment }),
    });

    if (res.ok) {
      alert("Review submitted!");
      setComment("");
    } else {
      alert("Error submitting review");
    }
  }

  return (
    <div className="space-y-2 mt-4">
      <label>Rating: {rating}⭐</label>
      <input
        type="range"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(+e.target.value)}
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border w-full p-2"
        placeholder="Write your review..."
      />
      <button
        onClick={submit}
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit Review
      </button>
    </div>
  );
}
