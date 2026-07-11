import { BookOpen, Users, Target, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <BookOpen className="text-primary" size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
          আমাদের সম্পর্কে
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          BookHub একটি কমিউনিটি চালিত প্ল্যাটফর্ম, যেখানে বইপ্রেমীরা তাদের পুরনো
          বই সহজে বিক্রি, বিনিময় বা শেয়ার করতে পারেন। আমরা বিশ্বাস করি প্রতিটি
          বইয়ের একটি দ্বিতীয় জীবন প্রাপ্য।
        </p>
      </div>

      {/* Mission */}
      <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
        <div>
          <h2 className="text-2xl font-bold text-neutral mb-4">আমাদের লক্ষ্য</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            আমাদের লক্ষ্য হলো বাংলাদেশ জুড়ে বইপ্রেমীদের মধ্যে একটি সেতুবন্ধন তৈরি
            করা, যাতে পুরনো বই ফেলে না দিয়ে নতুন পাঠকের হাতে পৌঁছাতে পারে। এতে
            পাঠকরা কম খরচে ভালো বই পান, আর বিক্রেতারা তাদের সংগ্রহ থেকে আয় করতে
            পারেন।
          </p>
          <p className="text-gray-600 leading-relaxed">
            ২০২৬ সালে যাত্রা শুরু হওয়া এই প্ল্যাটফর্মটি ইতিমধ্যে হাজারো ব্যবহারকারীর
            আস্থা অর্জন করেছে।
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/5 rounded-xl p-6 text-center">
            <Users className="text-primary mx-auto mb-2" size={28} />
            <p className="text-2xl font-bold text-neutral">২,৫০০+</p>
            <p className="text-sm text-gray-500">সক্রিয় ইউজার</p>
          </div>
          <div className="bg-secondary/5 rounded-xl p-6 text-center">
            <BookOpen className="text-secondary mx-auto mb-2" size={28} />
            <p className="text-2xl font-bold text-neutral">৫,০০০+</p>
            <p className="text-sm text-gray-500">বই তালিকাভুক্ত</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-2xl font-bold text-neutral mb-8 text-center">
          আমাদের মূলনীতি
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="text-primary" size={24} />
            </div>
            <h3 className="font-semibold text-neutral mb-2">সহজলভ্যতা</h3>
            <p className="text-sm text-gray-600">
              যে কেউ যেকোনো জায়গা থেকে সহজে বই খুঁজে পেতে ও শেয়ার করতে পারেন
            </p>
          </div>
          <div className="text-center p-6 rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="text-secondary" size={24} />
            </div>
            <h3 className="font-semibold text-neutral mb-2">কমিউনিটি</h3>
            <p className="text-sm text-gray-600">
              বইপ্রেমী মানুষের একটি বিশ্বস্ত ও সহায়ক নেটওয়ার্ক তৈরি করা
            </p>
          </div>
          <div className="text-center p-6 rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="text-primary" size={24} />
            </div>
            <h3 className="font-semibold text-neutral mb-2">স্বচ্ছতা</h3>
            <p className="text-sm text-gray-600">
              প্রতিটি লেনদেনে সততা ও স্বচ্ছতা বজায় রাখার প্রতিশ্রুতি
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}