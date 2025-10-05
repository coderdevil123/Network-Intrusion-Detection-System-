"use client";

import React from "react";

export interface Packet {
  id: string;
  time: string;
  source: string;
  destination: string;
  protocol: string;
  size: number;
  isSuspicious?: boolean;
  mlConfidence?: number; // 0-100
  hex?: string;
  decoded?: string;
}

export default function PacketDrawer({
  open,
  onClose,
  packet,
  onBlockIP,
}: {
  open: boolean;
  onClose: () => void;
  packet: Packet | null;
  onBlockIP: (ip: string) => void;
}) {
  // derive status color
  const conf = packet?.mlConfidence ?? 0;
  let confColor = "bg-green-500";
  if (conf >= 75) confColor = "bg-red-500";
  else if (conf >= 45) confColor = "bg-yellow-400";

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 z-40 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-[720px] max-w-full z-50 transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-gray-100 shadow-2xl border-l border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-semibold text-indigo-300">
                Packet Details
              </h3>
              <p className="text-sm text-gray-400">
                {packet ? `${packet.source} → ${packet.destination}` : "No packet selected"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Threat indicator */}
              {packet && (
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400">Threat</span>
                  <div className={`w-24 h-3 rounded-full ${confColor} shadow-sm`} />
                </div>
              )}

              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white px-2 py-1 rounded-md"
                aria-label="Close drawer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-auto p-6">
            {!packet ? (
              <div className="text-center text-gray-500 mt-24">
                Select a packet to view details
              </div>
            ) : (
              <>
                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <p className="text-xs text-gray-400">Timestamp</p>
                    <p className="font-medium">{packet.time}</p>

                    <p className="text-xs text-gray-400 mt-3">Protocol</p>
                    <p className="font-medium">{packet.protocol}</p>
                  </div>

                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <p className="text-xs text-gray-400">Source</p>
                    <p className="font-medium">{packet.source}</p>

                    <p className="text-xs text-gray-400 mt-3">Destination</p>
                    <p className="font-medium">{packet.destination}</p>

                    <p className="text-xs text-gray-400 mt-3">Size</p>
                    <p className="font-medium">{packet.size} bytes</p>
                  </div>
                </div>

                {/* ML Insights */}
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">ML Confidence</p>
                      <p className="text-xl font-semibold text-white">
                        {packet.mlConfidence ?? 0}% 
                        <span className="text-sm text-gray-400 ml-2">({packet.isSuspicious ? "Suspicious" : "Normal"})</span>
                      </p>
                    </div>

                    <div className="w-48">
                      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <div
                          style={{ width: `${packet.mlConfidence ?? 0}%` }}
                          className={`h-3 ${confColor} rounded-full transition-all duration-500`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => onBlockIP(packet.source)}
                      className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-md text-sm"
                    >
                      🚫 Block IP
                    </button>

                    <button
                      onClick={() => alert("Analyze payload (placeholder)")}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-md text-sm"
                    >
                      🧠 Analyze Payload
                    </button>

                    <button
                      onClick={() => alert("Reported to SIEM (placeholder)")}
                      className="bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-2 rounded-md text-sm"
                    >
                      📡 Report to SIEM
                    </button>
                  </div>
                </div>

                {/* Raw Data Tabs */}
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <div className="flex gap-3 mb-3">
                    <button className="text-sm px-3 py-1 bg-slate-700 rounded text-gray-200">Hex</button>
                    <button className="text-sm px-3 py-1 bg-transparent rounded text-gray-400">Decoded</button>
                  </div>

                  <div className="bg-black/80 p-3 rounded">
                    <pre className="text-xs text-green-400 overflow-auto">
{packet.hex ?? `0000  ff ff ff ff ff ff  00 00 00 00 00 00  08 00 45 00
0010  00 34 12 34 40 00 40 06  a6 ec c0 a8 01 05 0a 00
0020  00 02 00 50 00 50 00 00 00 00 00 00 00 00 50 02
0030  20 00 91 7c 00 00`}
                    </pre>
                  </div>

                  <div className="mt-3 text-sm text-gray-400">
                    <strong>Decoded:</strong>
                    <div className="mt-1 bg-slate-900 p-3 rounded text-xs text-gray-300">
                      {packet.decoded ?? JSON.stringify({
                        src: packet.source,
                        dst: packet.destination,
                        proto: packet.protocol,
                        size: packet.size
                      }, null, 2)}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button onClick={onClose} className="text-sm px-3 py-2 rounded-md bg-slate-700 hover:bg-slate-600">
              Close
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
