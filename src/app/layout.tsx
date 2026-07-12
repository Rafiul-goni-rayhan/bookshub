import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastProvider from "@/components/ToastProvider";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "BookHub - বাংলাদেশের সবচেয়ে ভালো পুরনো বইয়ের মার্কেটপ্লেস",
    template: "%s | BookHub",
  },
  description:
    "BookHub - পুরনো বই বিক্রি করুন, কিনুন এবং সরাসরি পাঠকের সাথে যোগাযোগ করুন। ঢাকা ও বাংলাদেশের জন্য সবচেয়ে সহজ বই শেয়ারিং প্ল্যাটফর্ম।",
  keywords: [
    "BookHub",
    "পুরনো বই",
    "book marketplace",
    "book exchange",
    "বই বিক্রি",
    "বই কিনুন",
    "used books",
    "Bangladesh books",
    "online book shopping",
  ],
  authors: [{ name: "BookHub", url: baseUrl }],
  creator: "BookHub",
  openGraph: {
    title: "BookHub - বাংলাদেশের সবচেয়ে ভালো পুরনো বইয়ের মার্কেটপ্লেস",
    description:
      "BookHub-এ পুরনো বইগুলো বিক্রি করুন, কিনুন এবং সহজে পাঠকের সাথে যোগাযোগ করুন। ঢাকা ও বাংলাদেশের জন্য স্থানীয় বইয়ের মার্কেটপ্লেস।",
    type: "website",
    url: baseUrl,
    siteName: "BookHub",
    locale: "bn_BD",
    images: [{ url: `${baseUrl}/favicon.ico`, width: 512, height: 512, alt: "BookHub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BookHub - পুরনো বই বিক্রয় ও কেনার সহজ প্ল্যাটফর্ম",
    description:
      "BookHub-এ পুরনো বই বিক্রি করুন, কিনুন এবং সরাসরি পাঠকের সাথে যোগাযোগ করুন। ঢাকা ও বাংলাদেশের জন্য স্থানীয় বইয়ের মার্কেটপ্লেস।",
    creator: "@BookHub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
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