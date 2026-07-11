import { Search, Shield, Users, Truck } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "সহজ খোঁজাখুঁজি",
    desc: "হাজারো বইয়ের মধ্যে থেকে সার্চ ও ফিল্টার দিয়ে দ্রুত পছন্দের বই খুঁজে নিন",
  },
  {
    icon: Shield,
    title: "নিরাপদ লেনদেন",
    desc: "যাচাইকৃত ইউজার প্রোফাইল ও নিরাপদ যোগাযোগ ব্যবস্থা",
  },
  {
    icon: Users,
    title: "কমিউনিটি চালিত",
    desc: "হাজারো বইপ্রেমী মানুষের সাথে যুক্ত হোন এবং বই বিনিময় করুন",
  },
  {
    icon: Truck,
    title: "সহজ ডেলিভারি সমন্বয়",
    desc: "বিক্রেতার সাথে সরাসরি যোগাযোগ করে ডেলিভারি ঠিক করুন",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-neutral mb-3">
          কেন BookHub বেছে নেবেন
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          বই কেনা-বেচা ও শেয়ার করাকে আরও সহজ ও নিরাপদ করতে আমরা প্রতিশ্রুতিবদ্ধ
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <f.icon className="text-primary" size={24} />
            </div>
            <h3 className="font-semibold text-neutral mb-2">{f.title}</h3>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}