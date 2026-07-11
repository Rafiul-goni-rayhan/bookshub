import { Star } from "lucide-react";

export default function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "text-secondary fill-secondary" : "text-gray-300"}
        />
      ))}
    </div>
  );
}