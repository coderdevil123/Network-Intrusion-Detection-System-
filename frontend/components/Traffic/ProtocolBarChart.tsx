"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { protocol: "TCP", packets: 240 },
  { protocol: "UDP", packets: 180 },
  { protocol: "ICMP", packets: 60 },
  { protocol: "HTTP", packets: 90 },
  { protocol: "DNS", packets: 45 },
];

export default function ProtocolBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="protocol" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            color: "#f1f5f9",
          }}
        />
        <Bar dataKey="packets" fill="#6366f1" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
