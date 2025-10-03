"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [traffic, setTraffic] = useState({
    normal: 1200,
    malicious: 45,
    alerts: 10,
  });

  // Simulate live update
  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic((prev) => ({
        normal: prev.normal + Math.floor(Math.random() * 5),
        malicious: prev.malicious + Math.floor(Math.random() * 2),
        alerts: prev.alerts + Math.floor(Math.random() * 1),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Normal Traffic */}
      <div className="bg-green-600 p-6 rounded-2xl shadow-lg text-white">
        <h2 className="text-2xl font-bold">Normal Traffic</h2>
        <p className="text-4xl mt-4">{traffic.normal}</p>
      </div>

      {/* Malicious Traffic */}
      <div className="bg-red-600 p-6 rounded-2xl shadow-lg text-white">
        <h2 className="text-2xl font-bold">Malicious Traffic</h2>
        <p className="text-4xl mt-4">{traffic.malicious}</p>
      </div>

      {/* Alerts */}
      <div className="bg-yellow-500 p-6 rounded-2xl shadow-lg text-white">
        <h2 className="text-2xl font-bold">Active Alerts</h2>
        <p className="text-4xl mt-4">{traffic.alerts}</p>
      </div>
    </section>
  );
}
