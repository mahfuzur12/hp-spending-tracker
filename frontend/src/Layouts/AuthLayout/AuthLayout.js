import React, { useState } from "react";
import Forgot from "../../components/Forgot/Forgot";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";
import ContactUs from "../../components/ContactUs/ContactUs";
import imgPath from "../../images/landing1.png"
import "./AuthLayout.css";
import theme from "../../pages/Overview/theme";
import NavComp from '../../components/Navbar/LandingNavbar';

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
    <body id="auth-body-id">
      <NavComp />
      <main className="auth-main">
        <div className='auth-content' >
          <h1 className='auth-title-content'>Your Personal Spending Tracker</h1>
          <p className='auth-title-side'>Join us to track your spending and save more money :-)</p>
          <div className="auth-landing-form">
            {signin && <Signin />}
            {signup && <Signup />}
            {forgot && <Forgot />}
            <div className='auth-btns-position'>
              <button className='auth-btns' onClick={signin ? handleSignup : handleSignin}>{signin ? "Sign up" : "Log In"}</button>
              <button className='auth-btns' onClick={handleForgot}>Forgot Password</button>
            </div>
          </div>
        </div>

        <div className="auth-image-container">
          <img className="auth-image" src={imgPath} alt="no" />
        </div>

      </main>
      <div className="auth-about-container" id="auth-about-container-id">
        <section className="auth-about-content">At Pocilot Spending Tracker, we understand that managing your finances can be a challenge.
          That's why we've created a powerful tool that allows you to easily track your spending and stay on top of your budget.
          Our user-friendly platform gives you a clear and concise view of your income and expenses, allowing you to identify areas where you can save and make more informed financial decisions.
          With customizable categories and easy-to-use reporting features, our spending tracker helps you achieve your financial goals and stay on track.
          Whether you're managing your personal finances or running a business, Pocilot Spending Tracker is the smart choice for anyone looking to take control of their finances.</section>
      </div>

      <div className="auth-services-container" id="auth-services-container-id" >
        <section className="auth-services-content">
          At Pocilot Spending Tracker, we offer a range of services to help you achieve your financial goals.
          Our spending tracker platform provides real-time insights into your spending habits, allowing you to monitor your cash flow and identify areas where you can save money.
          We also offer budgeting tools that make it easy to set financial goals and track your progress towards them.
          In addition, our platform provides helpful features such as automated categorization and transaction matching, saving you time and making it easy to keep track of your expenses.
          With Pocilot Spending Tracker, you can gain control over your finances and make more informed financial decisions, all in one convenient place.
        </section>
      </div>

      <div className="auth-contact-container" id="auth-contact-container-id" >
        <ContactUs />
      </div>
    </body >
  );
};

export default AuthLayout;