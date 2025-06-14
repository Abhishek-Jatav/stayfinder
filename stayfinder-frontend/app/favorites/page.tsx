"use client";

type Listing = {
  id: number;
  title: string;
  location: string;
  price: number;
};

type UserWithFavorites = {
  favorites: Listing[];
};

export default async function FavoritesPage() {
  const res = await fetch("http://localhost:3000/favorites", {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    return <p className="text-red-500">Failed to load favorites.</p>;
  }

  const user: UserWithFavorites = await res.json();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      {user.favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {user.favorites.map((listing) => (
            <div key={listing.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{listing.title}</h2>
              <p className="text-gray-600">{listing.location}</p>
              <p className="text-blue-600 font-bold">₹{listing.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
