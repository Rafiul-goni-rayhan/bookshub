import Link from "next/link";
import { MapPin, BookOpen } from "lucide-react";
import { Book } from "@/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full">
      <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
        {book.images?.[0] ? (
          <img
            src={book.images[0]}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <BookOpen className="text-gray-300" size={40} />
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-neutral line-clamp-1 mb-1">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{book.author}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
          {book.shortDescription}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {book.location}
          </span>
          <span className="font-semibold text-primary text-sm">
            ৳{book.price}
          </span>
        </div>

        <Link
          href={`/books/${book._id}`}
          className="w-full text-center py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition"
        >
          বিস্তারিত দেখুন
        </Link>
      </div>
    </div>
  );
}