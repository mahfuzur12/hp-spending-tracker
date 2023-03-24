import React, { useEffect, useState } from "react";
import "./Streaks.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import "./Budget.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useContext } from "react";

function StreaksNavbar({streak}) {


    const fireIcons = Array(streak).fill(null);


    return (
        <div className="blank-screen">
          {fireIcons.map((_, index) => (
            <FontAwesomeIcon key={index} icon={faFire} size="lg" style={{ color: "#96d35f" }}/>
          ))}
        </div>
      );
    }
export default StreaksNavbar;