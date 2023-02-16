import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const ActivateLayout = () => {
    const {activation_token} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        // check token
        if (activation_token) {
          const activateUser = async () => {
            try {
              const res = await axios.post("/activation", {
                activation_token,
              });
              toast(res.data.msg, {
                className: "toast-success",
                bodyClassName: "toast-success",
              });
            } catch (err) {
              console.log(err);
              toast(err.response.data.msg, {
                className: "toast-failed",
                bodyClassName: "toast-failed",
              });
            }
          };
          activateUser();
        }
      }, [activation_token]);

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div>
            <ToastContainer />
            <p>
                Ready to signin? <button onClick={handleClick}>Here</button>
            </p>
        </div>
    );
};

export default ActivateLayout;