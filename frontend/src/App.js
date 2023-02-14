import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React,{useEffect,createContext, useReducer, useContext} from "react";
// pages + components
import Navbar from "./components/Navbar";
//import Overview from "./pages/Overview";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import {reducer,initialState} from "./reducers/userReducer"

export const UserContext = createContext()


const Routing = ()=>{
  const navigate = useNavigate()
  const {dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      navigate('/')
    }else{
      navigate('/')
    }
  },[])
  return(
    <Routes>

        <Route 
          exact path="/"
          element={<></>} 
          />
        <Route
          path="/signin"
          element={<Signin />} />
        <Route
          path="/signup"
          element={<Signup />} />

    </Routes>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;