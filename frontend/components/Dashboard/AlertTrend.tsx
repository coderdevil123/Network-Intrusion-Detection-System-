"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", alerts: 20 },
  { day: "Tue", alerts: 35 },
  { day: "Wed", alerts: 50 },
  { day: "Thu", alerts: 28 },
  { day: "Fri", alerts: 65 },
  { day: "Sat", alerts: 30 },
  { day: "Sun", alerts: 40 },
];

export default function AlertTrend() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Alerts Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="day" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Area type="monotone" dataKey="alerts" stroke="#f43f5e" fill="#f43f5e80" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
