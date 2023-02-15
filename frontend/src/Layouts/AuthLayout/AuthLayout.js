import React, { useState } from "react";
import Forgot from "../../components/Forgot/Forgot";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";

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
    <div>
      {signin && <Signin />}
      {signup && <Signup />}
      {forgot && <Forgot />}

      <div>
        <button onClick={signin ? handleSignup : handleSignin}>{signin ? "Signup?" : "Signin?"}</button>
        <button onClick={handleForgot}>Forgot?</button>
      </div>
    </div>
  );
};

export default AuthLayout;