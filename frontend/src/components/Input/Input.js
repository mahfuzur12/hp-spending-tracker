import React from "react";
import "./Input.css"

const Input = ({ icon, handleClick, type, name, handleChange, defaultValue, disabled, text }) => {
    return (
        <div className="input-div">
            <label>
                <h2 className="input-content">{text}                <span onClick={handleClick}> {icon}</span></h2>
                <input className="input-input" type={type} name={name} onChange={handleChange}
                    defaultValue={defaultValue} disabled={disabled} placeholder="&nbsp;" autoComplete="off" />
            </label>
        </div>
    );
};

export default Input;

{/* <h2>Full Name</h2>
<input type="text" class="input" value=""> */}