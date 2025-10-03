"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-8">🛡️ NIDS</h1>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link href="/analyze" className="hover:bg-gray-700 p-2 rounded">
          Analyze
        </Link>
        <Link href="/reports" className="hover:bg-gray-700 p-2 rounded">
          Reports
        </Link>
        <Link href="/alerts" className="hover:bg-gray-700 p-2 rounded">
          Alerts
        </Link>
        <Link href="/settings" className="hover:bg-gray-700 p-2 rounded">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
