// Amadeus Fidos u22526162
import React from "react";
import "../styles/splash.css";
import { Link } from "react-router-dom";

export default function SplashPage() {
  return (
    <div className="splash-page">
      <div className="splash-header">
        <h1 style={{fontSize: "150px"}}>Graphyt</h1>
        <p style={{fontSize: "30px"}}>Track and visualize your code history. Every change counts.</p>
        <div className="splash-buttons">
          <Link className="btn-primary" to="/register">Get Started</Link>
          <Link className="btn-secondary" to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
