export async function fetchUserBookings(userId: number) {
  const res = await fetch(`http://localhost:3000/bookings/user/${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}



export async function cancelBooking(bookingId: string) {
  const res = await fetch(`http://localhost:3000/bookings/${bookingId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to cancel booking");
  return res.json();
}
  

export async function fetchHostBookings(userId: number) {
  const res = await fetch(`http://localhost:3000/bookings/host/${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch host bookings");
  return res.json();
}
  

export async function fetchAdminListings() {
  const res = await fetch("http://localhost:3000/listings/admin", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
}

export async function fetchAdminBookings() {
  const res = await fetch("http://localhost:3000/bookings/admin", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}
  
// lib/fetchListings.ts
export async function fetchListings(page = 1) {
  const res = await fetch(`http://localhost:3000/listings?page=${page}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json(); // returns { data, total, page, lastPage }
}


export async function fetchFilteredListings(query: {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const params = new URLSearchParams();

  if (query.location) params.append("location", query.location);
  if (query.minPrice) params.append("minPrice", String(query.minPrice));
  if (query.maxPrice) params.append("maxPrice", String(query.maxPrice));

  const res = await fetch(
    `http://localhost:3000/listings?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch listings");

  return res.json();
}
