import React, {useContext, useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";

axios.default.baseUrl = "http://localhost:8000"
export default function Budget(){

    const { user } = useContext(AuthContext);
    useEffect(() => {
        async function fetch() {
            var budget = 0;
            document.getElementById("budget-btn").onclick = function() {
                budget = parseInt(document.getElementById("budget").innerText);
            }
            await axios.patch("/" + user._id, { budget: budget });
            let curUser = await axios.get("/" + user._id);
            console.log(curUser.data.data.budget);
        } 
        fetch();
    },  [])

    const navigate = useNavigate();
    function incBudget(){
        const budget = document.getElementById("budget");
        const newBudget = parseInt(budget.innerText) + 10
        budget.innerText = newBudget;
    }

    function decBudget(){
        const budget = document.getElementById("budget");
        const newBudget = parseInt(budget.innerText) -10;
        budget.innerText = newBudget;

        if(newBudget < 100){
            budget.innerText = 100
        }
    }
  
    return(
        
            <div className = 'content'>
                <div>
                <Navbar />
                </div>
                <div className="budgetSetter">
                    <h1>Set up your monthly budget </h1>
                    <button onClick={decBudget} className="budgetButton"> - </button>
                    <span>£</span><span id ="budget">500</span>
                    <button onClick={incBudget} className="budgetButton"> + </button>
                    <div>
                        <button id="budget-btn" onClick={() => {navigate("/budget-summary")}} className="budgetButton"> Done </button>
                    </div>
                </div>

            </div>
            
    )
}
