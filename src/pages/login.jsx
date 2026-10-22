import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    setMessage("Login successful!");
  } catch (error) {
    setMessage("Login failed: " + error.message);
  }
};



  return (
    <div className="login-container">
      <h1>WorkTrack Pro</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;

