import React from "react";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile/Profile";
import Sidebar from "../../components/Sidebar/Sidebar";
import Overview from "../../pages/Overview";

const ProfileLayout = () => {
    return (
      <div>

        <div>
        <Navbar />
        </div>

        <div>
        <Sidebar />
        </div>

        <div>
        <Overview />
        </div>

        <div>
          <Profile />
        </div>
        
      </div>
    );
  };
  
  export default ProfileLayout;