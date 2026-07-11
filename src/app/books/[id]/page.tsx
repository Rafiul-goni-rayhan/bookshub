"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, BookOpen, Tag, Calendar } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Book, Review } from "@/types";
import { useSession } from "@/lib/auth-client";
import StarRating from "@/components/books/StarRating";
import ReviewForm from "@/components/books/ReviewForm";
import BookCard from "@/components/books/BookCard";
import BookCardSkeleton from "@/components/books/BookCardSkeleton";

export default function BookDetailsPage() {
  const params = useParams();
  const bookId = params.id as string;
  const { data: session } = useSession();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookData();
  }, [bookId]);

  const fetchBookData = async () => {
    setLoading(true);
    try {
      const bookRes = await apiFetch(`/api/books/${bookId}`);
      setBook(bookRes.data);

      const reviewsRes = await apiFetch(`/api/reviews/${bookId}`);
      setReviews(reviewsRes.data);

      // একই genre এর related বই আনা
      const relatedRes = await apiFetch(
        `/api/books?genre=${encodeURIComponent(bookRes.data.genre)}&limit=4`
      );
      setRelatedBooks(
        relatedRes.data.filter((b: Book) => b._id !== bookId).slice(0, 4)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          <div className="h-96 bg-gray-200 rounded-xl" />
          <div className="flex flex-col gap-3">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">বইটি পাওয়া যায়নি।</p>
        <Link href="/books" className="text-primary font-medium mt-4 inline-block">
          বই খুঁজতে ফিরে যান
        </Link>
      </div>
    );
  }

  const conditionLabels: { [key: string]: string } = {
    new: "নতুন",
    "like-new": "প্রায় নতুন",
    good: "ভালো",
    fair: "মোটামুটি",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Top section: Image + Overview */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
          {book.images?.[0] ? (
            <img src={book.images[0]} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <BookOpen className="text-gray-300" size={80} />
          )}
        </div>

        <div>
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
            {book.genre}
          </span>
          <h1 className="text-3xl font-bold text-neutral mb-2">{book.title}</h1>
          <p className="text-gray-500 mb-4">লেখক: {book.author}</p>

          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-sm text-gray-500">
                ({reviews.length}টি রিভিউ)
              </span>
            </div>
          )}

          <p className="text-2xl font-bold text-primary mb-6">৳{book.price}</p>

          <p className="text-gray-600 mb-6">{book.shortDescription}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-primary" />
              {book.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Tag size={16} className="text-primary" />
              {conditionLabels[book.condition]}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-primary" />
              {new Date(book.createdAt).toLocaleDateString("bn-BD")}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  book.availability === "available"
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {book.availability === "available" ? "উপলব্ধ" : "অনুপলব্ধ"}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            পোস্টকারী: <span className="font-medium text-neutral">{book.postedBy?.name}</span>
          </p>
        </div>
      </div>

      {/* Full Description */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-neutral mb-3">বিস্তারিত বিবরণ</h2>
        <p className="text-gray-600 leading-relaxed">{book.fullDescription}</p>
      </div>

      {/* Reviews Section */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-neutral mb-5">রিভিউ ও রেটিং</h2>

        {session ? (
          <div className="mb-6">
            <ReviewForm bookId={bookId} onReviewAdded={fetchBookData} />
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            রিভিউ দিতে হলে{" "}
            <Link href="/login" className="text-primary font-medium">
              লগইন করুন
            </Link>
          </p>
        )}

        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">এখনো কোনো রিভিউ নেই। প্রথম রিভিউ দিন!</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div key={review._id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-neutral text-sm">
                    {review.userId?.name}
                  </span>
                  <StarRating rating={review.rating} size={14} />
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Items */}
      {relatedBooks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-neutral mb-5">সম্পর্কিত বই</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBooks.map((b) => (
              <BookCard key={b._id} book={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}