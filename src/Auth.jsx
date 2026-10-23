import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import Dashboard from './Dashboard';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState('');

  auth.onAuthStateChanged((u) => {
    setUser(u);
  });

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div className="animated-bg" style={{ minHeight: '100vh', color: '#f8fafc' }}>
        {/* Top Header - No Email, Just Sign Out */}
        <div 
          style={{ 
            display: 'flex', 
            justify: 'flex-end', 
            alignItems: 'center', 
            padding: '0.8rem 1.5rem', 
            backgroundColor: 'rgba(15, 23, 42, 0.95)', 
            borderBottom: '1px solid #1e293b'
          }}
        >
          <button 
            onClick={handleLogout}
            style={{ 
              backgroundColor: '#ef4444', 
              color: '#ffffff', 
              border: 'none', 
              padding: '0.45rem 1.1rem', 
              borderRadius: '0.375rem', 
              cursor: 'pointer', 
              fontWeight: '600', 
              fontSize: '0.85rem'
            }}
          >
            Sign Out
          </button>
        </div>

        {/* Main Dashboard */}
        <Dashboard />
      </div>
    );
  }

  // Auth Screen
  return (
    <div className="animated-bg" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '0.75rem', width: '100%', maxWidth: '400px', color: '#f8fafc', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.25rem', color: '#38bdf8' }}>WorkTrack Pro</h2>
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#22d3ee', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Hesbon Software Designer
        </p>

        {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleAuth} style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }} 
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }} 
            />
          </div>
          <button 
            type="submit" 
            style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}
          >
            {isRegistering ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '1.25rem', color: '#94a3b8' }}>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span 
            onClick={() => setIsRegistering(!isRegistering)} 
            style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isRegistering ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}
