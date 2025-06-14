"use client";

import { useState } from "react";

export function FavoriteButton({ listingId }: { listingId: number }) {
  const [isFavorite, setIsFavorite] = useState(false); // ideally fetched on load

  async function toggle() {
    const res = await fetch(`http://localhost:3000/favorites/${listingId}`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) setIsFavorite(!isFavorite);
  }

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-full ${
        isFavorite ? "text-red-500" : "text-gray-400"
      }`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
      {isFavorite ? "💖" : "🤍"}
    </button>
  );
}
