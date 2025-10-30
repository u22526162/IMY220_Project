// Amadeus Fidos u22526162
import React from "react";
import "../styles/header.css";
import "../styles/sidemenu.css";

export default function SideMenu({ open, onClose, onLogout }) {
  return (
    <>
      <div className={`side-menu ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose} aria-label="Close menu">
          &times;
        </button>
        <ul>
            <li><a href="/dashboard">Home</a></li>
            <li><a href="/profile/edit">Profile</a></li>
            <li><button onClick={onLogout} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}>Logout</button></li>
        </ul>
      </div>
    </>
  );
}
