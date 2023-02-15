import React from "react";
import Input from "../components/Input/Input";

const Signin = () => {
    return (
      <form>
        <Input type="email" text="email" />
        <Input type="password" text="password" />
        <div>
            <button>Signin</button>
        </div>
      </form>
    );
  };
  
  export default Signin;