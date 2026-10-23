import React from 'react';

export default function ManagerDashboardView({ onNavigate }) {
  const taskReports = [
    { name: 'Hesbon Ndemo', task: 'Website Update', status: 'Completed', date: '23 Oct 2026' },
    { name: 'Mary Wanjiku', task: 'UI Design', status: 'In Progress', date: '23 Oct 2026' },
    { name: 'John Kamau', task: 'Backend Fixes', status: 'Completed', date: '22 Oct 2026' },
    { name: 'Aisha Njeri', task: 'Testing', status: 'Pending', date: '22 Oct 2026' },
  ];

  const absenceRequests = [
    { name: 'Mary Wanjiku', reason: 'Personal', date: '22 Oct 2026', status: 'Pending' },
    { name: 'John Kamau', reason: 'Sick Leave', date: '21 Oct 2026', status: 'Approved' },
    { name: 'Aisha Njeri', reason: 'Family', date: '20 Oct 2026', status: 'Pending' },
  ];

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)', boxSizing: 'border-box' }}>
      
      {/* Top Banner */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>Manager Dashboard</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Overview of your team and work progress.</p>
      </div>

      {/* 4 Metric Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: '#dbeafe', color: '#2563eb', padding: '0.75rem', borderRadius: '50%', fontSize: '1.25rem' }}>👥</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Employees</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>18</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.75rem', borderRadius: '50%', fontSize: '1.25rem' }}>👤</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Present Today</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>14</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '50%', fontSize: '1.25rem' }}>👤</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Absent Today</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>2</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0.75rem', borderRadius: '50%', fontSize: '1.25rem' }}>📝</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Pending Reports</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>4</div>
          </div>
        </div>

      </div>

      {/* Grid Section: Overview Donut Chart & Task Reports */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Donut Attendance Overview */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#0f172a' }}>Attendance Overview</h4>
          
          <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 1.25rem auto', borderRadius: '50%', background: 'conic-gradient(#16a34a 0% 77%, #ef4444 77% 88%, #f59e0b 88% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '90px', height: '90px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a' }}>18</span>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Total</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }}></span> Present</span>
              <strong>14</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span> Absent</span>
              <strong>2</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span> On Leave</span>
              <strong>2</strong>
            </div>
          </div>
        </div>

        {/* Recent Task Reports Table */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a' }}>Recent Task Reports</h4>
            <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer' }}>View All ➔</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '0.5rem 0' }}>Employee</th>
                  <th style={{ padding: '0.5rem 0' }}>Task Title</th>
                  <th style={{ padding: '0.5rem 0' }}>Status</th>
                  <th style={{ padding: '0.5rem 0' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {taskReports.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                    <td style={{ padding: '0.65rem 0', fontWeight: '600' }}>{row.name}</td>
                    <td style={{ padding: '0.65rem 0' }}>{row.task}</td>
                    <td style={{ padding: '0.65rem 0' }}>
                      <span style={{
                        padding: '0.15rem 0.45rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        backgroundColor: row.status === 'Completed' ? '#dcfce7' : row.status === 'In Progress' ? '#dbeafe' : '#fef3c7',
                        color: row.status === 'Completed' ? '#16a34a' : row.status === 'In Progress' ? '#2563eb' : '#d97706'
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 0', color: '#64748b' }}>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Bottom Section: Recent Absence Requests & Quick Actions Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem' }}>
        
        {/* Recent Absence Requests */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a' }}>Recent Absence Requests</h4>
            <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer' }}>View All ➔</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '0.5rem 0' }}>Employee</th>
                  <th style={{ padding: '0.5rem 0' }}>Reason</th>
                  <th style={{ padding: '0.5rem 0' }}>Date</th>
                  <th style={{ padding: '0.5rem 0' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {absenceRequests.map((req, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                    <td style={{ padding: '0.65rem 0', fontWeight: '600' }}>{req.name}</td>
                    <td style={{ padding: '0.65rem 0' }}>{req.reason}</td>
                    <td style={{ padding: '0.65rem 0', color: '#64748b' }}>{req.date}</td>
                    <td style={{ padding: '0.65rem 0' }}>
                      <span style={{
                        padding: '0.15rem 0.45rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        backgroundColor: req.status === 'Approved' ? '#dcfce7' : '#fef3c7',
                        color: req.status === 'Approved' ? '#16a34a' : '#d97706'
                      }}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Manager Quick Actions */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#0f172a' }}>Quick Actions</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.65rem', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              👤 View All Employees
            </button>
            <button style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '0.65rem', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✅ Approve Absence Requests
            </button>
            <button style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '0.65rem', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📊 View Reports
            </button>
            <button onClick={() => onNavigate('payroll')} style={{ backgroundColor: '#f59e0b', color: '#fff', border: 'none', padding: '0.65rem', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💳 Payroll Management
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}