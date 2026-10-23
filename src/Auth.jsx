import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import Dashboard from './Dashboard';

export default function Auth() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSigningUp) {
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
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem', backgroundColor: '#020617', borderBottom: '1px solid #1e293b' }}>
          <button 
            onClick={handleLogout}
            style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
          >
            Sign Out ({user.email})
          </button>
        </div>
        <Dashboard />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#020617', color: '#fff', fontFamily: 'sans-serif', padding: '1rem' }}>
      <form onSubmit={handleAuth} style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #1e293b', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>WorkTrack Pro</h2>
        <p style={{ color: '#22d3ee', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Powered by Hesbon Software Designer</p>

        {error && <div style={{ color: '#f87171', backgroundColor: '#450a0a', padding: '0.5rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Email</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Password</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '1rem' }}>
          {isSigningUp ? 'Sign Up' : 'Log In'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', margin: 0, cursor: 'pointer' }} onClick={() => setIsSigningUp(!isSigningUp)}>
          {isSigningUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
}
