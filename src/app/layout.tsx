import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastProvider from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "BookHub - বই শেয়ার করুন, বই খুঁজুন",
  description: "পুরনো বই কিনুন, বিক্রি করুন এবং শেয়ার করুন সহজে",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <ToastProvider />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}