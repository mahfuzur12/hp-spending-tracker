import React from "react";
import { useNavigate } from "react-router-dom";

const ActivateLayout = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div>
            <p>
                Ready to signin? <button onClick={handleClick}>Here</button>
            </p>
        </div>
    );
};

export default ActivateLayout;