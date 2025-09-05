import React from "react";
import "../styles/splash.css";

export default function Splash() {
  return (
    <div className="splash-page">
      <div className="splash-hero">
        <h1>Graphyt</h1>
        <p>Track and visualize your code history. Every change counts.</p>
        <div className="splash-buttons">
          <a className="btn-primary" href="/signup">Get Started</a>
          <a className="btn-secondary" href="/login">Sign In</a>
        </div>
      </div>
    </div>
  );
}
