import React, { useContext } from "react";
import { useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { isEmpty, isEmail } from "../components/helper/validate";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import "./Signin.css"

const initialState = {
  name: '',
  password: '',
  email: ''
}

const Signin = () => {

  const [inputValue, setInputValue] = useState('');

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(initialState)
  const { email, password } = data
  const { dispatch } = useContext(AuthContext)

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
      await axios.post("/signin", { email: data.email, password: data.password });
      localStorage.setItem("_appSigning", true);
      dispatch({ type: "SIGNING" });
      setIsSignedIn(true); // Add this line
    } catch (err) {
      // toast(err.response.data.msg, {
      //   className: "toast-failed",
      //   bodyClassName: "toast-failed",
      // });
    }
  };

  return (
    <div>
      <ToastContainer data-testid="signin-component" is-signed-in={isSignedIn} />
      <form className="signin-landing-form" onSubmit={signin}>
        <div className="signin-landing-block">
          <label className="signin-input-title">Email</label>
          <input className="signin-input-input" type={email} name={"email"} onChange={handleChange}
            placeholder="Enter your email" autoComplete="off" value={data.email} />
        </div>

        <div className="signin-landing-block">
          <label className="signin-input-title"> Password
            <span onClick={handleClick} data-testid="password-visibility-toggle" > {visible ? <MdVisibility label={"Password visibility toggle"} /> : <MdVisibilityOff />}</span>
          </label>
          <input className="signin-input-input" type={visible ? "text" : "password"} name="password" onChange={handleChange}
            placeholder="Enter your password" autoComplete="off" value={data.password} />
        </div>
        <button className='auth-btns' type="submit">Log In</button>
      </form>
    </div>
  )
};

export default Signin;