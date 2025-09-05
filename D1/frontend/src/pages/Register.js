import React, { useState } from "react";
import "../styles/auth.css";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            <button type="button">Create Account</button>
            <p>
                Already have an account?{" "}
                <a href="/login">Sign in</a>
            </p>
        </div>
    </div>
  );
}
