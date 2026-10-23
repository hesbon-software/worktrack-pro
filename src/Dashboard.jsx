import React, { useState } from 'react';
import EmployeeDashboard from './dashboards/EmployeeDashboard';
import ManagerDashboard from './dashboards/ManagerDashboard';
import EmployerDashboard from './dashboards/EmployerDashboard';

export default function Dashboard() {
  const [activeRole, setActiveRole] = useState('employee');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* Top Header & Role Switcher */}
      <header className="flex flex-col sm:flex-row justify-between items-center pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">WorkTrack Pro Dashboard</h1>
          <p className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mt-1">
            POWERED BY HESBON SOFTWARE DESIGNER
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveRole('employee')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeRole === 'employee'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Employee
          </button>
          <button
            onClick={() => setActiveRole('manager')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeRole === 'manager'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manager
          </button>
          <button
            onClick={() => setActiveRole('employer')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeRole === 'employer'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Employer
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto">
        {activeRole === 'employee' && <EmployeeDashboard />}
        {activeRole === 'manager' && <ManagerDashboard />}
        {activeRole === 'employer' && <EmployerDashboard />}
      </main>
    </div>
  );
}
