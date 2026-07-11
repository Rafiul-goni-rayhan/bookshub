"use client";

import { useState } from "react";
import { ChevronDown, LifeBuoy, Mail } from "lucide-react";
import Link from "next/link";

const helpTopics = [
  {
    q: "কীভাবে একটি বই পোস্ট করব?",
    a: "লগইন করার পর 'বই যোগ করুন' মেনুতে গিয়ে বইয়ের নাম, লেখক, বর্ণনা, মূল্য ও লোকেশন দিয়ে ফর্মটি পূরণ করে সাবমিট করুন।",
  },
  {
    q: "আমার পোস্ট করা বই কীভাবে ডিলিট করব?",
    a: "'আমার বই' পেজে গিয়ে যে বইটি ডিলিট করতে চান তার পাশের ডিলিট আইকনে ক্লিক করুন এবং নিশ্চিত করুন।",
  },
  {
    q: "পাসওয়ার্ড ভুলে গেলে কী করব?",
    a: "বর্তমানে পাসওয়ার্ড রিসেট ফিচার তৈরি করা হচ্ছে। এই মুহূর্তে সহায়তার জন্য আমাদের সাপোর্ট টিমে যোগাযোগ করুন।",
  },
  {
    q: "বিক্রেতার সাথে কীভাবে যোগাযোগ করব?",
    a: "প্রতিটি বইয়ের ডিটেইলস পেজে পোস্টকারীর নাম দেখা যায়। সরাসরি যোগাযোগের জন্য আমাদের কন্টাক্ট ফর্ম ব্যবহার করতে পারেন।",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <LifeBuoy className="text-secondary" size={26} />
        </div>
        <h1 className="text-3xl font-bold text-neutral mb-3">সহায়তা কেন্দ্র</h1>
        <p className="text-gray-500">
          সাধারণ সমস্যার সমাধান এখানে খুঁজুন, অথবা সরাসরি আমাদের সাথে যোগাযোগ করুন
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-12">
        {helpTopics.map((topic, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-neutral hover:bg-gray-50"
            >
              {topic.q}
              <ChevronDown
                size={18}
                className={`transition-transform shrink-0 ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-600">{topic.a}</div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <Mail className="text-primary mx-auto mb-3" size={28} />
        <h3 className="font-semibold text-neutral mb-2">আরও সাহায্য দরকার?</h3>
        <p className="text-sm text-gray-600 mb-4">
          আপনার সমস্যার সমাধান না পেলে সরাসরি আমাদের টিমের সাথে যোগাযোগ করুন
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
        >
          যোগাযোগ করুন
        </Link>
      </div>
    </div>
  );
}