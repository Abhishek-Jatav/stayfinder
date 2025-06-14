"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
}

export default function HostDashboard() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [listings, setListings] = useState<Listing[]>([]);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Get token on first render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  // ✅ Fetch my listings if token is present
  useEffect(() => {
    if (!token) return;

    const fetchListings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/listings/my-listings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setListings(res.data);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
      }
    };

    fetchListings();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await axios.post(
        "/api/listings",
        {
          ...form,
          price: Number(form.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        alert("Listing created!");
        setForm({
          title: "",
          description: "",
          location: "",
          price: "",
          image: "",
        });

        // Refresh listings
        const updated = await axios.get("/api/listings/my-listings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setListings(updated.data);
      }
    } catch (err) {
      console.error("Create error:", err);
      setError("Error creating listing");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price per night"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Create Listing
        </button>
      </form>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listings.map((listing) => (
            <div key={listing.id} className="p-4 border rounded-xl shadow">
              <img
                src={listing.image}
                alt={listing.title}
                className="mb-2 w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-semibold">{listing.title}</h2>
              <p className="text-sm text-gray-600">{listing.location}</p>
              <p className="mt-2">₹{listing.price}/night</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
