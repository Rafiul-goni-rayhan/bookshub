import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/home/FAQ";
import type { Metadata } from "next";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "BookHub | পুরনো বই বিক্রি ও কেনার সবচেয়ে সহজ প্ল্যাটফর্ম",
  description:
    "BookHub-এ পুরনো বই বিক্রি করুন, কিনুন এবং সহজে পাঠকের সাথে যোগাযোগ করুন। ঢাকার স্থানীয় বই বাজারের জন্য BookHub ব্যবহার করুন।",
  openGraph: {
    title: "BookHub | পুরনো বই বিক্রি ও কেনার সবচেয়ে সহজ প্ল্যাটফর্ম",
    description:
      "BookHub-এ পুরনো বই বিক্রি করুন, কিনুন এবং সহজে পাঠকের সাথে যোগাযোগ করুন। ঢাকার স্থানীয় বই বাজারের জন্য BookHub ব্যবহার করুন।",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <Stats />
      <Testimonials />
      <Newsletter />
      <FAQ />
      <CTA />
    </>
  );
}