"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "00:00", packets: 200 },
  { time: "04:00", packets: 400 },
  { time: "08:00", packets: 800 },
  { time: "12:00", packets: 1200 },
  { time: "16:00", packets: 600 },
  { time: "20:00", packets: 900 },
];

export default function TrafficChart() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Real-time Traffic</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line type="monotone" dataKey="packets" stroke="#38bdf8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
