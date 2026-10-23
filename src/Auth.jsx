import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { auth } from './firebase';

export default function Auth() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  // Listen for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle Login / Registration
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

  // IF USER IS LOGGED IN: Show your multi-role Dashboard (Employee, Manager, Employer)
  if (user) {
    return (
      <div>
        <button 
          onClick={handleLogout}
          style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000, background: '#ef4444', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Sign Out ({user.email})
        </button>
        <Dashboard />
      </div>
    );
  }

  // IF NOT LOGGED IN: Show Login / Register Form
  return (
    <div style={{ backgroundColor: '#0b1120', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#131c31', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #1e293b', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>WorkTrack Pro</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem' }}>POWERED BY HESBON SOFTWARE DESIGNER</p>

        {error && <p style={{ backgroundColor: '#7f1d1d', color: '#fca5a5', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}
          >
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <button 
          onClick={() => setIsRegistering(!isRegistering)} 
          style={{ background: 'none', border: 'none', color: '#38bdf8', width: '100%', textAlign: 'center', marginTop: '1.25rem', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
