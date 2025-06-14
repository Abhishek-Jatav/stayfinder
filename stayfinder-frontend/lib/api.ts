export async function fetchListings() {
  const res = await fetch("http://localhost:3000/listings", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
}


export async function fetchListingById(id: string) {
  const res = await fetch(`http://localhost:3000/listings/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch listing");
  return res.json();
}
