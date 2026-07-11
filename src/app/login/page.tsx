"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import Input from "@/components/ui/Input";
import { BookOpen } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "লগইন ব্যর্থ হয়েছে। ইমেইল বা পাসওয়ার্ড ভুল।");
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleDemoLogin = () => {
    setEmail("test@example.com");
    setPassword("password123");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <BookOpen className="text-primary" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-neutral">লগইন করুন</h1>
          <p className="text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            label="ইমেইল"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <Input
            label="পাসওয়ার্ড"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition"
          >
            ডেমো লগইন (অটো-ফিল)
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/register" className="text-primary font-medium">
            রেজিস্ট্রেশন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}