//import logo from './logo.svg';
import React, { useContext, useEffect, useState } from "react";
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import { AuthContext } from "../context/AuthContext";
import Overview from "./Overview";
import ConnectBankButton from "../components/ConnectBankButton/ConnectBankButton";
//import './App.css';



function ConnectBank() {
    return ConnectBankButton();
}

export default ConnectBank;