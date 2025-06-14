// app/listings/page.tsx or app/search/page.tsx

'use client';
import { useState } from 'react';

export default function SearchListings() {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const params = new URLSearchParams({
      location,
      minPrice,
      maxPrice,
    });

    const res = await fetch(`http://localhost:3000/listings/search?${params.toString()}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="p-4 space-y-4">
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
      <input value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min Price" type="number" />
      <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max Price" type="number" />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.map((listing: any) => (
          <div key={listing.id}>
            <h3>{listing.title}</h3>
            <p>{listing.location} - ₹{listing.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
