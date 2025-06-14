"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateListing() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // ✅ Get JWT token

    if (!token) {
      alert("You must be logged in to create a listing.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include token
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price), // Ensure price is number
        }),
      });

      if (res.ok) {
        router.push("/host/dashboard");
      } else {
        const error = await res.json();
        console.error("Failed to create listing:", error.message || res.status);
        alert("Failed to create listing: " + (error.message || res.status));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Check console for details.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          onChange={handleChange}
          value={form.title}
          placeholder="Title"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          onChange={handleChange}
          value={form.description}
          placeholder="Description"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="location"
          onChange={handleChange}
          value={form.location}
          placeholder="Location"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="price"
          onChange={handleChange}
          value={form.price}
          placeholder="Price"
          type="number"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="image"
          onChange={handleChange}
          value={form.image}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
