import { isLength, isMatch } from "../helper/validate";
import React, { useContext } from "react";
import Input from "../Input/Input";
import Avatar from "../Avatar/Avatar";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { AiFillCamera } from "react-icons/ai";
import { useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavComp from "../Navbar/Navbar";
import theme from "../../pages/Overview/theme";
import styled from "styled-components";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
};

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 4vh 14vw;
`;

const Profile = () => {
  const inputFile = useRef(null);
  const [visible, setVisible] = useState(false);
  const { user, token, dispatch } = useContext(AuthContext)
  const [data, setData] = useState(initialState);
  const { name, password, cf_password } = data;

  const handleInput = () => {
    inputFile.current.click();
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateInfo = async () => {
    try {
      const res = await axios.patch(
        "/update_user",
        {
          name: name ? name : user.name
        },
        {
          headers: { Authorization: token },
        }
      );
      const updatedUser = await axios.get("/user", {
        headers: { Authorization: token },
      });
      dispatch({ type: "GET_USER", payload: updatedUser.data });
      return toast(res.data.msg, {
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

  const updatePassword = async () => {
    // check password length
    if (isLength(password))
      return toast("Password must be at least 6 characters.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    // check password match
    if (!isMatch(password, cf_password))
      return toast("Password did not match.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    try {
      const res = await axios.post(
        "/reset_pass",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      return toast(res.data.msg, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
    } catch (err) {
      return toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setData({ ...data, name: "", password: "", cf_password: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      updateInfo();
    }
    if (password) {
      updatePassword();
      handleReset();
    }
  };

  return (
    <Container>
    <div className="profile-body">
      <ToastContainer />
      <div>
        <NavComp/>
        <div className="profile-container">
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="profile-form-leftbox">
              <nav>
                <a>
                  <FontAwesomeIcon icon={faUser} className="fa-lg fa-user-my" />
                </a>
              </nav>
            </div>

            <div className="profile-form-rightbox">
              <h1>Personal Info</h1>
              <Input type="text" text="Name" defaultValue={user.name} name="name" handleChange={handleChange} />
              <Input type="text" text="Email" defaultValue={user.email} disabled name="email" handleChange={handleChange} />
              <Input
                name="password"
                type={visible ? "text" : "password"}
                icon={
                  visible ? (
                    <span data-testid="password-toggle">
                      <MdVisibility />
                    </span>
                  ) : (
                    <span data-testid="password-toggle">
                      <MdVisibilityOff />
                    </span>
                  )
                }
                text="Password"
                handleClick={handleClick}
                handleChange={handleChange}
              />
              <Input
                name="cf_password"
                type={visible ? "text" : "password"}
                icon={
                  visible ? (
                    <span data-testid="cf-password-toggle">
                      <MdVisibility />
                    </span>
                  ) : (
                    <span data-testid="cf-password-toggle">
                      <MdVisibilityOff />
                    </span>
                  )
                }
                text="Confirm Password"
                handleClick={handleClick}
                handleChange={handleChange}
              />


              <div>
                <button className="profile-form-btn" type="submit">Update</button>
              </div>

            </div>
          </form>

        </div>

      </div>
    </div>
    </Container>
  );
};

export default Profile;