import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { renderMatches } from "react-router-dom";


const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);

  

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

  return (
    <div>
      <div>
        <ul>
          <li>
            <AiFillHome />
            <button>Overview</button>
          </li>
          <li>
            <button>Transactions</button>
          </li>
          <li>
            <BiUserCircle />
            <button>Profile</button>
          </li>
          <li>
            <BiLogOut />
            <button onClick={handleClick}>Signout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}



export default Sidebar;