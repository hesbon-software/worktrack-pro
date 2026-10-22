import { useState } from "react";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase";

export default function Register() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const user =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await setDoc(
        doc(db, "users", user.user.uid),
        {
          name,
          email,
          role,
        }
      );

      alert("Account Created");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-cyan-200 to-purple-200">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <div className="space-y-4 mt-5">

          <input
            placeholder="Full Name"
            className="w-full border p-3 rounded-xl"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <select
            className="w-full border p-3 rounded-xl"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="employee">
              Employee
            </option>

            <option value="manager">
              Manager
            </option>

            <option value="owner">
              Owner
            </option>
          </select>

          <button
            onClick={register}
            className="w-full bg-green-600 text-white p-3 rounded-xl"
          >
            Register
          </button>

        </div>

      </div>

    </div>
  );
}