import Link from "next/link";

interface Props {
  image: string;
  location: string;
  title: string;
  price: number;
  id: number;
}

export default function PropertyCard({
  image,
  location,
  title,
  price,
  id,
}: Props) {
  return (
    <Link href={`/listings/${id}`}>
      <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-500">{location}</p>
          <p className="text-indigo-600 font-bold mt-2">₹{price}/night</p>
        </div>
      </div>
    </Link>
  );
}
