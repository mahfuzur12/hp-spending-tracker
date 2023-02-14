import React from "react";
import Signin from "../../pages/Signin";

const AuthLayout = () => {
    return (
      <div>
        <Signin />

        <div>
          <p>Signup?</p>
          <p>Signin?</p>
        </div>
      </div>
    );
  };
  
  export default AuthLayout;