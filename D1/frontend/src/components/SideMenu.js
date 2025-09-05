import React from "react";
import "../styles/header.css";

export default function SideMenu({ items, open, onClose }) {
  return (
    <>
      <div className={`side-menu ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose} aria-label="Close menu">
          &times;
        </button>
        <ul>
          {items.map((item, idx) => (
            <li key={idx} onClick={onClose}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
      {open && <div className="side-menu-overlay" onClick={onClose} />}
    </>
  );
}
