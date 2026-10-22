import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(
        auth,
        email
      );

      alert(
        "Password reset link sent successfully."
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-xl mt-5"
        />

        <button
          onClick={resetPassword}
          className="w-full bg-orange-500 text-white p-3 rounded-xl mt-4"
        >
          Send Reset Link
        </button>

      </div>

    </div>
  );
}
