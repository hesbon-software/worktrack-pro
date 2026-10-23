import React from 'react';

export default function EmployeeDashboard() {
  return (
    <div style={{ color: '#fff' }}>
      <div style={{ backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #1e293b', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981', margin: '0 0 0.5rem 0' }}>Employee Workspace</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>Welcome back! Track your daily tasks, submit reports, and manage your shifts here.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div style={{ backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
          <h3 style={{ fontSize: '1rem', color: '#38bdf8', marginBottom: '0.5rem' }}>My Assigned Tasks</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No pending tasks for today.</p>
        </div>
        <div style={{ backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
          <h3 style={{ fontSize: '1rem', color: '#38bdf8', marginBottom: '0.5rem' }}>Time Tracking</h3>
          <button style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}>
            Clock In
          </button>
        </div>
      </div>
    </div>
  );
}