"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    id: 1,
    type: "DDoS",
    severity: "High",
    source: "192.168.1.5",
    destination: "10.0.0.2",
    details: "High packet rate detected",
    raw: "{ packet_data: ... }",
    reason: "Anomaly detected by ML model",
  },
  {
    id: 2,
    type: "Port Scan",
    severity: "Medium",
    source: "192.168.1.8",
    destination: "10.0.0.3",
    details: "Multiple ports accessed",
    raw: "{ packet_data: ... }",
    reason: "Suspicious connection attempts",
  },
];

export default function AlertsTable() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const handleBlockIP = (ip: string) => {
    console.log(`Blocking IP: ${ip}`);
    alert(`🚫 IP ${ip} will be blocked (future integration).`);
  };

  const handleReportToSIEM = (alertType: string) => {
    console.log(`Reporting ${alertType} to SIEM...`);
    alert(`📡 ${alertType} alert reported to SIEM system.`);
  };

  const handleAnalyzePacket = (raw: string) => {
    console.log("Analyzing packet data:", raw);
    alert("🧠 ML re-analysis triggered for selected packet.");
  };

  return (
    <div className="p-6 text-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-white">Active Alerts</h2>

      <table className="min-w-full border border-slate-700 rounded-lg overflow-hidden">
        <thead className="bg-slate-800 text-gray-200 uppercase text-sm">
          <tr>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Severity</th>
            <th className="p-3 text-left">Source</th>
            <th className="p-3 text-left">Destination</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="bg-slate-900 text-gray-100">
          {alerts.map((alert) => (
            <tr
              key={alert.id}
              className="border-t border-slate-700 hover:bg-slate-800 transition"
            >
              <td className="p-3">{alert.type}</td>
              <td
                className={`p-3 font-semibold ${
                  alert.severity === "High"
                    ? "text-red-400"
                    : alert.severity === "Medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {alert.severity}
              </td>
              <td className="p-3">{alert.source}</td>
              <td className="p-3">{alert.destination}</td>
              <td className="p-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md px-3 py-1 transition"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      Details
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-slate-900 text-gray-100 border border-slate-700 max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold text-indigo-400">
                        {selectedAlert?.type} Alert
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Severity:{" "}
                        <span
                          className={`font-semibold ${
                            selectedAlert?.severity === "High"
                              ? "text-red-400"
                              : selectedAlert?.severity === "Medium"
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {selectedAlert?.severity}
                        </span>
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 space-y-2 text-sm">
                      <p>
                        <strong>Source:</strong> {selectedAlert?.source}
                      </p>
                      <p>
                        <strong>Destination:</strong> {selectedAlert?.destination}
                      </p>
                      <p>
                        <strong>Reason:</strong> {selectedAlert?.reason}
                      </p>

                      <pre className="bg-slate-950 text-green-400 p-3 rounded-md mt-3 text-xs overflow-x-auto border border-slate-800">
                        {selectedAlert?.raw}
                      </pre>
                    </div>

                    {/* 🚀 Action Buttons Section */}
                    <div className="mt-6 flex justify-between gap-3">
                      <Button
                        className="bg-red-600 hover:bg-red-500 text-white text-sm"
                        onClick={() => handleBlockIP(selectedAlert?.source)}
                      >
                        🚫 Block IP
                      </Button>
                      <Button
                        className="bg-yellow-500 hover:bg-yellow-400 text-black text-sm"
                        onClick={() => handleReportToSIEM(selectedAlert?.type)}
                      >
                        📡 Report to SIEM
                      </Button>
                      <Button
                        className="bg-blue-600 hover:bg-blue-500 text-white text-sm"
                        onClick={() => handleAnalyzePacket(selectedAlert?.raw)}
                      >
                        🧠 Analyze Packet
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
