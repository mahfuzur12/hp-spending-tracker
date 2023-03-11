import React from "react";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile/Profile";
import Sidebar from "../../components/Sidebar/Sidebar";
import Charts from "../../pages/Charts";
import Budget from "../../pages/Budget";
import Overview from "../../pages/Overview";
import './ProfileLayout.css'
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Streaks from "../../pages/Streaks";


const ProfileLayout = () => {
  //const [hasCard, setHasCard] = useState(false);

  return (


    <div class='profile-content'>
      <div>
        <Navbar />
      </div>

      <div>
        <Charts />
      </div>

      <div>
        <Budget />
      </div>

      <div>
        <Overview />
      </div>


    </div>
  );

}


export default ProfileLayout;