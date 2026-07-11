import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto bg-neutral rounded-2xl px-8 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          আজই আপনার বই শেয়ার করা শুরু করুন
        </h2>
        <p className="text-gray-300 mb-6 max-w-lg mx-auto">
          হাজারো বইপ্রেমীর কমিউনিটিতে যুক্ত হোন এবং আপনার পুরনো বইকে দিন নতুন ঠিকানা
        </p>
        <Link
          href="/register"
          className="inline-block px-8 py-3 bg-secondary text-white font-medium rounded-lg hover:opacity-90 transition"
        >
          এখনই যোগ দিন
        </Link>
      </div>
    </section>
  );
}