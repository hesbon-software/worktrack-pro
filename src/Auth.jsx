import React, { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut 
} from 'firebase/auth';
import { auth } from './firebase';

export default function Auth() {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Listen for user login/logout state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Login successful!');
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setMessage('This email is already registered. Try logging in.');
      } else if (error.code === 'auth/too-many-requests') {
        setMessage('Too many failed attempts. Please wait a few minutes.');
      } else if (error.code === 'auth/weak-password') {
        setMessage('Password should be at least 6 characters.');
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setMessage('Invalid email or password.');
      } else {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  // If user is logged in, show Dashboard/Home UI
  if (user) {
    return (
      <div style={styles.fullScreenContainer}>
        <div style={styles.card}>
          <h1 style={styles.title}>WorkTrack Pro</h1>
          <p style={styles.subtitle}>POWERED BY HESBON SOFTWARE DESIGNER</p>
          <hr style={{ border: '1px solid #1f293d', margin: '20px 0' }} />
          
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <p style={{ color: '#00e676', fontWeight: 'bold', fontSize: '18px' }}>
              Welcome back!
            </p>
            <p style={{ color: '#cbd5e1' }}>Logged in as: <strong>{user.email}</strong></p>
          </div>

          <button onClick={handleLogout} style={styles.buttonDanger}>
            Log Out
          </button>

          <footer style={styles.footer}>
            © 2026 Hesbon Software Designer. All rights reserved.<br/>
            Licensed under the MIT License.
          </footer>
        </div>
      </div>
    );
  }

  // Login / Sign Up Form UI
  return (
    <div style={styles.fullScreenContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>WorkTrack Pro</h1>
        <p style={styles.subtitle}>POWERED BY HESBON SOFTWARE DESIGNER</p>

        {message && (
          <div style={{
            ...styles.alertBox,
            backgroundColor: message.includes('successful') || message.includes('created') 
              ? 'rgba(16, 185, 129, 0.2)' 
              : 'rgba(239, 68, 68, 0.2)',
            borderColor: message.includes('successful') || message.includes('created') 
              ? '#10b981' 
              : '#ef4444',
            color: message.includes('successful') || message.includes('created') 
              ? '#34d399' 
              : '#f87171',
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>EMAIL</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>PASSWORD</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.buttonPrimary}>
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <span 
            onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }}
            style={styles.toggleLink}
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </span>
        </div>

        <footer style={styles.footer}>
          © 2026 Hesbon Software Designer. All rights reserved.<br/>
          Licensed under the MIT License.
        </footer>
      </div>
    </div>
  );
}

// Styling Object for Full-Screen, Modern Dark Theme
const styles = {
  fullScreenContainer: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#0f172a',
    backgroundImage: 'radial-gradient(circle at 50% 20%, #1e293b 0%, #0f172a 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#1e293b',
    borderRadius: '16px',
    padding: '32px 24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
    border: '1px solid #334155',
    boxSizing: 'border-box',
  },
  title: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '700',
    textAlign: 'center',
    margin: '0 0 4px 0',
    letterSpacing: '0.5px',
  },
  subtitle: {
    color: '#38bdf8',
    fontSize: '11px',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: '1px',
    margin: '0 0 24px 0',
  },
  inputGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    color: '#94a3b8',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '6px',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  buttonPrimary: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)',
  },
  buttonDanger: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
  },
  alertBox: {
    padding: '12px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '15px',
  },
  toggleLink: {
    color: '#38bdf8',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  footer: {
    color: '#64748b',
    fontSize: '11px',
    textAlign: 'center',
    marginTop: '30px',
    lineHeight: '1.5',
  }
};
