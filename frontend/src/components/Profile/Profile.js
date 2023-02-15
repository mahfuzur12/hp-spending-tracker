import React from "react";
import Input from "../Input/Input";
import Avatar from "../Avatar/Avatar";
import { AiFillCamera } from "react-icons/ai";
import { useRef } from "react";

const Profile = () => {
  const inputFile = useRef(null);

  const handleInput = () => {
    inputFile.current.click();
  };

  return (
    <div>
      <div>
        <div onClick={handleInput}>
          <Avatar />
          <AiFillCamera />
        </div>
        <input
          type="file"
          name="avatar"
          ref={inputFile}
        />
      </div>
      <form>
        <div>
          <Input type="text" text="Name" />
          <Input type="text" text="Email" />
          <Input type="password" text="Password" />
          <Input type="password" text="Confirm Password" />
          <div>
            <button>Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;