import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Budget.css"

export default function Spending() {
    function incBudget() {
        const budget = document.getElementById("budget-num-id");
        const newBudget = parseInt(budget.innerText) + 10
        budget.innerText = newBudget;
    }

    function decBudget() {
        const budget = document.getElementById("budget-num-id");
        const newBudget = parseInt(budget.innerText) - 10;
        budget.innerText = newBudget;

        if (newBudget < 100) {
            budget.innerText = 100
        }
    }

    const navigate = useNavigate();

    return (


        <div className="budget-container">

            <div className="budget-navbar">
                <Navbar />
            </div>

            <h1 className="budget-title">Set up your monthly budget </h1>
            <button onClick={decBudget} className="budget-btn"> - </button>
            <span className="budget-signal">£</span><span className="budget-num" id="budget-num-id">500</span>
            <button onClick={incBudget} className="budget-btn"> + </button>
            <div>
                <button onClick={() => { navigate("/budget-summary") }} className="budget-done"> Done </button>
            </div>
        </div>


    )
}
