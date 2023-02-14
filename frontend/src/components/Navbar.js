import React from "react";

export default function Navbar() {
    const path = window.location.pathname
    return (
        <nav className="nav ">
            <a href="/" className="site-title"> Pociclot Tracker</a>
            <div className="div1">
            <ul className="firstlist">
                <li>
                    <a href="/">Charts</a>
                </li>
                
                </ul>
                
                <ul className="seclist">
                <li>
                    <h1>Welcome (user)!</h1>
                </li>
                <li>
                    <a href="/" className="logout">Log out</a>
                </li>
            </ul>
            </div>
        </nav>
    );
}

