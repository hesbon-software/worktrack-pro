import React from 'react';

export default function EmployeeDashboard() {
  return (
    <div style={{ color: '#fff' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Employee Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '1rem', color: '#38bdf8', marginBottom: '0.5rem' }}>My Tasks</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No active tasks assigned yet.</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '1rem', color: '#38bdf8', marginBottom: '0.5rem' }}>Clock In / Out</h3>
          <button style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold', marginTop: '0.5rem' }}>
            Clock In
          </button>
        </div>
      </div>
    </div>
  );
}
