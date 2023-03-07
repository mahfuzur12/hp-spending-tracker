import React, { useContext } from "react";
import { useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { isEmpty, isEmail } from "../components/helper/validate";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/Input/Input";
import { AuthContext } from "../context/AuthContext";
import "../index.css"
const initialState = {
  name: '',
  password: ''
}

const Signin = () => {

  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(initialState)
  const {email, password} = data
  const {dispatch} = useContext(AuthContext)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  const signin = async (e) => {
    e.preventDefault();
    // check fields
    if (isEmpty(email) || isEmpty(password))
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
      await axios.post("/signin", { email, password });
      localStorage.setItem("_appSigning", true);
      dispatch({ type: "SIGNING" });
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
    <form class = 'signup-form' onSubmit={signin}>

      <label>Email</label>
      <Input type="email"  name="email" handleChange={handleChange}/>
      <br/>

      <label>Password</label>
      <Input
        name="password"
        type={visible ? "text" : "password"}
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        handleClick={handleClick}
        handleChange={handleChange}
      />
      <br/>
      <br/>

     
        <button class ='btns' type="submit">Log In</button>
     
    </form>
    </>
  )
};

export default Signin;