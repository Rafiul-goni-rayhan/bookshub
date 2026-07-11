"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import Input from "@/components/ui/Input";
import { BookOpen } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (name.trim().length < 2) newErrors.name = "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
    if (!email.includes("@")) newErrors.email = "সঠিক ইমেইল দিন";
    if (password.length < 6) newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
    if (password !== confirmPassword) newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const { error: authError } = await signUp.email({
      name,
      email,
      password,
    });
    setLoading(false);

    if (authError) {
      setErrors({ form: authError.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে" });
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <BookOpen className="text-primary" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-neutral">রেজিস্ট্রেশন করুন</h1>
          <p className="text-sm text-gray-500 mt-1">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {errors.form && (
          <div className="mb-4 px-4 py-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input
            label="পুরো নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            placeholder="আপনার নাম"
          />
          <Input
            label="ইমেইল"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="you@example.com"
          />
          <Input
            label="পাসওয়ার্ড"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
          />
          <Input
            label="পাসওয়ার্ড নিশ্চিত করুন"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "তৈরি হচ্ছে..." : "রেজিস্ট্রেশন করুন"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/login" className="text-primary font-medium">
            লগইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}