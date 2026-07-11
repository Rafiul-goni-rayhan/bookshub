"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Book } from "@/types";
import BookCard from "@/components/books/BookCard";
import BookCardSkeleton from "@/components/books/BookCardSkeleton";

const genres = ["সব", "উপন্যাস", "সাই-ফাই", "রোমান্টিক", "একাডেমিক", "ইতিহাস", "আত্ম-উন্নয়ন", "কবিতা", "অন্যান্য"];

function BooksExplore() {
  const searchParams = useSearchParams();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [genre, setGenre] = useState(searchParams.get("genre") || "সব");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, [genre, sortBy, order, page]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (genre !== "সব") params.set("genre", genre);
      params.set("sortBy", sortBy);
      params.set("order", order);
      params.set("page", String(page));
      params.set("limit", "8");

      const res = await apiFetch(`/api/books?${params.toString()}`);
      setBooks(res.data);
      setTotalPages(res.pagination.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchBooks();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral mb-2">বই খুঁজুন</h1>
        <p className="text-gray-500">আপনার পছন্দের বইটি খুঁজে নিন</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5 mb-8 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="বইয়ের নাম বা লেখক দিয়ে খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:opacity-90"
          >
            খুঁজুন
          </button>
        </form>

        <div className="flex flex-wrap gap-3 items-center">
          <SlidersHorizontal size={16} className="text-gray-400" />

          <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="createdAt">নতুন যোগ হওয়া</option>
            <option value="price">মূল্য</option>
            <option value="title">নাম অনুযায়ী</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="desc">অধিক থেকে কম</option>
            <option value="asc">কম থেকে অধিক</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">কোনো বই পাওয়া যায়নি। অন্য কিছু খুঁজে দেখুন।</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                    page === i + 1
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-200 text-neutral hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500">লোড হচ্ছে...</div>}>
      <BooksExplore />
    </Suspense>
  );
}