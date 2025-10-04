"use client";

export default function SummaryCards() {
  const stats = [
    { name: "Packets Captured", value: "1.2M", color: "bg-blue-600" },
    { name: "Alerts Generated", value: "452", color: "bg-red-600" },
    { name: "High Severity", value: "37", color: "bg-orange-500" },
    { name: "System Uptime", value: "12d 4h", color: "bg-green-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`${s.color} rounded-xl p-4 text-white shadow-lg`}
        >
          <p className="text-sm opacity-80">{s.name}</p>
          <h2 className="text-2xl font-bold">{s.value}</h2>
        </div>
      ))}
    </div>
  );
}
