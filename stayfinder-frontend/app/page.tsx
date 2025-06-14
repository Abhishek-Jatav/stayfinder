import PropertyCard from "./component/PropertyCard";
import { fetchListings } from "../lib/api";

export default async function Home() {
  const listings = await fetchListings();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Explore Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map((listing: any) => (
          <PropertyCard
            key={listing.id}
            id={listing.id}
            image={listing.image}
            location={listing.location}
            title={listing.title}
            price={listing.price}
          />
        ))}
      </div>
    </div>
  );
}
