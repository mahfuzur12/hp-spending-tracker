import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./Input.css"

const Input = ({ icon, handleClick, type, name, handleChange, defaultValue, disabled, text }) => {
    return (
        <div className="input-div">
            <label htmlFor={name}>
                <h2 className="input-content">{text}  <span onClick={handleClick}> {icon}</span></h2>
                <input className="input-input" id={name} type={type} name={name} onChange={handleChange}
                    defaultValue={defaultValue} disabled={disabled} placeholder="&nbsp;" autoComplete="off" />
            </label>
        </div>
    );
};

export default Input;

