import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const initialState = {
    name: "",
};

export default function Navbar() {
    const { user } = useContext(AuthContext)
    const [data, setData] = useState(initialState);

    const path = window.location.pathname
    return (
        <nav className="nav ">
            <a href="/" className="site-title"> Pociclot Tracker</a>
            <ul>
                <li>
                    <h1>Welcome {user.name}!</h1>
                </li>
                <li>
                    <a href="/" className="logout">Log out</a>
                </li>
            </ul>
        </nav>
    );
}
