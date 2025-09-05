import "../styles/header.css";
import React, { useState } from "react";
import SideMenu from "./SideMenu";
export default function Header()   {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div style={{ display: 'flex', padding: '10px' }}>
                <div className="logo-holder">
                    <img src="../../public/assets/images/Logo4.png" alt="Logo" width={50} height={100} />
                    <h1>Graphyt</h1>
                </div>
                <div className="menu-holder">
                    <button className="hamburger-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                    &#9776;
                    </button>
                </div>
            </div>
            <SideMenu
            items={menuItems}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
        />
        </header>
    );
}