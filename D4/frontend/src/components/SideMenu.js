// Amadeus Fidos u22526162
import React from "react";
import "../styles/header.css";
import "../styles/sidemenu.css";

export default function SideMenu({ open, onClose }) {
  return (
    <>
      <div className={`side-menu ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose} aria-label="Close menu">
          &times;
        </button>
        <ul>
            {["Home", "Profile","Logout"].map((item) => (
                <li key={item}><a href={`/${item.toLowerCase()}`}>{item}</a></li>
            ))}
        </ul>
      </div>
    </>
  );
}
