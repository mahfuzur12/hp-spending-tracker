import React from "react";

export default function Navbar() {
    const path = window.location.pathname
    return (
        <nav className="nav ">
            <a href="/" className="site-title"> Pociclot Tracker</a>
            <ul>
                <li>
                    <h1>Welcome (user)!</h1>
                </li>
                <li>
                    <a href="/" className="logout">Log out</a>
                </li>
            </ul>
        </nav>
    );
}

