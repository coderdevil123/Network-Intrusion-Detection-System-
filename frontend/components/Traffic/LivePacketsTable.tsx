"use client";

import { useEffect, useState } from "react";

interface Packet {
  id: number;
  time: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
}

export default function LivePacketsTable() {
  const [packets, setPackets] = useState<Packet[]>([]);

  useEffect(() => {
    // Simulated live data (replace later with WebSocket / API stream)
    const interval = setInterval(() => {
      setPackets((prev) => [
        {
          id: prev.length + 1,
          time: new Date().toLocaleTimeString(),
          source: `192.168.1.${Math.floor(Math.random() * 50)}`,
          destination: `10.0.0.${Math.floor(Math.random() * 50)}`,
          protocol: ["TCP", "UDP", "ICMP", "HTTP", "DNS"][
            Math.floor(Math.random() * 5)
          ],
          length: Math.floor(Math.random() * 1500),
        },
        ...prev.slice(0, 9), // keep latest 10
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
      <table className="min-w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
        <thead className="bg-slate-800 text-gray-200 uppercase">
          <tr>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Source</th>
            <th className="p-2 text-left">Destination</th>
            <th className="p-2 text-left">Protocol</th>
            <th className="p-2 text-left">Length</th>
          </tr>
        </thead>
        <tbody className="bg-slate-900 text-gray-100">
          {packets.map((p) => (
            <tr key={p.id} className="border-t border-slate-700 hover:bg-slate-800 transition">
              <td className="p-2">{p.time}</td>
              <td className="p-2">{p.source}</td>
              <td className="p-2">{p.destination}</td>
              <td className="p-2 text-indigo-400">{p.protocol}</td>
              <td className="p-2">{p.length} bytes</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
