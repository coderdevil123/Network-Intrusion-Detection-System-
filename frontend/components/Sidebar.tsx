"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Bell,
  Activity,
  BarChart2,
  Globe,
  Shield,
  Zap,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Alerts", icon: Bell, href: "/alerts" },
  { name: "Traffic Analysis", icon: Activity, href: "/traffic" },
  { name: "Reports", icon: BarChart2, href: "/reports" },
  { name: "Threat Intelligence", icon: Globe, href: "/threat-intel" },
  { name: "Automated Response", icon: Zap, href: "/response" },
  { name: "Notifications", icon: Bell, href: "/notifications" },
  { name: "Admin / Settings", icon: Settings, href: "/admin" },
  { name: "Documentation", icon: FileText, href: "/docs" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-[#0f172a] text-white flex flex-col fixed left-0 top-0 transition-all duration-300 shadow-lg z-40`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold tracking-wide">
          {collapsed ? "N" : "🧠 NIDS"}
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          ☰
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto mt-4">
        {navLinks.map(({ name, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-5 py-3 text-sm font-medium hover:bg-blue-600/20 transition ${
                active ? "bg-blue-600/30 border-l-4 border-blue-500" : ""
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span>{name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-3 w-full hover:text-red-400 transition">
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
