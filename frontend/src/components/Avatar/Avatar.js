import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Avatar = () => {
  const {user} = useContext(AuthContext)

    return (
      <div className="avatar">
        <img
          src="https://a.wattpad.com/useravatar/N0tKay1.256.585229.jpg"
          alt="avatar"
        />
      </div>
    );
  };
  
  export default Avatar;