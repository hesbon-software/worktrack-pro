import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, userRole = 'employee', onLogout }) {
  const employeeNav = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'attendance', label: 'Attendance', icon: '⏱️' },
    { id: 'absence', label: 'Report Absence', icon: '📅' },
    { id: 'tasks', label: 'My Tasks', icon: '📝' },
    { id: 'reports', label: 'Daily Reports', icon: '📑' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', badge: 2 },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const managerNav = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'employees', label: 'Employees', icon: '👥' },
    { id: 'attendance_records', label: 'Attendance Records', icon: '📋' },
    { id: 'absence_requests', label: 'Absence Requests', icon: '📩' },
    { id: 'task_reports', label: 'Task Reports', icon: '📝' },
    { id: 'approvals', label: 'Approvals', icon: '✅' },
    { id: 'payroll', label: 'Payroll Management', icon: '💳' },
    { id: 'analytics', label: 'Reports & Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const navItems = userRole === 'manager' || userRole === 'employer' ? managerNav : employeeNav;

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#0b1329',
      color: '#94a3b8',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      padding: '1.25rem 1rem',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <div>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
          <div style={{ backgroundColor: '#2563eb', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>❖</span>
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff' }}>WorkTrack Pro</span>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: isActive ? '#1d2a4a' : 'transparent',
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  fontWeight: isActive ? '600' : 'normal',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '999px'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.65rem 0.85rem',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#f87171',
          fontSize: '0.85rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        <span>🚪</span> Logout
      </button>
    </aside>
  );
}
