import React from "react";

const Input = ({icon, handleClick, type, name, handleChange, defaultValue, disabled, text}) => {
    return (
        <div>
            <label>
                <div onClick={handleClick}>{icon}</div>
                <input type={type} name={name} onChange={handleChange} 
                defaultValue={defaultValue} disabled={disabled} placeholder="&nbsp;" autoComplete="off" />
                <span>{text}</span>
            </label>
        </div>
    );
};

export default Input;