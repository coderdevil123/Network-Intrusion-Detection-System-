import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "NIDS - Intrusion Detection System",
  description: "Industrial-level real-time network monitoring dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-white">
        <Sidebar />
        <div className="ml-64">
          <Navbar />
          <main className="pt-20 px-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
