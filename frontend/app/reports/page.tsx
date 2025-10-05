"use client";

import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { motion } from "framer-motion";

export default function ReportsPage() {
  const [attackTrend, setAttackTrend] = useState<{ id: number; day: string; alerts: number }[]>([]);
  const [attackTypes, setAttackTypes] = useState<{ name: string; value: number }[]>([]);
  const [topSources, setTopSources] = useState<{ ip: string; count: number; country: string }[]>([]);

  useEffect(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    setAttackTrend(
      days.map((d, idx) => ({
        id: idx,
        day: d,
        alerts: Math.floor(Math.random() * 120) + 20,
      }))
    );

    const types = [
      { name: "DDoS", value: 40 },
      { name: "Brute Force", value: 25 },
      { name: "Port Scan", value: 15 },
      { name: "Phishing", value: 10 },
      { name: "Other", value: 10 },
    ];
    setAttackTypes(types);

    const ips = Array.from({ length: 5 }).map(() => ({
      ip: `192.168.1.${Math.floor(Math.random() * 240) + 1}`,
      count: Math.floor(Math.random() * 200),
      country: ["US", "IN", "RU", "CN", "BR"][Math.floor(Math.random() * 5)],
    }));
    setTopSources(ips);
  }, []);

  const COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"];

  return (
    <div className="p-6 text-gray-100 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-indigo-400 tracking-wide"
      >
        📈 Reports & Insights
      </motion.h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        {[
          { title: "Total Alerts", value: "1,284", color: "from-indigo-500 to-indigo-700" },
          { title: "Critical %", value: "32%", color: "from-red-500 to-red-700" },
          { title: "Blocked IPs", value: "58", color: "from-emerald-500 to-emerald-700" },
          { title: "Avg. Response Time", value: "1.2s", color: "from-yellow-400 to-yellow-600" },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <SummaryCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/70 backdrop-blur-lg p-5 rounded-2xl border border-slate-800 shadow-xl hover:shadow-indigo-500/20 transition"
        >
          <h3 className="font-semibold mb-4 text-indigo-300">Attack Trends (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={attackTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }} />
              <Line
                type="monotone"
                dataKey="alerts"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ r: 3, stroke: "#818cf8", fill: "#6366f1" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/70 backdrop-blur-lg p-5 rounded-2xl border border-slate-800 shadow-xl hover:shadow-indigo-500/20 transition"
        >
          <h3 className="font-semibold mb-4 text-indigo-300">Attack Type Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={attackTypes}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name }) => name}
                animationBegin={0}
                animationDuration={800}
              >
                {attackTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Source IPs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/70 backdrop-blur-lg p-5 rounded-2xl border border-slate-800 shadow-xl hover:shadow-indigo-500/20 transition"
      >
        <h3 className="font-semibold mb-4 text-indigo-300">Top Source IPs</h3>
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800/70 text-gray-300 uppercase tracking-wide">
            <tr>
              <th className="text-left p-3">IP Address</th>
              <th className="text-left p-3">Country</th>
              <th className="text-left p-3">Attack Count</th>
            </tr>
          </thead>
          <tbody>
            {topSources.map((src, i) => (
              <tr
                key={i}
                className="border-t border-slate-700 hover:bg-slate-800/60 transition-all duration-200"
              >
                <td className="p-3">{src.ip}</td>
                <td className="p-3">{src.country}</td>
                <td className="p-3 font-semibold text-indigo-400">{src.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Export Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 text-right"
      >
        <button
          onClick={() => alert("Report export simulated")}
          className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-lg text-sm font-medium text-white shadow-md hover:shadow-indigo-500/40 transition"
        >
          📥 Download Report
        </button>
      </motion.div>
    </div>
  );
}

function SummaryCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-br ${color} p-5 rounded-2xl shadow-lg transition-transform`}
    >
      <p className="text-xs uppercase text-gray-100/90 tracking-wider">{title}</p>
      <h4 className="text-2xl font-bold mt-2">{value}</h4>
    </motion.div>
  );
}
