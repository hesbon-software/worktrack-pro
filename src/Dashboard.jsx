import React, { useState } from 'react';
import EmployeeDashboard from './dashboards/EmployeeDashboard';
import ManagerDashboard from './dashboards/ManagerDashboard';
import EmployerDashboard from './dashboards/EmployerDashboard';

export default function Dashboard() {
  const [activeRole, setActiveRole] = useState('employee');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', padding: '1.5rem', fontFamily: 'sans-serif' }}>
      {/* Top Header & Role Switcher */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid #1e293b', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>WorkTrack Pro Dashboard</h1>
          <p style={{ fontSize: '0.75rem', color: '#22d3ee', fontWeight: 'bold', textTransform: 'uppercase', margin: '0.25rem 0 0 0' }}>
            POWERED BY HESBON SOFTWARE DESIGNER
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div style={{ display: 'flex', backgroundColor: '#0f172a', padding: '0.35rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
          <button
            onClick={() => setActiveRole('employee')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeRole === 'employee' ? '#059669' : 'transparent',
              color: activeRole === 'employee' ? '#ffffff' : '#94a3b8',
            }}
          >
            Employee
          </button>
          <button
            onClick={() => setActiveRole('manager')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeRole === 'manager' ? '#2563eb' : 'transparent',
              color: activeRole === 'manager' ? '#ffffff' : '#94a3b8',
            }}
          >
            Manager
          </button>
          <button
            onClick={() => setActiveRole('employer')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeRole === 'employer' ? '#9333ea' : 'transparent',
              color: activeRole === 'employer' ? '#ffffff' : '#94a3b8',
            }}
          >
            Employer
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {activeRole === 'employee' && <EmployeeDashboard />}
        {activeRole === 'manager' && <ManagerDashboard />}
        {activeRole === 'employer' && <EmployerDashboard />}
      </main>
    </div>
  );
}
