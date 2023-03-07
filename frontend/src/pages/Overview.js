//import logo from './logo.svg';
import React, { useEffect, useState, useContext} from "react";
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import ConnectBank from "./ConnectBank";
//import './App.css';

axios.default.baseUrl = "http://localhost:8000"

function Overview() {
  const [hasCard, setHasCard] = useState(false);
  //let hasCard = false;

  function F () {
    // return if user has non empty accessToken string
    const { user } = useContext(AuthContext);
    //const hasCard = false;

      useEffect(() => {
        async function HasCard () {
          //console.log("checking if user has card")
          //console.log(user._id);
          let currUser = await axios.get("http://localhost:8000/" + user._id);
          //console.log(currUser);
          if (currUser.data.data.accessToken !== "") {
            //console.log("user has card");
            setHasCard(true);
          } else {
            //console.log("user does not have card")
            setHasCard(false);
          }
        }
        HasCard();
      }, [user._id]);
    //console.log(hasCard);
    return hasCard;
  }

  return !F() ? (<ConnectBank />) : (
    <div>
      <h1>Overview</h1>
    </div>
  );

}

export default Overview;