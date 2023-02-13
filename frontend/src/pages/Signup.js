import React,{useState} from "react";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const PostData = ()=>{
        fetch("/signup", {
            method="post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                throw new Error("Error");
            }
            else{
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="signup">
            <h1>Signup</h1>
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={()=>PostData()}>Signup</button>
        </div>
    );
}

export default Signup;