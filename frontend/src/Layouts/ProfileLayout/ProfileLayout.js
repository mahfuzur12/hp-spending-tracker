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
  function F () {
  useEffect(() => {
  async function HasCard () {
    const { token } = useContext(AuthContext);
    const res = await axios.get("/user", {
      headers: { Authorization: token },
    })
      .then((res) => {
        if (res.data.accessToken) {
          console.log("has card")
          return true;
        }
      })
      .catch((err) => {
        console.log("no card")
        return false;
      });
    }
    HasCard();
  }, []);
  }

  
  
  
    return (
      <div>



        <div>
        <Sidebar />
        </div>

        <div>
        element = {F() ? <Overview /> : <ConnectBank />}
        </div>

      
        
      </div>
    );
  };
  
  export default ProfileLayout;