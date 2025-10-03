"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">NIDS</div>
      <div className="space-x-6">
        <Link href="/" className="hover:text-blue-400 transition">
          Home
        </Link>
        <Link href="/about" className="hover:text-blue-400 transition">
          About
        </Link>
        <Link href="/contact" className="hover:text-blue-400 transition">
          Contact
        </Link>
      </div>
    </nav>
  );
}
