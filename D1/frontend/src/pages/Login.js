import React, { useState } from "react";
import "../styles/auth.css"
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signin">
      <h2>Sign in</h2>
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
      <button type="button">Login</button>
      <p>
        Don’t have an account?{" "}
        <a href="/register">Sign up</a>
      </p>
    </div>
  );
}
