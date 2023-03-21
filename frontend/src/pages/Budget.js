import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Budget.css";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import { useContext } from "react";
import { useState } from "react";

export default function Spending() {
    const [budget, setBudget] = useState(500);
    const { user } = useContext(AuthContext);

    function incBudget() {
        const budget = document.getElementById("budget-num-id");
        const newBudget = parseInt(budget.innerText) + 10
        budget.innerText = newBudget;
        setBudget(newBudget);
    }

    function decBudget() {
        const budget = document.getElementById("budget-num-id");
        const newBudget = parseInt(budget.innerText) - 10;
        budget.innerText = newBudget;
        setBudget(budget.innerText);

        if (newBudget < 100) {
            budget.innerText = 100
            setBudget(budget.innerText);
        }
    }

    const navigate = useNavigate();


    async function open() {
        await axios.patch("/" + user._id, { budget: budget }
        );
        navigate("/");
    }



    return (


        <div className="budget-container">

            <div className="budget-navbar">
            </div>

            <h1 className="budget-title">Set up your monthly budget </h1>
            <button onClick={decBudget} className="budget-btn"> - </button>
            <span className="budget-signal">£</span><span className="budget-num" id="budget-num-id">500</span>
            <button onClick={incBudget} className="budget-btn"> + </button>
            <div>
                <button onClick={() => open()} className="budget-done"> Done </button>
            </div>
        </div>


    )
}
