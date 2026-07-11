"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function ReviewForm({
  bookId,
  onReviewAdded,
}: {
  bookId: string;
  onReviewAdded: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("একটি রেটিং দিন");
      return;
    }
    if (!comment.trim()) {
      setError("একটি মন্তব্য লিখুন");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify({ bookId, rating, comment }),
      });
      setRating(0);
      setComment("");
      onReviewAdded();
    } catch (err: any) {
      setError(err.message || "রিভিউ যোগ করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-5">
      <h4 className="font-semibold text-neutral mb-3">আপনার মতামত দিন</h4>

      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setRating(i + 1)}
            onMouseEnter={() => setHoverRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Star
              size={24}
              className={
                i < (hoverRating || rating)
                  ? "text-secondary fill-secondary"
                  : "text-gray-300"
              }
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="বইটি সম্পর্কে আপনার মতামত লিখুন..."
        rows={3}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "জমা হচ্ছে..." : "রিভিউ জমা দিন"}
      </button>
    </form>
  );
}