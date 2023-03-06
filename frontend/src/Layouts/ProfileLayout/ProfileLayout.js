import React from "react";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile/Profile";
import Sidebar from "../../components/Sidebar/Sidebar";
import Overview from "../../pages/Overview";
import ConnectBank from "../../pages/ConnectBank";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";




const ProfileLayout = () => {
  //const [hasCard, setHasCard] = useState(false);

      

  
  
  
    return (
      <div>



        <div>
        <Sidebar />
        </div>

        <div>
        <Overview />
        </div>

      
        
      </div>
    );

}
  
  
  export default ProfileLayout;