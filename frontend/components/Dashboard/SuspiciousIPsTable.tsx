"use client";

const data = [
  { ip: "192.168.1.10", country: "USA", type: "DoS", score: 95 },
  { ip: "203.0.113.5", country: "India", type: "SQLi", score: 87 },
  { ip: "10.0.0.45", country: "China", type: "Brute Force", score: 78 },
  { ip: "8.8.8.8", country: "Global", type: "Recon", score: 60 },
];

export default function SuspiciousIPsTable() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Top Suspicious IPs</h2>
      <table className="w-full text-sm text-left border border-slate-700">
        <thead className="bg-slate-700 text-gray-200">
          <tr>
            <th className="p-2">IP</th>
            <th className="p-2">Country</th>
            <th className="p-2">Attack Type</th>
            <th className="p-2">Threat Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} className="border-t border-slate-600">
              <td className="p-2">{d.ip}</td>
              <td className="p-2">{d.country}</td>
              <td className="p-2">{d.type}</td>
              <td className="p-2 font-bold text-red-400">{d.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
