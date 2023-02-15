import React from "react";
import Input from "../components/Input/Input";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

const Signup = () => {

  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <form>
      <Input type="text" text="Name" />
      <Input type="text" text="Email" />
      <Input
        type={visible ? "text" : "password"}
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        text="Password"
        handleClick={handleClick}
      />
      <Input
        type={visible ? "text" : "password"}
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        text="Confirm Password"
        handleClick={handleClick}
      />
      <div>
        <button>Signup</button>
      </div>
    </form>
  );
};

export default Signup;