"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, BookOpen, User } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const loggedOutLinks = [
    { href: "/", label: "হোম" },
    { href: "/books", label: "বই খুঁজুন" },
    { href: "/about", label: "আমাদের সম্পর্কে" },
    { href: "/contact", label: "যোগাযোগ" },
  ];

  const loggedInLinks = [
    { href: "/", label: "হোম" },
    { href: "/books", label: "বই খুঁজুন" },
    { href: "/dashboard", label: "ড্যাশবোর্ড" },
    { href: "/items/add", label: "বই যোগ করুন" },
    { href: "/items/manage", label: "আমার বই" },
    { href: "/about", label: "আমাদের সম্পর্কে" },
    { href: "/contact", label: "যোগাযোগ" },
  ];

  const links = session ? loggedInLinks : loggedOutLinks;

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <BookOpen size={24} />
          BookHub
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-neutral hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100">
                <User size={16} className="text-primary" />
                <span className="text-sm text-neutral font-medium max-w-[160px] truncate">
                  {session.user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-lg bg-secondary text-white font-medium hover:opacity-90 transition"
              >
                লগআউট
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
            >
              লগইন
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-neutral"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-neutral hover:text-primary font-medium"
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                <User size={16} className="text-primary" />
                <span className="text-sm text-neutral font-medium truncate">
                  {session.user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-lg bg-secondary text-white font-medium"
              >
                লগআউট
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-primary text-white font-medium text-center"
            >
              লগইন
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}