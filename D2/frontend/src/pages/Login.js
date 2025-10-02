import React, { useState } from "react";
import "../styles/auth.css"
import { useNavigate } from "react-router";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/dashboard");
  }
  return (
    <div className="signin">
      <h1>Login </h1>
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
            minLength={7}
        />
        <button type="button" onClick={handleLogin}>Login</button>
        <p>
            Don’t have an account?{" "}
            <a href="/register">Sign up</a>
        </p>
        </div>
    </div>
  );
}
