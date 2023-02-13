import { BrowserRouter, Routes, Route, Switch, useHistory } from "react-router-dom";
import React,{useEffect,createContext, createRef, useReducer, useContext} from "react";
// pages + components
import Navbar from "./components/Navbar";
//import Overview from "./pages/Overview";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import {reducer,initialState} from "./reducers/userReducer"

export const userContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(userContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/')
    }else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Navbar />} />
            <Route
              path="/signin"
              element={<Signin />} />
            <Route
              path="/signup"
              element={<Signup />} />
          </Routes>
        </div>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <userContext.Provider value={{state,dispatch}}>
      <div className="App">
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
