import React, { useState } from 'react';

export default function ReportAbsenceView() {
  const [absenceRequests, setAbsenceRequests] = useState([
    { id: 1, date: '22 Oct 2026', reason: 'Personal', status: 'Pending', feedback: '-' },
    { id: 2, date: '15 Oct 2026', reason: 'Sick Leave', status: 'Approved', feedback: 'Get well soon!' },
    { id: 3, date: '10 Oct 2026', reason: 'Family', status: 'Rejected', feedback: 'Not enough details.' },
  ]);

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)', boxSizing: 'border-box' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Left Form Panel */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: '0 0 0.25rem 0' }}>Report Absence</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem' }}>Let your manager know when you can't report for work.</p>

          <form style={{ display: 'grid', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Date of Absence *</label>
              <input type="date" defaultValue="2026-10-24" style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Reason *</label>
              <select style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '0.85rem' }}>
                <option value="">Select reason</option>
                <option value="Personal">Personal</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Family">Family Emergency</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Additional details (optional)</label>
              <textarea rows="3" placeholder="E.g. Any supporting information..." style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
            </div>

            <button type="button" style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
              Submit Request
            </button>
          </form>
        </div>

        {/* Right Absence Requests Table */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1rem', color: '#0f172a', margin: '0 0 1rem 0' }}>My Absence Requests</h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '0.5rem 0' }}>Date</th>
                  <th style={{ padding: '0.5rem 0' }}>Reason</th>
                  <th style={{ padding: '0.5rem 0' }}>Status</th>
                  <th style={{ padding: '0.5rem 0' }}>Manager Feedback</th>
                </tr>
              </thead>
              <tbody>
                {absenceRequests.map((req) => (
                  <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                    <td style={{ padding: '0.65rem 0' }}>{req.date}</td>
                    <td style={{ padding: '0.65rem 0' }}>{req.reason}</td>
                    <td style={{ padding: '0.65rem 0' }}>
                      <span style={{ 
                        padding: '0.15rem 0.45rem', 
                        borderRadius: '0.25rem', 
                        fontSize: '0.7rem', 
                        fontWeight: 'bold',
                        backgroundColor: req.status === 'Approved' ? '#dcfce7' : req.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                        color: req.status === 'Approved' ? '#16a34a' : req.status === 'Pending' ? '#d97706' : '#ef4444'
                      }}>
                        {req.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 0', color: '#64748b' }}>{req.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}

