// app/listings/[id]/page.tsx

import BookingForm from "./booking-form";
import { SubmitReview } from "./ReviewForm";
import { ListingReviews } from "./Reviews";

// You must define or import this function correctly.
// Example placeholder:
async function fetchListingById(id: number) {
  const res = await fetch(`http://localhost:3000/listings/${id}`);
  if (!res.ok) throw new Error("Failed to fetch listing");
  return res.json();
}

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const listingId = parseInt(params.id);
  const listing = await fetchListingById(listingId);

  // ⚠️ In production, get from auth token/session
  const userId = 1;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
      <p className="mb-4 text-gray-600">{listing.location}</p>
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-auto mb-6 rounded"
      />
      <p className="mb-4">{listing.description}</p>
      <p className="font-semibold mb-6">Price: ₹{listing.price}</p>

      {/* Booking Form */}
      <h2 className="text-xl font-semibold mb-2">Book this listing</h2>
      <BookingForm listingId={listingId} userId={userId} />

      {/* Reviews */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Reviews</h2>
      <ListingReviews listingId={listingId} />

      {/* Review Submission */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Leave a Review</h2>
      <SubmitReview listingId={listingId} />
    </div>
  );
}


