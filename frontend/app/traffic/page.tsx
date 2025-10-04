"use client";

import ProtocolBarChart from "@/components/Traffic/ProtocolBarChart";
import LivePacketsTable from "@/components/Traffic/LivePacketsTable";

export default function TrafficAnalysisPage() {
  return (
    <div className="p-6 text-gray-100">
      <h1 className="text-2xl font-bold mb-2 text-white">
        🧠 Traffic Analysis
      </h1>
      <p className="text-gray-400 mb-6">
        Monitor live network packets, protocols, and trends in real-time.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-indigo-400">
            Protocol Distribution
          </h2>
          <ProtocolBarChart />
        </div>

        <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-3 text-indigo-400">
            Live Packet Capture
          </h2>
          <LivePacketsTable />
        </div>
      </div>
    </div>
  );
}
