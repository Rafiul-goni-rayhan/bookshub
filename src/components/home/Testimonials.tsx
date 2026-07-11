import { Star } from "lucide-react";

const testimonials = [
  {
    name: "রাফি আহমেদ",
    role: "নিয়মিত ক্রেতা",
    text: "BookHub থেকে অনেক দুর্লভ বই খুব সহজে খুঁজে পেয়েছি। দাম আর প্রক্রিয়া দুটোই ভালো লেগেছে।",
    rating: 5,
  },
  {
    name: "নাদিয়া ইসলাম",
    role: "বিক্রেতা",
    text: "আমার পুরনো বইগুলো বিক্রি করা এখন অনেক সহজ হয়ে গেছে। প্ল্যাটফর্মটা ব্যবহার করা খুবই সহজ।",
    rating: 5,
  },
  {
    name: "তানভীর হাসান",
    role: "শিক্ষার্থী",
    text: "একাডেমিক বইগুলো কম দামে পেয়ে যাই, যা আমার পড়াশোনার খরচ অনেকটা কমিয়ে দিয়েছে।",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-neutral mb-3">
          ব্যবহারকারীদের মতামত
        </h2>
        <p className="text-gray-600">তাদের অভিজ্ঞতা শুনুন যারা BookHub ব্যবহার করেছেন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < t.rating ? "text-secondary fill-secondary" : "text-gray-300"}
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm mb-4">"{t.text}"</p>
            <div>
              <p className="font-semibold text-neutral text-sm">{t.name}</p>
              <p className="text-xs text-gray-500">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}