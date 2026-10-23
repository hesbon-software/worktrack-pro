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
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Colorful Virtual Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: -1,
            filter: 'brightness(0.35) saturate(1.4)'
          }}
        >
          {/* Stunning colorful abstract technology loop video */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-code-and-graphs-31910-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Top Navbar Header (Email Removed) */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center', 
            padding: '0.8rem 1.5rem', 
            backgroundColor: 'rgba(15, 23, 42, 0.85)', 
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(30, 41, 59, 0.8)'
          }}
        >
          <button 
            onClick={handleLogout}
            style={{ 
              backgroundColor: '#ef4444', 
              color: '#ffffff', 
              border: 'none', 
              padding: '0.4rem 1rem', 
              borderRadius: '0.375rem', 
              cursor: 'pointer', 
              fontWeight: '600', 
              fontSize: '0.8rem'
            }}
          >
            Sign Out
          </button>
        </div>

        {/* Dashboard View */}
        <Dashboard />
      </div>
    );
  }

  // Login / Signup Screen with Background Video
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
          filter: 'brightness(0.35) saturate(1.4)'
        }}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-code-and-graphs-31910-large.mp4" type="video/mp4" />
      </video>

      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(51, 65, 85, 0.8)', padding: '2rem', borderRadius: '0.75rem', width: '100%', maxWidth: '400px', color: '#f8fafc', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#38bdf8' }}>WorkTrack Pro</h2>
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
              style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', backgroundColor: 'rgba(30, 41, 59, 0.8)', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }} 
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', backgroundColor: 'rgba(30, 41, 59, 0.8)', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }} 
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
