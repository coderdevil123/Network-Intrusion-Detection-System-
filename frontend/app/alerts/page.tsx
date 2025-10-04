"use client";

import AlertsTable from "@/components/Alerts/AlertsTable";

export default function AlertsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🚨 Alerts & Incidents</h1>
      <p className="text-gray-400">Monitor, investigate, and respond to detected threats.</p>

      {/* Alerts Table */}
      <AlertsTable />
    </div>
  );
}
