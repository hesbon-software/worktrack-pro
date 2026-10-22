import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase'; // Or './firebase' depending on your file structure
import Login from './pages/login';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Staff');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a', color: '#ffffff', fontFamily: 'sans-serif' }}>
        <p>Loading WorkTrack Pro...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#f8fafc', padding: '20px', fontFamily: 'sans-serif', boxSizing: 'border-box', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      
      {/* Top Header Card */}
      <header style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#f8fafc' }}>WorkTrack Pro</h1>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>User: {user.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ backgroundColor: '#059669', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.5px' }}>STAFF</span>
            <button
              onClick={() => signOut(auth)}
              style={{ backgroundColor: '#dc2626', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'background 0.2s' }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}>
        {['Staff', 'Attendance', 'Tasks', 'Departments', 'Reports'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? '#2563eb' : '#1e293b',
              color: '#ffffff',
              border: activeTab === tab ? '1px solid #60a5fa' : '1px solid #334155',
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: '0',
              boxShadow: activeTab === tab ? '0 0 12px rgba(37, 99, 235, 0.4)' : 'none'
            }}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Main Content Card */}
      <main style={{ width: '100%', boxSizing: 'border-box' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '18px', marginTop: 0, marginBottom: '16px', color: '#f8fafc' }}>{activeTab} Directory (1)</h2>
          
          <input
            type="text"
            placeholder="Search staff..."
            style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box', outline: 'none', marginBottom: '16px' }}
          />

          <div style={{ padding: '16px', backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '15px' }}>Hesbon</span>
            <span style={{ fontSize: '12px', color: '#38bdf8', backgroundColor: '#0369a133', padding: '4px 8px', borderRadius: '6px' }}>Active</span>
          </div>
        </div>
      </main>

      {/* Copyright & MIT License Footer */}
      <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', color: '#94a3b8', lineHeight: '1.6' }}>
        <p style={{ margin: '2px 0' }}>© {new Date().getFullYear()} Hesbon Software Designer. All rights reserved.</p>
        <p style={{ margin: '2px 0', color: '#64748b' }}>Licensed under the MIT License.</p>
      </footer>
    </div>
  );
}