import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div>
      <div>
        <ul>
          <li>
            <AiFillHome />
            <button>Home</button>
          </li>
          <li>
            <BiUserCircle />
            <button>Profile</button>
          </li>
          <li>
            <BiLogOut />
            <button>Signout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;