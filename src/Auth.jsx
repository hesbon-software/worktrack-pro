import React from 'react';

export default function ManagerPayrollView() {
  const payrollRecords = [
    { name: 'Hesbon Ndemo', department: 'IT', salary: '80,000', status: 'Paid', date: '20 Oct 2026' },
    { name: 'Mary Wanjiku', department: 'Design', salary: '70,000', status: 'Paid', date: '20 Oct 2026' },
    { name: 'John Kamau', department: 'Development', salary: '75,000', status: 'Pending', date: '-' },
    { name: 'Aisha Njeri', department: 'HR', salary: '60,000', status: 'Paid', date: '18 Oct 2026' },
  ];

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)', boxSizing: 'border-box' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>Payroll Management</h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Manage salaries, payments and payroll records.</p>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>📅 Thu, 23 Oct 2026</div>
      </div>

      {/* KPI Salary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: '#dbeafe', color: '#2563eb', padding: '0.75rem', borderRadius: '50%', fontSize: '1.25rem' }}>📊</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Employees</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>18</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.75rem', borderRadius: '50%', fontSize: '1.25rem' }}>💵</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>This Month's Payroll</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a' }}>KSh 1,280,000</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.75rem', borderRadius: '50%', fontSize: '1.25rem' }}>✓</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Paid</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>12</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0.75rem', borderRadius: '50%', fontSize: '1.25rem' }}>⌛</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Pending</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>6</div>
          </div>
        </div>

      </div>

      {/* Table Section */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#2563eb', borderBottom: '2px solid #2563eb', paddingBottom: '0.75rem', cursor: 'pointer' }}>Payment Records</span>
          <span style={{ fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>Salary Due</span>
          <span style={{ fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>Payment History</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '0.65rem 0' }}>Employee</th>
                <th style={{ padding: '0.65rem 0' }}>Department</th>
                <th style={{ padding: '0.65rem 0' }}>Salary (KSh)</th>
                <th style={{ padding: '0.65rem 0' }}>Status</th>
                <th style={{ padding: '0.65rem 0' }}>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payrollRecords.map((rec, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                  <td style={{ padding: '0.65rem 0', fontWeight: '600' }}>{rec.name}</td>
                  <td style={{ padding: '0.65rem 0', color: '#64748b' }}>{rec.department}</td>
                  <td style={{ padding: '0.65rem 0', fontWeight: 'bold' }}>{rec.salary}</td>
                  <td style={{ padding: '0.65rem 0' }}>
                    <span style={{
                      padding: '0.15rem 0.45rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      backgroundColor: rec.status === 'Paid' ? '#dcfce7' : '#fef3c7',
                      color: rec.status === 'Paid' ? '#16a34a' : '#d97706'
                    }}>
                      {rec.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 0', color: '#64748b' }}>{rec.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', marginTop: '1.25rem', float: 'right' }}>
          Generate Payroll Report
        </button>
      </div>

    </div>
  );
}