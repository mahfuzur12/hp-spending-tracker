import React, { useState } from "react";
import Forgot from "../../components/Forgot/Forgot";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";
import img from "../../images/landing1.png"
import "./AuthLayout.css";

const AuthLayout = () => {
  const [signin, setSignin] = useState(true)
  const [signup, setSignup] = useState(false)
  const [forgot, setForgot] = useState(false)

  const handleSignin = () => {
    setSignin(true);
    setSignup(false);
    setForgot(false);
  };
  const handleSignup = () => {
    setSignin(false);
    setSignup(true);
    setForgot(false);
  };
  const handleForgot = () => {
    setSignin(false);
    setSignup(false);
    setForgot(true);
  };

  return (
    <body>
      <nav class="navbar">
        <a class="nav-logo">Piciclot Tracker</a>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <main>
        <div class='content' style={{ color: "white" }}>
          <h1>Your Personal <br/> Spending Tracker</h1>
          <p>Join us to track your spending and save more money :-)</p>
          <br/>
          <div class = "landing-form">
          {signin && <Signin />}
          {signup && <Signup />}
          {forgot && <Forgot />}
          <div class = 'btns-position'></div>
          <button class='btns' onClick={signin ? handleSignup : handleSignin}>{signin ? "Sign up" : "Log In"}</button>
          <button class='btns' onClick={handleForgot}>Forgot Password</button>
          </div>

        </div>

        <div class = "image-container">
          <img src = {img} alt = "no"/>
          
        </div>



      </main>
      <div className="test" >
          <p id="about"></p>
        </div>

        <div className="test1" >
          <p id="services"></p>
        </div>

        <div className="test2" >
          <p id="contact"></p>
        </div>
    </body>
  );
};

export default AuthLayout;