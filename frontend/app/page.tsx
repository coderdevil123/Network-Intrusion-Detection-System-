"use client";

import SummaryCards from "@/components/Dashboard/SummaryCards";
import TrafficChart from "@/components/Dashboard/TrafficChart";
import AttackPieChart from "@/components/Dashboard/AttackPieChart";
import AlertTrend from "@/components/Dashboard/AlertTrend";
import GeoMap from "@/components/Dashboard/GeoMap";
import SuspiciousIPsTable from "@/components/Dashboard/SuspiciousIPsTable";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* ✅ Top Summary Cards */}
      <SummaryCards />

      {/* ✅ Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-slate-800/50 p-4 rounded-xl shadow">
          <TrafficChart />
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl shadow">
          <AttackPieChart />
        </div>
      </div>

      {/* ✅ Alerts Trend */}
      <div className="bg-slate-800/50 p-4 rounded-xl shadow">
        <AlertTrend />
      </div>

      {/* ✅ Geo Map + Suspicious IPs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 p-4 rounded-xl shadow">
          <GeoMap />
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl shadow">
          <SuspiciousIPsTable />
        </div>
      </div>
    </div>
  );
}
