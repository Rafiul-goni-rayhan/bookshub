"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "BookHub এ বই বিক্রি করতে কী কী লাগবে?",
    a: "শুধু একটা অ্যাকাউন্ট খুলে লগইন করে 'বই যোগ করুন' পেজ থেকে বইয়ের তথ্য দিয়ে পোস্ট করলেই হবে।",
  },
  {
    q: "পেমেন্ট কীভাবে করা হয়?",
    a: "ক্রেতা ও বিক্রেতা নিজেদের মধ্যে সরাসরি যোগাযোগ করে পেমেন্ট ও ডেলিভারি সমন্বয় করেন।",
  },
  {
    q: "বইয়ের মান নিয়ে কোনো নিশ্চয়তা আছে কি?",
    a: "প্রতিটি বইয়ের কন্ডিশন (নতুন, ভালো, মোটামুটি ইত্যাদি) পোস্টের সময় উল্লেখ করা থাকে।",
  },
  {
    q: "একাধিক বই একসাথে পোস্ট করা যাবে কি?",
    a: "হ্যাঁ, আপনি যতগুলো ইচ্ছা বই আলাদা আলাদাভাবে পোস্ট করতে পারবেন।",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-neutral mb-3">
          সাধারণ জিজ্ঞাসা
        </h2>
        <p className="text-gray-600">আপনার প্রশ্নের উত্তর এখানে খুঁজুন</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-neutral hover:bg-gray-50"
            >
              {faq.q}
              <ChevronDown
                size={18}
                className={`transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-600">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}