import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-email'
      ) {
        setError('Invalid email or password.');
      } else {
        setError('Login failed: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b0f19', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif', boxSizing: 'border-box', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>WorkTrack Pro</h1>
          <svg width="22" height="22" style={{ color: '#38bdf8' }} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span style={{ backgroundColor: '#0369a133', color: '#38bdf8', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px', border: '1px solid #0284c744' }}>
          POWERED BY HESBON SOFTWARE DESIGNER
        </span>
      </div>

      {/* Login Card */}
      <div style={{ width: '100%', maxWidth: '380px', backgroundColor: '#1e293b', padding: '28px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', border: '1px solid #334155', boxSizing: 'border-box' }}>
        
        {error && (
          <div style={{ backgroundColor: '#7f1d1d', color: '#fca5a5', border: '1px solid #991b1b', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '18px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', backgroundColor: loading ? '#3b82f6aa' : '#2563eb', color: '#ffffff', fontWeight: '600', padding: '12px', borderRadius: '10px', border: 'none', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '6px', boxShadow: '0 0 12px rgba(37, 99, 235, 0.3)' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '13px' }}>
          <a href="#forgot" style={{ color: '#94a3b8', textDecoration: 'none' }}>Forgot Password?</a>
          <a href="#signup" style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'none' }}>Sign Up</a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: '36px', textAlign: 'center', fontSize: '12px', color: '#94a3b8', lineHeight: '1.6' }}>
        <p style={{ margin: '2px 0' }}>© {new Date().getFullYear()} Hesbon Software Designer. All rights reserved.</p>
        <p style={{ margin: '2px 0', color: '#64748b' }}>Licensed under the MIT License.</p>
      </footer>

    </div>
  );
}
