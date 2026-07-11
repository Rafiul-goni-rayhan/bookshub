import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

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