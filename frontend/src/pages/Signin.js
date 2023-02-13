import React,{useState,useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import {userContext} from '../App'

const Signin = () => {
    const {state,dispatch} = useContext(userContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const PostData = ()=>{
        fetch("/signin", {
            method="post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                throw new Error("Error!");
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="signin">
            <h1>Signin</h1>
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
            <button onClick={()=>PostData()}>Signin</button>
        </div>
    );
}

export default Signin;