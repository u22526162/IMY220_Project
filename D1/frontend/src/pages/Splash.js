import React from "react";
import "../styles/Splash.css";

export default function SplashPage() {
  return (
    <div className="splash-page">
      <div className="splash-header">
        <h1>Graphyt</h1>
        <p>Track and visualize your code history. Every change counts.</p>
        <div className="splash-buttons">
          <a className="btn-primary" href="/register">Get Started</a>
          <a className="btn-secondary" href="/login">Sign In</a>
        </div>
      </div>
    </div>
  );
}
