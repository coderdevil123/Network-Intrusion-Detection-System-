"use client";

import React, { useEffect, useState } from "react";
import PacketDrawer, { Packet } from "./PacketDrawer";

function randomIP(prefix = "192.168.1.") {
  return `${prefix}${Math.floor(Math.random() * 240) + 1}`;
}

function randomProtocol() {
  return ["TCP", "UDP", "ICMP", "HTTP", "DNS"][Math.floor(Math.random() * 5)];
}

export default function LivePacketsTable() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [selected, setSelected] = useState<Packet | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // push some initial packets
    const initial: Packet[] = Array.from({ length: 8 }).map(() => ({
      id: crypto.randomUUID(),
      time: new Date().toLocaleTimeString(),
      source: randomIP(),
      destination: `10.0.0.${Math.floor(Math.random() * 240) + 1}`,
      protocol: randomProtocol(),
      size: Math.floor(Math.random() * 1400) + 40,
      isSuspicious: Math.random() < 0.12,
      mlConfidence: Math.floor(Math.random() * 40) + 30, // 30-70 initial
      hex: undefined,
      decoded: undefined,
    }));
    setPackets(initial);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      const newPacket: Packet = {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        source: randomIP(),
        destination: `10.0.0.${Math.floor(Math.random() * 240) + 1}`,
        protocol: randomProtocol(),
        size: Math.floor(Math.random() * 1400) + 40,
        isSuspicious: Math.random() < 0.15,
        mlConfidence: Math.floor(Math.random() * 100),
        hex: undefined,
        decoded: undefined,
      };

      setPackets((prev) => [newPacket, ...prev].slice(0, 50));
    }, 2000);

    return () => clearInterval(iv);
  }, []);

  const openDrawer = (p: Packet) => {
    setSelected({
      ...p,
      // fill in fake hex & decoded to show in drawer
      hex:
        p.hex ||
        `0000  ${Math.random().toString(16).slice(2, 10).padEnd(8, "f")}  ${Math.random()
          .toString(16)
          .slice(2, 10)
          .padEnd(8, "f")}`,
      decoded: p.decoded || JSON.stringify({ src: p.source, dst: p.destination, proto: p.protocol, size: p.size }, null, 2),
    });
    setDrawerOpen(true);
  };

  const handleBlockIP = (ip: string) => {
    // placeholder action — later call backend API /api/block-ip
    setPackets((prev) => prev.filter((x) => x.source !== ip));
    alert(`🚫 Blocked IP: ${ip} (simulated)`);
    setDrawerOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-indigo-300">Live Packet Capture</h3>
        <div className="text-sm text-gray-400">Auto-updating feed • Showing latest 50</div>
      </div>

      <div className="overflow-auto max-h-[420px] border border-slate-700 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800 text-gray-300 sticky top-0">
            <tr>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Source</th>
              <th className="p-2 text-left">Destination</th>
              <th className="p-2 text-left">Proto</th>
              <th className="p-2 text-left">Size</th>
            </tr>
          </thead>

          <tbody className="bg-slate-900 text-gray-100">
            {packets.map((p, idx) => (
              <tr
                key={`${p.id}-${idx}`}
                onClick={() => openDrawer(p)}
                className={`cursor-pointer border-t border-slate-700 hover:bg-slate-800 transition
                  ${p.isSuspicious ? "bg-red-950/30 text-red-300 hover:bg-red-900/60" : ""}`}
              >
                <td className="p-2">{p.time}</td>
                <td className="p-2">{p.source}</td>
                <td className="p-2">{p.destination}</td>
                <td className="p-2 text-indigo-300">{p.protocol}</td>
                <td className="p-2">{p.size} B</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer component */}
      <PacketDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        packet={selected}
        onBlockIP={handleBlockIP}
      />
    </div>
  );
}
