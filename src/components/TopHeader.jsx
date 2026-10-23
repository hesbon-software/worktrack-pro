import React from 'react';

export default function TopHeader({ userName = 'Hesbon Ndemo', userRole = 'Employee', showSearch = false }) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      padding: '1rem 1.5rem',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0'
    }}>
      {/* Optional Search Input */}
      {showSearch ? (
        <div style={{ position: 'relative', width: '280px' }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: '100%',
              padding: '0.55rem 1rem 0.55rem 2.2rem',
              borderRadius: '0.5rem',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem',
              outline: 'none',
              backgroundColor: '#f8fafc'
            }}
          />
          <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.85rem' }}>
            🔍
          </span>
        </div>
      ) : <div />}

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Date Display Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
          <span>📅</span> Thu, 23 Oct 2026
        </div>

        {/* Notification Bell */}
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <span style={{ fontSize: '1.1rem' }}>🔔</span>
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            backgroundColor: '#ef4444',
            color: '#fff',
            fontSize: '0.65rem',
            fontWeight: 'bold',
            borderRadius: '50%',
            width: '15px',
            height: '15px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center'
          }}>5</span>
        </div>

        {/* User Profile Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid #e2e8f0', paddingLeft: '1rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            {userName.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#0f172a' }}>{userName}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'capitalize' }}>{userRole}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
