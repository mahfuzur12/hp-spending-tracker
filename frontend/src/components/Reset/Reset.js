import React from "react";
import Input from "../Input/Input";

const Reset = () => {
    return (
        <form>
            <Input type="password" text="Password" />
            <Input type="password" text="Confirm Password" />
            <div>
                <button>Reset</button>
            </div>
        </form>
    );
};

export default Reset;