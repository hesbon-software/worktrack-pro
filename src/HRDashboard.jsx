import React, { useState } from 'react';

export default function HRDashboard() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Kamau', nationalId: '12345678', role: 'Developer', status: 'Present', timeIn: '08:00 AM' },
    { id: 2, name: 'Grace Wambui', nationalId: '87654321', role: 'HR Manager', status: 'Present', timeIn: '08:15 AM' },
    { id: 3, name: 'David Ochieng', nationalId: '23456789', role: 'Accountant', status: 'Absent', timeIn: '-' },
  ]);

  const [newEmployee, setNewEmployee] = useState({ name: '', nationalId: '', role: '' });
  const [message, setMessage] = useState('');

  const handleAddEmployee = (e) => {
    e.preventDefault();

    // Validate 7-9 digit Kenyan National ID
    if (!/^\d{7,9}$/.test(newEmployee.nationalId)) {
      setMessage('❌ Please enter a valid 7 to 9-digit National ID.');
      return;
    }

    if (!newEmployee.name || !newEmployee.role) {
      setMessage('❌ Please fill in all fields.');
      return;
    }

    const created = {
      id: Date.now(),
      name: newEmployee.name,
      nationalId: newEmployee.nationalId,
      role: newEmployee.role,
      status: 'Absent',
      timeIn: '-',
    };

    setEmployees([...employees, created]);
    setNewEmployee({ name: '', nationalId: '', role: '' });
    setMessage('✅ New employee registered successfully!');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#ffffff' }}>
      <h2 style={{ color: '#2563eb', borderBottom: '2px solid #2563eb', paddingBottom: '8px' }}>
        WorkTrack Pro — HR Dashboard
      </h2>

      {message && (
        <div style={{ padding: '10px', marginBottom: '15px', background: '#f3f4f6', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
          {message}
        </div>
      )}

      {/* Add Employee Form */}
      <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '6px', marginBottom: '25px' }}>
        <h3 style={{ marginTop: 0 }}>Register New Staff</h3>
        <form onSubmit={handleAddEmployee} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Full Name</label>
            <input 
              type="text" 
              value={newEmployee.name} 
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} 
              placeholder="e.g. Mary Atieno" 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>National ID (7-9 Digits)</label>
            <input 
              type="text" 
              value={newEmployee.nationalId} 
              onChange={(e) => setNewEmployee({ ...newEmployee, nationalId: e.target.value })} 
              placeholder="e.g. 34567890" 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Role</label>
            <input 
              type="text" 
              value={newEmployee.role} 
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} 
              placeholder="e.g. Designer" 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ padding: '8px 16px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '35px' }}>
            Add Staff
          </button>
        </form>
      </div>

      {/* Staff Attendance Directory */}
      <h3>Employee Attendance Records</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>National ID</th>
            <th style={{ padding: '10px' }}>Role</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Time In</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '10px' }}>{emp.name}</td>
              <td style={{ padding: '10px' }}>{emp.nationalId}</td>
              <td style={{ padding: '10px' }}>{emp.role}</td>
              <td style={{ padding: '10px', color: emp.status === 'Present' ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
                {emp.status}
              </td>
              <td style={{ padding: '10px' }}>{emp.timeIn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}