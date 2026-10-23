import React, { useState } from 'react';

export default function AttendanceView() {
  const [isPresent, setIsPresent] = useState(true);
  const [clockInTime, setClockInTime] = useState('08:12 AM');

  const attendanceHistory = [
    { date: '23 Oct 2026', clockIn: '08:12 AM', clockOut: '-', status: 'Present' },
    { date: '22 Oct 2026', clockIn: '08:05 AM', clockOut: '05:02 PM', status: 'Present' },
    { date: '21 Oct 2026', clockIn: '08:10 AM', clockOut: '04:58 PM', status: 'Present' },
    { date: '20 Oct 2026', clockIn: '08:15 AM', clockOut: '05:00 PM', status: 'Present' },
  ];

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)', boxSizing: 'border-box' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>Attendance</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Track your working hours and view your attendance history.</p>
      </div>

      {/* Clock In / Clock Out Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
          <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.75rem', borderRadius: '50%', fontSize: '1.25rem' }}>⏱️</div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: '#16a34a' }}>Clock In</h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Start your workday</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
          <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '50%', fontSize: '1.25rem' }}>⏱️</div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: '#ef4444' }}>Clock Out</h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>End your workday</span>
          </div>
        </div>
      </div>

      {/* Today's Attendance Panel */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.25rem 1.5rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#0f172a' }}>Today's Attendance</h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Clock In Time</span>
            <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>{clockInTime}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Clock Out Time</span>
            <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>-</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Status</span>
            <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.25rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              ✓ Present
            </span>
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.25rem 1.5rem', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a' }}>Attendance History</h4>
          <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer' }}>View All</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '0.65rem 0' }}>Date</th>
                <th style={{ padding: '0.65rem 0' }}>Clock In</th>
                <th style={{ padding: '0.65rem 0' }}>Clock Out</th>
                <th style={{ padding: '0.65rem 0' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                  <td style={{ padding: '0.65rem 0' }}>{item.date}</td>
                  <td style={{ padding: '0.65rem 0' }}>{item.clockIn}</td>
                  <td style={{ padding: '0.65rem 0' }}>{item.clockOut}</td>
                  <td style={{ padding: '0.65rem 0' }}>
                    <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: '600' }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

