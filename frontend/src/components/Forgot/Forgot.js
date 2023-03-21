import React from "react";
import { act } from "@testing-library/react";
import Input from "../Input/Input";
import { isEmpty, isEmail } from "../helper/validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Forgot = () => {

  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    act(() => {
      setEmail({ email: "" });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check fields
    if (isEmpty(email))
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
    try {
      await axios.post("/forgot_pass", { email });
      handleReset();
      return toast("Please check your email 📧", {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
    } catch (err) {
      toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="signin-landing-form" onSubmit={handleSubmit}>
        <Input type="text" text="Email" name="email" handleChange={handleChange} />
        <button className='auth-btns' type="submit">Send</button>
      </form>
    </>
  );
};

export default Forgot;