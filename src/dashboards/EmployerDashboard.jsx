import React from 'react';

export default function EmployerDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Total Workforce</p>
          <h2 className="text-3xl font-extrabold mt-1">48</h2>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Monthly Payroll Estimate</p>
          <h2 className="text-3xl font-extrabold text-emerald-400 mt-1">$64,200</h2>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Overall Productivity</p>
          <h2 className="text-3xl font-extrabold text-sky-400 mt-1">94%</h2>
        </div>
      </div>
    </div>
  );
}
