"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
          যোগাযোগ করুন
        </h1>
        <p className="text-gray-600">
          কোনো প্রশ্ন বা মতামত থাকলে আমাদের জানান, আমরা দ্রুত উত্তর দেওয়ার চেষ্টা করব
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <Mail className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-neutral mb-1">ইমেইল</h3>
              <p className="text-sm text-gray-600">support@bookhub.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
              <Phone className="text-secondary" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-neutral mb-1">ফোন</h3>
              <p className="text-sm text-gray-600">+৮৮০ ১২৩৪৫৬৭৮৯</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <MapPin className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-neutral mb-1">ঠিকানা</h3>
              <p className="text-sm text-gray-600">ঢাকা, বাংলাদেশ</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          {submitted ? (
            <div className="text-center py-8">
              <p className="text-primary font-medium">
                ধন্যবাদ! আপনার বার্তাটি আমাদের কাছে পৌঁছেছে।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-neutral">নাম</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="আপনার নাম"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-neutral">ইমেইল</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-neutral">বার্তা</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="আপনার বার্তা লিখুন..."
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
              >
                <Send size={16} />
                বার্তা পাঠান
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}