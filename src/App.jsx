import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './Auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for login/logout changes automatically
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ background: '#0f172a', minHeight: '100vh', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Loading WorkTrack Pro...
      </div>
    );
  }

  // If user is NOT logged in, show the full-screen colorful Login/Signup view
  if (!user) {
    return <Auth />;
  }

  // If user IS logged in, show your main Dashboard workspace
  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#fff', padding: '24px', boxSizing: 'border-box' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#ffffff' }}>WorkTrack Pro Dashboard</h2>
          <span style={{ fontSize: '12px', color: '#38bdf8' }}>POWERED BY HESBON SOFTWARE DESIGNER</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>{user.email}</span>
          <button 
            onClick={() => auth.signOut()} 
            style={{ padding: '8px 16px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
          >
            Log Out
          </button>
        </div>
      </header>

      <main>
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#34d399' }}>Workspace Active</h3>
          <p style={{ color: '#cbd5e1' }}>You are securely authenticated. You can now build or add your tracking features, task tables, and project management tools right here!</p>
        </div>
      </main>

      <footer style={{ textAlign: 'center', color: '#64748b', fontSize: '12px', marginTop: '50px' }}>
        © 2026 Hesbon Software Designer. All rights reserved. Licensed under the MIT License.
      </footer>
    </div>
  );
}

export default App;
