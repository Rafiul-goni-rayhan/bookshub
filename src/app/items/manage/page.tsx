"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { Book } from "@/types";
import { toast } from "react-hot-toast";
import { Eye, Trash2, Package } from "lucide-react";

export default function ManageItemsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
      return;
    }

    if (session) {
      // If user is admin, fetch all books so admin can manage any post.
      if ((session as any).user?.role === "admin") {
        fetchMyBooks(true);
      } else {
        fetchMyBooks(false);
      }
    }
  }, [session, isPending]);

  const fetchMyBooks = async (all = false) => {
    setLoading(true);
    try {
      const endpoint = all ? "/api/books" : "/api/books/my";
      const res = await apiFetch(endpoint);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await apiFetch(`/api/books/${id}`, { method: "DELETE" });
      setBooks((prev) => prev.filter((b) => b._id !== id));
      toast.success("বই সফলভাবে ডিলিট হয়েছে");
    } catch (err) {
      toast.error("ডিলিট করতে সমস্যা হয়েছে");
    } finally {
      setDeletingId(null);
    }
  };

  const confirmDelete = (id: string) => {
    toast((t) => (
      <div className="space-y-3">
        <p>আপনি কি নিশ্চিত এই বইটি ডিলিট করতে চান?</p>
        <div className="flex justify-end gap-2">
          <button
            className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-gray-200"
            onClick={() => toast.dismiss(t.id)}
          >
            না
          </button>
          <button
            className="rounded-lg bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            হ্যাঁ
          </button>
        </div>
      </div>
    ));
  };

  if (isPending || loading) {
    return <div className="py-20 text-center text-gray-500">লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <Package className="text-primary" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral">{(session as any).user?.role === "admin" ? "সকল বই ম্যানেজ করুন" : "আমার বই ম্যানেজ করুন"}</h1>
          <p className="text-sm text-gray-500">{(session as any).user?.role === "admin" ? "সকল ইউজারদের পোস্ট করা বই এখানে দেখুন" : "আপনার পোস্ট করা সব বই এখানে দেখুন"}</p>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 mb-4">{(session as any).user?.role === "admin" ? "কোনো বই পাওয়া যায়নি" : "আপনি এখনো কোনো বই যোগ করেননি"}</p>
          {(session as any).user?.role !== "admin" && (
            <Link
              href="/items/add"
              className="inline-block px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:opacity-90"
            >
              প্রথম বই যোগ করুন
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-5 py-3 font-medium text-neutral">শিরোনাম</th>
                  <th className="px-5 py-3 font-medium text-neutral">লেখক</th>
                  <th className="px-5 py-3 font-medium text-neutral">মূল্য</th>
                  {(session as any).user?.role === "admin" && (
                    <th className="px-5 py-3 font-medium text-neutral">Posted by</th>
                  )}
                  <th className="px-5 py-3 font-medium text-neutral">অবস্থা</th>
                  <th className="px-5 py-3 font-medium text-neutral text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id} className="border-t border-gray-100">
                    <td className="px-5 py-4 font-medium text-neutral">{book.title}</td>
                    <td className="px-5 py-4 text-gray-600">{book.author}</td>
                    <td className="px-5 py-4 text-gray-600">৳{book.price}</td>
                    {(session as any).user?.role === "admin" && (
                      <td className="px-5 py-4 text-gray-600">{(book as any).postedBy?.name || (book as any).postedBy?.email || "-"}</td>
                    )}
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          book.availability === "available"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {book.availability === "available" ? "উপলব্ধ" : book.availability === "sold" ? "বিক্রিত" : "সংরক্ষিত"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/books/${book._id}`}
                          className="p-2 rounded-lg hover:bg-gray-100 text-primary"
                          title="দেখুন"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => confirmDelete(book._id)}
                          disabled={deletingId === book._id}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-500 disabled:opacity-50"
                          title="ডিলিট করুন"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}