import Link from "next/link";
import { BookText, Rocket, Heart, GraduationCap, History, Sparkles } from "lucide-react";

const categories = [
  { name: "উপন্যাস", icon: BookText, slug: "উপন্যাস" },
  { name: "বিজ্ঞান কল্পকাহিনী", icon: Rocket, slug: "সাই-ফাই" },
  { name: "রোমান্টিক", icon: Heart, slug: "রোমান্টিক" },
  { name: "একাডেমিক", icon: GraduationCap, slug: "একাডেমিক" },
  { name: "ইতিহাস", icon: History, slug: "ইতিহাস" },
  { name: "আত্ম-উন্নয়ন", icon: Sparkles, slug: "আত্ম-উন্নয়ন" },
];

export default function Categories() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral mb-3">
            ক্যাটাগরি অনুযায়ী খুঁজুন
          </h2>
          <p className="text-gray-600">আপনার পছন্দের বিষয়ের বই বেছে নিন</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/books?genre=${encodeURIComponent(cat.slug)}`}
              className="flex flex-col items-center gap-3 bg-white rounded-xl p-5 border border-gray-100 hover:border-primary hover:shadow-md transition"
            >
              <cat.icon className="text-primary" size={28} />
              <span className="text-sm font-medium text-neutral text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}