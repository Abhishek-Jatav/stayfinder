"use client";

import { useState } from "react";
import { fetchFilteredListings } from "../../../lib/actions";




export default function ListingsPage() {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [listings, setListings] = useState<
    Array<{
      id: number;
      image: string;
      title: string;
      location: string;
      price: number;
    }>
  >([]);

  const search = async () => {
    const data = await fetchFilteredListings({
      location,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
    });
    setListings(data);
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="border p-2 rounded"
        />
        <input
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
          type="number"
          className="border p-2 rounded"
        />
        <input
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
          type="number"
          className="border p-2 rounded"
        />
        <button
          onClick={search}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="border p-4 rounded">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-lg font-bold">{listing.title}</h2>
            <p>{listing.location}</p>
            <p>₹{listing.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
