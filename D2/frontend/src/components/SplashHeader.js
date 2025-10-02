// Amadeus Fidos u22526162

import React from "react";
import "../styles/header.css";

export default function SplashHeader() {
  return (
        <div className="header-main" style={{ padding: '10px' }}>
            <div className="logo-holder">
                <img src="/favicon.ico" alt="Logo" height={80} />
                <h1>Graphyt</h1>
            </div>
        </div>
  );
}