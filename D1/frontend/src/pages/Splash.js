import React from "react";
import "../styles/Splash.css";
import { Link } from "react-router";

export default function SplashPage() {
  return (
    <div className="splash-page">
      <div className="splash-header">
        <h1>Graphyt</h1>
        <p>Track and visualize your code history. Every change counts.</p>
        <div className="splash-buttons">
          <Link className="btn-primary" to="/register">Get Started</Link>
          <Link className="btn-secondary" to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
