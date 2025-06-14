// app/listings/page.tsx

import { FavoriteButton } from "../component/FavoriteButton";
import { fetchListings } from "../../lib/actions";
import Link from "next/link";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch paginated listings
  const { data: listings, lastPage } = await fetchListings(currentPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Listings (Page {currentPage})</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listings.map((listing: any) => (
          <div key={listing.id} className="border p-4 rounded shadow">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 object-cover rounded"
            />
            <div className="mt-2">
              <h2 className="text-xl font-semibold">{listing.title}</h2>
              <p className="text-gray-600">{listing.location}</p>
              <p className="text-gray-800 font-bold">₹{listing.price}</p>
            </div>

            {/* 💖 Favorite Button */}
            <div className="mt-2 flex justify-end">
              <FavoriteButton listingId={listing.id} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-4">
        {currentPage > 1 && (
          <Link
            href={`?page=${currentPage - 1}`}
            className="px-4 py-2 border rounded hover:bg-gray-100">
            Previous
          </Link>
        )}
        {currentPage < lastPage && (
          <Link
            href={`?page=${currentPage + 1}`}
            className="px-4 py-2 border rounded hover:bg-gray-100">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
