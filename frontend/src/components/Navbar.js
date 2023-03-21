import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Navbar.css"


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


    <nav className="navbar-overview" >

      <a href="/" className="nav-logo-overview">Pocilot Tracker</a>
      <ul>
        <li><a href="/">Overview</a></li>
        <li><a href="/charts">Charts</a></li>
        <li><a href="/budget">Budget</a></li>
        <li><a href="/transactions">Transactions</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><h2>Welcome {user.name}!</h2></li>
        <li><button className='navbar-btn' onClick={handleClick} >Log out</button>
        </li>
      </ul>
    </nav>

  );
}