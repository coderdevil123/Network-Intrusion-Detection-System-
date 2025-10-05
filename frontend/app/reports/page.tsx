"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------
   Helper: Fake data generators
   ------------------------- */
function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genTrend() {
  const hours = ["00", "04", "08", "12", "16", "20", "24"];
  return hours.map((h, idx) => ({ id: idx, time: `${h}:00`, packets: randomRange(200, 1500) }));
}

function genProtocols() {
  const proto = ["TCP", "UDP", "ICMP", "HTTP", "DNS"];
  return proto.map((p) => ({ name: p, value: randomRange(10, 120) }));
}

function genSeverity() {
  return [
    { name: "Low", value: randomRange(10, 60) },
    { name: "Medium", value: randomRange(10, 70) },
    { name: "High", value: randomRange(5, 40) },
    { name: "Critical", value: randomRange(1, 20) },
  ];
}

function genTopSources() {
  return Array.from({ length: 5 }).map((_, i) => ({
    ip: `192.168.${randomRange(0, 2)}.${randomRange(10, 250)}`,
    country: ["US", "IN", "RU", "CN", "BR"][randomRange(0, 4)],
    count: randomRange(10, 400),
  }));
}

/* -------------------------
   Small UI helpers
   ------------------------- */
function GlowCard({ title, value, icon, colorClass }: { title: string; value: string; icon?: string; colorClass: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`p-5 rounded-2xl shadow-xl border ${colorClass} bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-gray-300 tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-white">{value}</h3>
        </div>
        {icon && (
          <div className="text-3xl text-white/80 opacity-90">
            <span>{icon}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* -------------------------
   AI typing hook
   ------------------------- */
function useTypewriter(text: string, start: boolean, speed = 24) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) {
      setOut("");
      return;
    }
    let i = 0;
    setOut("");
    const id = setInterval(() => {
      setOut((s) => s + text[i]);
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed]);
  return out;
}

/* -------------------------
   Main Reports Page
   ------------------------- */
export default function ReportsPage() {
  // data state
  const [trend, setTrend] = useState(() => genTrend());
  const [protocols, setProtocols] = useState(() => genProtocols());
  const [severity, setSeverity] = useState(() => genSeverity());
  const [topSources, setTopSources] = useState(() => genTopSources());

  // UI state
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState("");

  // auto-refresh loop (every 5 seconds)
  useEffect(() => {
    const iv = setInterval(() => {
      setTrend(genTrend());
      setProtocols(genProtocols());
      setSeverity(genSeverity());
      setTopSources(genTopSources());
      setLastUpdated(new Date());
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  // derived summary numbers (animated feel)
  const totalPackets = useMemo(() => trend.reduce((s, t) => s + t.packets, 0), [trend]);
  const threatsDetected = useMemo(() => severity.reduce((s, item) => s + item.value, 0), [severity]);
  const uniqueSources = useMemo(() => topSources.length + randomRange(10, 150), [topSources]);
  const peakHour = useMemo(() => trend.reduce((prev, cur) => (cur.packets > prev.packets ? cur : prev), trend[0])?.time ?? "—", [trend]);

  // AI summary content (fake)
  const aiGenerated = useMemo(() => {
    return `🧠 AI Report Summary\n\nIn the last 24 hours, the system processed ${totalPackets.toLocaleString()} packets. Detected ${threatsDetected} suspicious events. Traffic peaked at ${peakHour}. Protocol mix currently shows TCP dominant traffic with notable UDP spikes. Top sources include ${topSources.map(s => s.ip).join(", ")}. Recommendation: increase monitoring thresholds for top sources and review firewall rules for repeated hits on SSH and HTTP ports.`;
  }, [totalPackets, threatsDetected, peakHour, topSources]);

  // typing effect text for modal
  const typed = useTypewriter(aiGenerated, showAIModal && !aiLoading, 18);

  // handle the AI modal open
  const handleOpenAI = () => {
    setShowAIModal(true);
    setAiLoading(true);
    setAiText("");
    // simulate network/analysis delay
    setTimeout(() => {
      setAiLoading(false);
      setAiText(aiGenerated);
    }, 1600); // after loading, typewriter kicks in
  };

  // Colors for charts
  const COLORS = ["#06b6d4", "#60a5fa", "#f97316", "#ef4444", "#a78bfa"];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-indigo-300">Threat & Traffic Report</h1>
          <p className="text-sm text-gray-400 mt-1">Snapshot of last 24 hours — auto-refreshing every 5s</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right mr-4">
            <div className="text-xs text-gray-400">Last updated</div>
            <div className="text-sm text-gray-200">{lastUpdated.toLocaleTimeString()}</div>
          </div>

          <button
            onClick={handleOpenAI}
            className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-sm font-medium text-black shadow-md"
          >
            🤖 Generate AI Summary
          </button>

          <button
            onClick={() => alert("Export simulated")}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium text-white shadow-md"
          >
            📥 Export Report
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <GlowCard title="Total Packets" value={totalPackets.toLocaleString()} icon="🛰" colorClass="border-indigo-600/40" />
        <GlowCard title="Threats Detected" value={threatsDetected.toString()} icon="⚠️" colorClass="border-red-600/30" />
        <GlowCard title="Unique Sources" value={uniqueSources.toString()} icon="🌐" colorClass="border-blue-600/30" />
        <GlowCard title="Peak Hour" value={peakHour} icon="⏰" colorClass="border-yellow-500/30" />
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Line chart (spans 2 cols on large) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-slate-900/60 rounded-2xl border border-slate-800 p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-semibold text-indigo-300">Traffic Volume Over Time</h3>
            <div className="text-xs text-gray-400">Packets / interval</div>
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip wrapperStyle={{ background: "#0b1220", border: "1px solid #1f2937" }} />
                <Line type="monotone" dataKey="packets" stroke="#60a5fa" strokeWidth={3} dot={{ r: 3 }} animationDuration={800} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-semibold text-indigo-300">Protocol Distribution</h3>
            <div className="text-xs text-gray-400">Protocol / count</div>
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={protocols} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                  {protocols.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" wrapperStyle={{ color: "#94a3b8" }} />
                <Tooltip wrapperStyle={{ background: "#0b1220", border: "1px solid #1f2937" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar chart (full width under) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 shadow-lg lg:col-span-3"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-semibold text-indigo-300">Threat Severity Levels</h3>
            <div className="text-xs text-gray-400">Count by severity</div>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severity}>
                <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip wrapperStyle={{ background: "#0b1220", border: "1px solid #1f2937" }} />
                <Bar dataKey="value">
                  {severity.map((s, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Top sources table */}
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 shadow-lg mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-md font-semibold text-indigo-300">Top Source IPs</h3>
          <div className="text-xs text-gray-400">By attack count</div>
        </div>

        <table className="min-w-full text-sm">
          <thead className="bg-slate-800/60 text-gray-300 uppercase text-xs">
            <tr>
              <th className="p-3 text-left">IP Address</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Attack Count</th>
            </tr>
          </thead>
          <tbody>
            {topSources.map((s, i) => (
              <tr key={s.ip + "-" + i} className="border-t border-slate-700 hover:bg-slate-800/60 transition">
                <td className="p-3">{s.ip}</td>
                <td className="p-3">{s.country}</td>
                <td className="p-3 font-semibold text-indigo-300">{s.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* bottom actions */}
      <div className="flex items-center justify-between gap-4">
        <div />
        <div className="flex gap-3">
          <button onClick={() => { setTrend(genTrend()); setProtocols(genProtocols()); setSeverity(genSeverity()); setTopSources(genTopSources()); }} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm">
            🔄 Refresh Now
          </button>

          <button onClick={() => alert("Export simulated")} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm">
            📥 Export
          </button>
        </div>
      </div>

      {/* AI modal (bottom slide up) */}
      <AnimatePresence>
        {showAIModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
          >
            {/* overlay */}
            <motion.div className="absolute inset-0 bg-black/60" onClick={() => setShowAIModal(false)} />

            <motion.div
              initial={{ y: 160 }}
              animate={{ y: 0 }}
              exit={{ y: 160 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="relative w-full max-w-2xl mb-8 mx-4 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-emerald-300">AI Report Summary</h4>
                  <p className="text-xs text-gray-400 mt-1">Auto-generated analysis (simulated)</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { navigator.clipboard.writeText(aiText || aiGenerated); alert("Summary copied"); }} className="text-xs px-3 py-1 rounded bg-slate-700 hover:bg-slate-600">Copy</button>
                  <button onClick={() => setShowAIModal(false)} className="text-xs px-3 py-1 rounded bg-slate-700 hover:bg-slate-600">Close</button>
                </div>
              </div>

              <div className="mt-4">
                {aiLoading ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-emerald-500 border-opacity-70"></div>
                    <p className="mt-4 text-sm text-gray-400">Analyzing data with AI...</p>
                  </div>
                ) : (
                  <div className="bg-slate-800/60 p-4 rounded-lg text-sm text-gray-200 whitespace-pre-wrap leading-relaxed min-h-[120px]">
                    {/* typewriter effect */}
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-100">{typed || aiText || aiGenerated}</pre>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-end gap-3">
                <button onClick={() => alert("Export PDF simulated")} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-sm">📄 Export PDF</button>
                <button onClick={() => alert("Email simulated")} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-sm text-black">✉️ Email Report</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
