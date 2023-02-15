import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Overview from "../../pages/Overview";

const ProfileLayout = () => {
    return (
      <div>
        <Navbar />

        <Sidebar />

        <Overview />
      </div>
    );
  };
  
  export default ProfileLayout;