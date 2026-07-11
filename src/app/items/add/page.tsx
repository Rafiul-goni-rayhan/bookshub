"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { BookPlus } from "lucide-react";

const genres = ["উপন্যাস", "সাই-ফাই", "রোমান্টিক", "একাডেমিক", "ইতিহাস", "আত্ম-উন্নয়ন", "কবিতা", "অন্যান্য"];
const conditions = [
  { value: "new", label: "নতুন" },
  { value: "like-new", label: "প্রায় নতুন" },
  { value: "good", label: "ভালো" },
  { value: "fair", label: "মোটামুটি" },
];

export default function AddItemPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [form, setForm] = useState({
    title: "",
    author: "",
    shortDescription: "",
    fullDescription: "",
    genre: genres[0],
    condition: "good",
    price: "",
    location: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // লগইন না থাকলে রিডাইরেক্ট - useEffect এর ভেতরে
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.title.trim()) newErrors.title = "বইয়ের নাম দিতে হবে";
    if (!form.author.trim()) newErrors.author = "লেখকের নাম দিতে হবে";
    if (!form.shortDescription.trim()) newErrors.shortDescription = "সংক্ষিপ্ত বর্ণনা দিতে হবে";
    if (!form.fullDescription.trim()) newErrors.fullDescription = "বিস্তারিত বর্ণনা দিতে হবে";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "সঠিক মূল্য দিন";
    if (!form.location.trim()) newErrors.location = "লোকেশন দিতে হবে";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await apiFetch("/api/books", {
        method: "POST",
        body: JSON.stringify({
          title: form.title,
          author: form.author,
          shortDescription: form.shortDescription,
          fullDescription: form.fullDescription,
          genre: form.genre,
          condition: form.condition,
          price: Number(form.price),
          location: form.location,
          images: form.imageUrl ? [form.imageUrl] : [],
        }),
      });

      setSuccess(true);
      setTimeout(() => router.push("/items/manage"), 1200);
    } catch (err: any) {
      setErrors({ form: err.message || "বই অ্যাড করতে সমস্যা হয়েছে" });
    } finally {
      setLoading(false);
    }
  };

  // লোডিং বা সেশন না থাকা অবস্থায় ফর্ম দেখাবে না
  if (isPending || !session) {
    return <div className="py-20 text-center text-gray-500">লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <BookPlus className="text-primary" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral">নতুন বই যোগ করুন</h1>
          <p className="text-sm text-gray-500">আপনার বইয়ের তথ্য দিন</p>
        </div>
      </div>

      {success && (
        <div className="mb-4 px-4 py-3 bg-green-50 text-green-700 text-sm rounded-lg">
          বইটি সফলভাবে যোগ হয়েছে! রিডাইরেক্ট হচ্ছে...
        </div>
      )}
      {errors.form && (
        <div className="mb-4 px-4 py-3 bg-red-50 text-red-600 text-sm rounded-lg">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col gap-5">
        <Input
          label="বইয়ের নাম"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
          placeholder="যেমন: শেষের কবিতা"
        />
        <Input
          label="লেখকের নাম"
          value={form.author}
          onChange={(e) => handleChange("author", e.target.value)}
          error={errors.author}
          placeholder="যেমন: রবীন্দ্রনাথ ঠাকুর"
        />
        <Textarea
          label="সংক্ষিপ্ত বর্ণনা"
          value={form.shortDescription}
          onChange={(e) => handleChange("shortDescription", e.target.value)}
          error={errors.shortDescription}
          placeholder="এক লাইনে বইয়ের সংক্ষিপ্ত পরিচয়"
          rows={2}
        />
        <Textarea
          label="বিস্তারিত বর্ণনা"
          value={form.fullDescription}
          onChange={(e) => handleChange("fullDescription", e.target.value)}
          error={errors.fullDescription}
          placeholder="বইয়ের বিস্তারিত বিবরণ লিখুন"
          rows={5}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral">জনরা</label>
            <select
              value={form.genre}
              onChange={(e) => handleChange("genre", e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral">কন্ডিশন</label>
            <select
              value={form.condition}
              onChange={(e) => handleChange("condition", e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {conditions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="মূল্য (৳)"
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            error={errors.price}
            placeholder="যেমন: ২৫০"
          />
          <Input
            label="লোকেশন"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            error={errors.location}
            placeholder="যেমন: ঢাকা"
          />
        </div>

        <Input
          label="ছবির URL (ঐচ্ছিক)"
          value={form.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          placeholder="https://example.com/book-cover.jpg"
          required={false}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "যোগ হচ্ছে..." : "বই যোগ করুন"}
        </button>
      </form>
    </div>
  );
}