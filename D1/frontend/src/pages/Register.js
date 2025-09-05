import React, { useState } from "react";
import "../styles/auth.css";
import { useNavigate } from "react-router";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleRegister() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    navigate("/dashboard");
  }
  return (
    <div className="signup">
      <h1>Sign up</h1>
      <div className="login-form">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleRegister}>Create Account</button>
            <p>
                Already have an account?{" "}
                <a href="/login">Sign in</a>
            </p>
        </div>
    </div>
  );
}
