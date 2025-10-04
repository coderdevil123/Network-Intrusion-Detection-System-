"use client";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "DoS", value: 45 },
  { name: "SQLi", value: 25 },
  { name: "Brute Force", value: 15 },
  { name: "Others", value: 15 },
];

const COLORS = ["#ef4444", "#facc15", "#22c55e", "#3b82f6"];

export default function AttackPieChart() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Attack Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
