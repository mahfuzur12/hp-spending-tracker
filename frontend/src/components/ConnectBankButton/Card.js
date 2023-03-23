import React, { useEffect, useState, useContext } from "react";
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import ConnectBankButton from "./ConnectBankButton";
import "./Card.css";


axios.default.baseUrl = "http://localhost:8000"

function Card() {
  const [bank, setBankCard] = useState("");
  const { user } = useContext(AuthContext);

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    async function Fetch() {
      let currUser = await axios.get("http://localhost:8000/" + user._id);
      setAccessToken(currUser.data.data.accessToken);
      let auth = await axios.post("http://localhost:8000/auth", { access_token: currUser.data.data.accessToken });
      console.log("auth", auth.data);
      let institution = await axios.post("http://localhost:8000/institution", { institution_id: auth.data.item.institution_id });
      console.log("institution", institution.data);
      setBankCard(institution.data.institution.name);
    }
    Fetch();
  }, [user._id]);

  return !accessToken ?
    (

      <div className="card-container">
        <div className="card-box">
          <p className='card-connect-buttton'>Connect</p>
          <ConnectBankButton />

        </div>
      </div>

    ) : (

      <div className="card-container">
        <div className="card-box">
          <h2 className="card-bank">{bank}</h2>
          <ConnectBankButton />
        </div>
      </div >

    );

}

export default Card;