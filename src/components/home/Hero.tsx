"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, BookOpen } from "lucide-react";

const slides = [
  {
    title: "পুরনো বই খুঁজুন, নতুন গল্প শুরু করুন",
    subtitle: "হাজারো বই এক জায়গায়, সহজে খুঁজে নিন আপনার পছন্দেরটি",
  },
  {
    title: "নিজের বই শেয়ার করুন সবার সাথে",
    subtitle: "আপনার পড়া বইটি অন্য কারো কাজে লাগুক",
  },
  {
    title: "কম দামে ভালো বই পান",
    subtitle: "বিশ্বস্ত বিক্রেতাদের থেকে সরাসরি কিনুন",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[65vh] min-h-[450px] flex items-center bg-gradient-to-br from-primary to-neutral overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="text-white z-10">
          <div className="flex items-center gap-2 mb-4 text-secondary font-medium">
            <BookOpen size={20} />
            <span>BookHub এ স্বাগতম</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 transition-all duration-500">
            {slides[current].title}
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            {slides[current].subtitle}
          </p>

          {/* Search bar */}
          <div className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="বইয়ের নাম বা লেখক লিখুন..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg text-neutral focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <Link
              href={`/books${search ? `?search=${encodeURIComponent(search)}` : ""}`}
              className="px-6 py-3 bg-secondary text-white font-medium rounded-lg hover:opacity-90 transition whitespace-nowrap"
            >
              খুঁজুন
            </Link>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-secondary" : "w-2 bg-white/40"
                }`}
                aria-label={`স্লাইড ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Visual element */}
        <div className="hidden md:flex justify-center items-center">
          <div className="relative">
            <div className="w-72 h-72 bg-secondary/20 rounded-full absolute -top-4 -right-4 blur-2xl" />
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex items-center justify-center">
              <BookOpen size={140} className="text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}