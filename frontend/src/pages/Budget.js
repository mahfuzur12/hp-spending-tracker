import React from "react";
import {useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Spending(){
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

    const navigate = useNavigate();
    
    return(
        
            <div className = 'content'>
                <div className="budgetSetter">
                    <button onClick={decBudget} className="budgetButton"> - </button>
                    <span>£</span><span id ="budget">100</span>
                    <button onClick={incBudget} className="budgetButton"> + </button>
                </div>

            </div>
            
    )
}
