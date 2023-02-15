import React from "react";
import { useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import Input from "../components/Input/Input";

const Signin = () => {

  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <form>
      <Input type="email" text="Email" />
      <Input
        type={visible ? "text" : "password"}
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        text="Password"
        handleClick={handleClick}
      />
      <div>
        <button>Signin</button>
      </div>
    </form>
  );
};

export default Signin;