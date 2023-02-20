import React from "react";

export default function Navbar() {
    const path = window.location.pathname
    return (
        <nav className="nav ">
            <div>
            <a href="/" className="site-title"> Pociclot Tracker</a>
            </div>
            <div className="ultest">
            
               <a href="/">Transactions</a>
                  
            </div> 
            <div className="testdiv"> 
                    <a href="/" className="logout">Log out</a>
                
            </div>
        </nav>
    );
}

