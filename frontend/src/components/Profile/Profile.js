import React, { useContext } from "react";
import Input from "../Input/Input";
import Avatar from "../Avatar/Avatar";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { AiFillCamera } from "react-icons/ai";
import { useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const inputFile = useRef(null);
  const [visible, setVisible] = useState(false);
  const {user} = useContext(AuthContext)

  const handleInput = () => {
    inputFile.current.click();
  };

  const handleClick = () => {
    setVisible(!visible);
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
          <Input type="text" text="Name" defaultValue={user.name}/>
          <Input type="text" text="Email" defaultValue={user.email} disabled/>
          <Input
            type={visible ? "text" : "password"}
            icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
            text="Password"
            handleClick={handleClick}
          />
          <Input
            type={visible ? "text" : "password"}
            icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
            text="Confirm Password"
            handleClick={handleClick}
          />
          <div>
            <button>Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;