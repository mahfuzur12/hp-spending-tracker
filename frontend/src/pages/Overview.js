import React, { useEffect, useState, useContext} from "react";
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import Card from "../components/ConnectBankButton/Card";
import { usePlaidLink } from 'react-plaid-link';
import "./Overview.css"

axios.default.baseUrl = "http://localhost:8000"

function Overview() {
  const [hasCard, setHasCard] = useState(false);

  function CheckToken () {
    const { user } = useContext(AuthContext);

      useEffect(() => {
        async function HasCard () {
          let currUser = await axios.get("http://localhost:8000/" + user._id);
          if (currUser.data.data.accessToken !== "") {
            setHasCard(true);
          } else {
            setHasCard(false);
          }
        }
        HasCard();
      }, [user._id]);
    return hasCard;
  }

  return !CheckToken() ? (
  <div>
    <Card />
  </div>
  ) : (
  <div>
    <h1>Overview</h1>
    <Card />
  </div>
  );

}

export default Overview;