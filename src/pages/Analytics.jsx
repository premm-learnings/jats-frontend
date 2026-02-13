import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // ✅ Import Navbar
import {
  getOverviewStats,
  getConversionStats,
  getOutcomeStats,
} from "../api/analyticsApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function Analytics() {

  const [overview, setOverview] = useState(null);
  const [conversion, setConversion] = useState(null);
  const [outcomes, setOutcomes] = useState(null);
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const [o, c, out] = await Promise.all([
        getOverviewStats(),
        getConversionStats(),
        getOutcomeStats()
      ]);

      setOverview(o.data);
      setConversion(c.data);
      setOutcomes(out.data);
    } catch (err) {
      console.error("Failed to load analytics", err);
      setError("Unable to load analytics data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const statusData = overview ? [
    { name: "Saved", value: overview.saved, color: "#94a3b8" },
    { name: "Applied", value: overview.applied, color: "#60a5fa" },
    { name: "Interview", value: overview.interview, color: "#f59e0b" },
    { name: "Offer", value: overview.offer, color: "#10b981" },
    { name: "Rejected", value: overview.rejected, color: "#ef4444" },
  ] : [];

  const conversionData = conversion ? [
    { name: "Applied → Interview", rate: conversion.appliedToInterviewRate },
    { name: "Interview → Offer", rate: conversion.interviewToOfferRate },
  ] : [];

  const outcomeData = outcomes ? [
    { name: "Offer Rate", value: outcomes.offerSuccessRate },
    { name: "Rejection Rate", value: outcomes.rejectionRate },
  ] : [];

  const PIE_COLORS = ["#10b981", "#ef4444"];

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar /> {/* ✅ Navbar included */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
          <svg className="animate-spin h-10 w-10 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-500 font-medium">Crunching the numbers...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar /> {/* ✅ Navbar included */}
        <div className="p-8 flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-md max-w-lg w-full">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg leading-6 font-medium text-red-800">Analytics Error</h3>
                <div className="mt-2 text-sm text-red-700"><p>{error}</p></div>
                <div className="mt-4">
                  <button onClick={loadAnalytics} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Render
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* ✅ Navbar at the top */}
      <Navbar />

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Analytics Dashboard
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Insights into your job application pipeline performance
            </p>
          </div>

          {/* ===== SUMMARY CARDS ===== */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <Card 
              title="Total Jobs" 
              value={overview.totalApplications} 
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
              color="bg-indigo-500"
            />
            <Card 
              title="Applied" 
              value={overview.applied} 
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              color="bg-blue-500"
            />
            <Card 
              title="Interviews" 
              value={overview.interview} 
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              color="bg-amber-500"
            />
            <Card 
              title="Offers" 
              value={overview.offer} 
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              color="bg-emerald-500"
            />
            <Card 
              title="Rejected" 
              value={overview.rejected} 
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              color="bg-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* ===== STATUS BAR CHART ===== */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Pipeline Distribution
              </h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      cursor={{fill: '#f1f5f9'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ===== CONVERSION BAR CHART ===== */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Conversion Rates (%)
              </h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis dataKey="name" type="category" width={120} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      formatter={(value) => `${value}%`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="rate" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ===== OUTCOME PIE CHART ===== */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 lg:col-span-2">
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Success vs Rejection Rate
              </h3>
              <div className="h-80 w-full flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={outcomeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {outcomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip 
                       formatter={(value) => `${value}%`}
                       contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- REUSABLE CARD ----------
function Card({ title, value, icon, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4 hover:shadow-md transition-shadow">
      <div className={`flex-shrink-0 p-3 rounded-lg ${color} bg-opacity-10`}>
         <div className={color.replace('bg-', 'text-')}>
           {icon}
         </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}