import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="text-primary" size={26} />
        </div>
        <h1 className="text-3xl font-bold text-neutral mb-3">গোপনীয়তা নীতি</h1>
        <p className="text-gray-500 text-sm">সর্বশেষ আপডেট: জুলাই ২০২৬</p>
      </div>

      <div className="flex flex-col gap-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-neutral mb-3">১. তথ্য সংগ্রহ</h2>
          <p>
            আমরা BookHub ব্যবহারের সময় আপনার নাম, ইমেইল ঠিকানা এবং আপনার পোস্ট
            করা বইয়ের তথ্য সংগ্রহ করি, যাতে আপনাকে প্ল্যাটফর্মের সেবা প্রদান করা
            যায়।
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral mb-3">২. তথ্যের ব্যবহার</h2>
          <p>
            সংগৃহীত তথ্য শুধুমাত্র অ্যাকাউন্ট পরিচালনা, বই তালিকা প্রদর্শন এবং
            ইউজারদের মধ্যে যোগাযোগ সহজ করার জন্য ব্যবহার করা হয়। আমরা কোনো
            তৃতীয় পক্ষের কাছে আপনার ব্যক্তিগত তথ্য বিক্রি করি না।
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral mb-3">৩. তথ্যের নিরাপত্তা</h2>
          <p>
            আপনার পাসওয়ার্ড এনক্রিপ্টেড অবস্থায় সংরক্ষণ করা হয় এবং আমরা
            ইন্ডাস্ট্রি-স্ট্যান্ডার্ড নিরাপত্তা ব্যবস্থা ব্যবহার করি আপনার
            অ্যাকাউন্ট সুরক্ষিত রাখতে।
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral mb-3">৪. কুকি ব্যবহার</h2>
          <p>
            লগইন সেশন বজায় রাখতে আমরা কুকি ব্যবহার করি। ব্রাউজার সেটিংস থেকে
            আপনি যেকোনো সময় কুকি নিয়ন্ত্রণ করতে পারেন।
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral mb-3">৫. আপনার অধিকার</h2>
          <p>
            আপনি যেকোনো সময় আপনার অ্যাকাউন্ট তথ্য দেখতে, সংশোধন করতে বা মুছে
            ফেলতে পারবেন। এ বিষয়ে সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন।
          </p>
        </section>
      </div>
    </div>
  );
}