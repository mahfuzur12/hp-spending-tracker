import React from "react";
import Input from "../components/Input/Input";

const Signin = () => {
    return (
      <form>
        <Input type="email" text="Email" />
        <Input type="password" text="Password" />
        <div>
            <button>Signin</button>
        </div>
      </form>
    );
  };
  
  export default Signin;