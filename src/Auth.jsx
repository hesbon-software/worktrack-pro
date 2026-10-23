import { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from './firebase.js'; // Your Firebase auth instance

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Sign-Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent double-submitting

    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        // Create new account for anyone
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Account created successfully! Logging you in...');
      } else {
        // Log in existing user
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Login successful!');
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setMessage('This email is already registered. Try logging in instead.');
      } else if (error.code === 'auth/too-many-requests') {
        setMessage('Too many failed attempts. Please wait 15 minutes or switch networks.');
      } else if (error.code === 'auth/weak-password') {
        setMessage('Password should be at least 6 characters.');
      } else {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>

      {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input 
          type="password" 
          placeholder="Enter Password (min 6 chars)" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px' }}>
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center', cursor: 'pointer', color: 'blue' }} 
         onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }}>
        {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}
