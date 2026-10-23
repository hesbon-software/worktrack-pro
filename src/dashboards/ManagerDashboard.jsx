import React from 'react';

export default function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold mb-2">Team Attendance</h2>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2">12 / 14</p>
          <p className="text-sm text-slate-400 mt-1">Active team members online today</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold mb-2">Leave Approvals</h2>
          <div className="mt-3 space-y-3">
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-700 text-sm">
              <span>Jane Smith (Sick Leave)</span>
              <div className="space-x-2">
                <button className="bg-emerald-600 px-3 py-1 rounded text-xs font-bold hover:bg-emerald-500">Approve</button>
                <button className="bg-red-600 px-3 py-1 rounded text-xs font-bold hover:bg-red-500">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

