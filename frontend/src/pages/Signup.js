import React from "react";
import Input from "../components/Input/Input";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useState } from "react";
import { isEmpty, isEmail, isLength, isMatch } from "../components/helper/validate";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
};

const Signup = () => {

  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(initialState);
  const { name, email, password, cf_password } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  const signup = async (e) => {
    e.preventDefault();

    // check fields
    if (isEmpty(name) || isEmpty(password))
      return toast("Please fill in all fields.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    // check email
    if (!isEmail(email))
      return toast("Please enter a valid email address.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    // check password
    if (isLength(password))
      return toast("Password must be at least 6 characters.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    // check match
    if (!isMatch(password, cf_password))
      return toast("Password did not match.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });

    try {
      const res = await axios.post("/signup", {
        name,
        email,
        password,
      });
      toast(res.data.msg, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
    } catch (err) {
      toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
    handleReset();
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setData({ ...data, name: "", email: "", password: "", cf_password: "" });
  };

  return (
    <>
      <ToastContainer />
      <form className="signup-landing-form" onSubmit={signup}>
        {/* <label htmlFor="name" className="signup-title">Name</label> */}
        <Input id="name" type="text" text="Name" name="name" className="signup-text-input" handleChange={handleChange} />

        {/* <label htmlFor="email" className="signup-title"> Email</label> */}
        <Input id="email" type="text" text="Email" name="email" className="signup-text-input" handleChange={handleChange} />
        {/* <label htmlFor="password" className="signup-title">Password</label> */}
        <Input
          id="password"
          name="password"
          text="Password"
          type={visible ? "text" : "password"}
          icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
          handleClick={handleClick}
          handleChange={handleChange}
        />

        {/* <label htmlFor="cf_password" className="signup-title">Confirm</label> */}

        <Input
          id="cf_password"
          name="cf_password"
          type={visible ? "text" : "password"}
          icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
          handleClick={handleClick}
          handleChange={handleChange}
          text="Confirm"
        />


        <button className="auth-btns" type="submit">Sign up</button>
      </form>
    </>
  );
};

export default Signup;