"use client";
import { useState } from "react";
import { Search, User, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <header className="w-full h-16 bg-[#1e293b] text-white flex items-center justify-between px-6 fixed top-0 left-0 z-30 shadow-md">
      {/* Search */}
      <div className="flex items-center bg-[#334155] px-3 py-2 rounded-lg w-1/3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search IP, attack type, timestamp..."
          className="bg-transparent text-sm outline-none ml-2 w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Status:</span>
          <span className="text-green-400 font-semibold">🟢 Running</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-[#334155] rounded-lg hover:bg-[#475569] transition"
        >
          {darkMode ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 bg-[#334155] px-3 py-2 rounded-lg">
          <User size={18} />
          <span className="text-sm">Admin</span>
        </div>
      </div>
    </header>
  );
}
