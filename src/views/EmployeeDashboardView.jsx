import React from 'react';

export default function EmployeeDashboardView({ onNavigate }) {
  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)', boxSizing: 'border-box' }}>
      
      {/* Top Banner & Info Card */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', color: '#0f172a', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>Welcome back, Hesbon Ndemo!</h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Work hard, stay focused, achieve more.</p>
          
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block' }}>Employee ID</span>
              <strong style={{ fontSize: '0.85rem', color: '#1e293b' }}>EMP001</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block' }}>Department</span>
              <strong style={{ fontSize: '0.85rem', color: '#1e293b' }}>IT / Software Development</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block' }}>Position</span>
              <strong style={{ fontSize: '0.85rem', color: '#1e293b' }}>Software Engineer</strong>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#f1f5f9', padding: '1rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>📅 Thu, 23 Oct 2026</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>10:24 AM</div>
        </div>
      </div>

      {/* 3 Status Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        
        {/* Attendance Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.5rem', borderRadius: '50%', fontSize: '1rem' }}>✓</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a' }}>Attendance Today</h4>
              <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 'bold' }}>Present</span>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>Clocked in at 08:12 AM</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>Clock Out</button>
            <button onClick={() => onNavigate('attendance')} style={{ backgroundColor: 'transparent', color: '#2563eb', border: '1px solid #bfdbfe', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>View Details</button>
          </div>
        </div>

        {/* Report Absence Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: '#f3e8ff', color: '#9333ea', padding: '0.5rem', borderRadius: '50%', fontSize: '1rem' }}>👤</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a' }}>Report Absence</h4>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Need to be away?</span>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>Report your absence here.</p>
          <button onClick={() => onNavigate('absence')} style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
            Report Absence
          </button>
        </div>

        {/* Today's Tasks Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: '#dbeafe', color: '#2563eb', padding: '0.5rem', borderRadius: '50%', fontSize: '1rem' }}>📑</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a' }}>Today's Tasks</h4>
              <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 'bold' }}>0 tasks submitted</span>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>Submit your daily tasks and keep your manager updated.</p>
          <button onClick={() => onNavigate('tasks')} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
            View Tasks
          </button>
        </div>

      </div>

      {/* Quick Actions Title */}
      <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '1rem' }}>Quick Actions</h3>

      {/* Quick Action Buttons Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'My Profile', desc: 'View and edit your profile', icon: '👤', tab: 'profile' },
          { label: 'My Tasks', desc: 'Add / view your tasks', icon: '📑', tab: 'tasks' },
          { label: 'Daily Reports', desc: 'View past reports', icon: '📝', tab: 'reports' },
          { label: 'Settings', desc: 'Manage your account', icon: '⚙️', tab: 'settings' }
        ].map((act, i) => (
          <div 
            key={i} 
            onClick={() => onNavigate(act.tab)}
            style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'box-shadow 0.2s' }}
          >
            <div style={{ backgroundColor: '#eff6ff', padding: '0.6rem', borderRadius: '0.5rem', fontSize: '1.1rem' }}>{act.icon}</div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#0f172a' }}>{act.label}</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{act.desc}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
