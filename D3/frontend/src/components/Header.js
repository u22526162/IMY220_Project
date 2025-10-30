// Amadeus Fidos u22526162
import "../styles/header.css";
import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api";
import "../styles/header.css";

export default function Header()   {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await authAPI.logout();
        } catch {}
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <header className="header-main">
            <div style={{ display: 'flex', padding: '10px' }}>
                <div className="logo-holder">
                    {/* <img src="../../public/assets/images/Logo4.png" alt="Logo" width={50} height={100} /> */}
                    <img src="/favicon.ico" alt="Logo" height={80} />
                    <h1>Graphyt</h1>
                </div>
                <span style={{ flexGrow: 1 }}></span>
                <button className="hamburger-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                &#9776;
                </button>
            </div>
            {menuOpen && <SideMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onLogout={handleLogout}
        />}
        </header>
    );
}