import React from "react";
import { useNavigate } from "react-router-dom";
import Reset from "../../components/Reset/Reset";

const ResetLayout = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div>
            <Reset />
            <button onClick={handleClick}>
                Signin
            </button>
        </div>
    );
};

export default ResetLayout;