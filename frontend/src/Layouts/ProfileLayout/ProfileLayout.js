import React from "react";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile/Profile";
import Sidebar from "../../components/Sidebar/Sidebar";
import Charts from "../../pages/Charts";
import Saver from "../../pages/Saver";
import Overview from "../../pages/Overview";
import './ProfileLayout.css'
const ProfileLayout = () => {
    return (
      <div class = 'content'>

        <div>
        <Navbar />
        </div>

        <div>
        <Charts />
        </div>

        <div>
        <Saver />
        </div>
      
        <div class = "content">
        <Overview />
        </div>

        
      </div>
    );
  };
  
  export default ProfileLayout;