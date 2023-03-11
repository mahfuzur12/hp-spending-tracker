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
  password: ''
}

const Signin = () => {

  const [inputValue, setInputValue] = useState('');

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
      <form className="signin-landing-form" onSubmit={signin}>
        <div className="signin-landing-form">
          <label className="signin-input-title">Email</label>

          <div className="signin-input-div">
            <label>
              <input className="signin-input-input" type={email} name={"email"} onChange={handleChange}
                placeholder="&nbsp;" autoComplete="off" />
            </label>
          </div>

        </div>

        <br />
        <div className="signin-landing-form">
          <div className="signin-input-div">
            <label className="signin-input-title"> Password
              <span onClick={handleClick}> {visible ? <MdVisibility /> : <MdVisibilityOff />}</span>
            </label>


            <input className="signin-input-input" type={visible ? "text" : "password"} name="password" onChange={handleChange}
              placeholder="&nbsp;" autoComplete="off" />



          </div>


        </div>




        <br />
        <br />

        <button class='auth-btns' type="submit">Log In</button>

      </form>
    </>
  )
};

export default Signin;