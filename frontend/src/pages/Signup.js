import React from "react";
import Input from "../components/Input/Input";

const Signup = () => {
  return (
    <form>
      <Input type="text" text="Name" />
      <Input type="text" text="Email" />
      <Input type="password" text="Password" />
      <Input type="password" text="Confirm Password" />
      <div>
        <button>Signup</button>
      </div>
    </form>
  );
};

export default Signup;