import React, { useState } from 'react';

export default function EmployeeDashboard() {
  const [clockedIn, setClockedIn] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold mb-2">Employee Workspace</h2>
        <p className="text-slate-400 mb-4">Status: {clockedIn ? '🟢 On the Clock' : '🔴 Off the Clock'}</p>
        <button
          onClick={() => setClockedIn(!clockedIn)}
          className={`px-4 py-2 rounded-lg font-bold text-white transition ${
            clockedIn ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {clockedIn ? 'Clock Out' : 'Clock In Now'}
        </button>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-bold mb-3">My Tasks</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="p-3 bg-slate-900 rounded-lg border border-slate-700 flex justify-between items-center">
            <span>✓ Complete Firebase Authentication Setup</span>
            <span className="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded">Done</span>
          </li>
          <li className="p-3 bg-slate-900 rounded-lg border border-slate-700 flex justify-between items-center">
            <span>⏳ Build Employee Dashboard UI</span>
            <span className="text-xs bg-amber-900 text-amber-300 px-2 py-1 rounded">In Progress</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
