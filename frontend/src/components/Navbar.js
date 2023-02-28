import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../index.css"

const initialState = {
    name: "",
};

export default function Navbar() {
    const { user, dispatch } = useContext(AuthContext)
    const [data, setData] = useState(initialState);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
          await axios.get("/signout");
          localStorage.removeItem("_appSigning");
          dispatch({ type: "SIGNOUT" });
        } catch (err) {
          console.log(err);
        }
      };

    const path = window.location.pathname
    return (

    
        <nav className="navbar ">
            <a href="/" className="site-title"> Pociclot Tracker</a>
            <ul>
                <li>
                    <h1>Welcome {user.name}!</h1>
                </li>
                <li>
                    <button class = 'btns' onClick={handleClick}>Log out</button>
                </li>
            </ul>
        </nav>
    );
}