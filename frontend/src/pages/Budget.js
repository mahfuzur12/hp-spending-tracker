import React, { useEffect } from "react";
import "./Budget.css";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import { useContext } from "react";
import { useState } from "react";

export default function Spending() {
    const [budget, setBudget] = useState(500);
    const [displayBudget, setDisplayBudget] = useState();
    const [showMess, setShowMess] = useState(false);
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

    async function open() {
        await axios.patch("/" + user._id, { budget: budget }
        );
        setShowMess(true);
    }

    useEffect(() => {
        async function Fetch() {
            let currUser = await axios.get("/" + user._id);
            setDisplayBudget(currUser.data.data.budget);
        }
        Fetch();
    }, [user._id]);

    return (


        <div className="budget-container">

            <div className="budget-navbar">
            </div>

            <h1 className="budget-title">Set up your monthly budget </h1>
            <button onClick={decBudget} id="budget-btn-minus"> - </button>
            <span className="budget-signal">£</span><span className="budget-num" id="budget-num-id">{displayBudget}</span>
            <button onClick={incBudget} id="budget-btn-plus"> + </button>
            <div>
                <button onClick={() => open()} className="budget-done"> Done </button>
                {showMess && <p id="budget-message"> Your budget is set !</p>}
            </div>
        </div>


    )
}
