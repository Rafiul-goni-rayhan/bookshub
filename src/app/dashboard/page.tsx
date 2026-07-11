"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { Book } from "@/types";
import { BookOpen, CheckCircle, Star, ShoppingBag, Plus, Package } from "lucide-react";

interface DashboardStats {
  totalBooks: number;
  availableBooks: number;
  soldBooks: number;
  totalReviews: number;
  avgRating: number;
  recentBooks: Book[];
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
      return;
    }
    if (session) {
      fetchStats();
    }
  }, [session, isPending]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/books/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading || !session) {
    return <div className="py-20 text-center text-gray-500">লোড হচ্ছে...</div>;
  }

  const statCards = [
    {
      label: "মোট বই পোস্ট",
      value: stats?.totalBooks ?? 0,
      icon: BookOpen,
      color: "primary",
    },
    {
      label: "উপলব্ধ বই",
      value: stats?.availableBooks ?? 0,
      icon: CheckCircle,
      color: "secondary",
    },
    {
      label: "বিক্রি হয়েছে",
      value: stats?.soldBooks ?? 0,
      icon: ShoppingBag,
      color: "primary",
    },
    {
      label: "গড় রেটিং",
      value: stats?.avgRating ? `${stats.avgRating} / ৫` : "নেই",
      icon: Star,
      color: "secondary",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral">
            স্বাগতম, {session.user.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{session.user.email}</p>
        </div>
        <Link
          href="/items/add"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition w-fit"
        >
          <Plus size={18} />
          নতুন বই যোগ করুন
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center mb-3`}
            >
              <stat.icon
                className={stat.color === "primary" ? "text-primary" : "text-secondary"}
                size={20}
              />
            </div>
            <p className="text-2xl font-bold text-neutral">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent books */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-neutral">সাম্প্রতিক বই</h2>
          <Link href="/items/manage" className="text-sm text-primary font-medium">
            সব দেখুন
          </Link>
        </div>

        {stats?.recentBooks.length === 0 ? (
          <div className="text-center py-10">
            <Package className="text-gray-300 mx-auto mb-3" size={40} />
            <p className="text-gray-500 mb-4">এখনো কোনো বই পোস্ট করেননি</p>
            <Link
              href="/items/add"
              className="inline-block px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90"
            >
              প্রথম বই যোগ করুন
            </Link>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-100">
            {stats?.recentBooks.map((book) => (
              <Link
                key={book._id}
                href={`/books/${book._id}`}
                className="flex items-center justify-between py-3 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition"
              >
                <div>
                  <p className="font-medium text-neutral text-sm">{book.title}</p>
                  <p className="text-xs text-gray-500">{book.author}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-primary">৳{book.price}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      book.availability === "available"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {book.availability === "available" ? "উপলব্ধ" : "বিক্রিত"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}