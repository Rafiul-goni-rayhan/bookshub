"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="text-primary" size={28} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-3">
          নতুন বই ও অফার সম্পর্কে জানুন
        </h2>
        <p className="text-gray-600 mb-6">
          সাবস্ক্রাইব করুন এবং নতুন বই সংযোজন ও বিশেষ অফারের খবর সরাসরি পান
        </p>

        {subscribed ? (
          <p className="text-primary font-medium">
            ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="আপনার ইমেইল দিন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              সাবস্ক্রাইব করুন
            </button>
          </form>
        )}
      </div>
    </section>
  );
}