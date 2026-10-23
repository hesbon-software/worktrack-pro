import React from 'react';

export default function EmployerDashboard() {
  return (
    <div style={{ color: '#fff' }}>
      <div style={{ backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #1e293b', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#9333ea', margin: '0 0 0.5rem 0' }}>Employer Executive Suite</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>Global company analytics, financial tracking, and organization settings.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div style={{ backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
          <h3 style={{ fontSize: '1rem', color: '#38bdf8', marginBottom: '0.5rem' }}>Company Overview</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>WorkTrack Pro - Enterprise Edition Active</p>
        </div>
        <div style={{ backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
          <h3 style={{ fontSize: '1rem', color: '#38bdf8', marginBottom: '0.5rem' }}>User Management</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Manage employee access permissions.</p>
        </div>
      </div>
    </div>
  );
}