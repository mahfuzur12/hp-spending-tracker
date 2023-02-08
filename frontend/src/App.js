import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
// pages + components
import Overview from "./pages/Overview";

function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Overview/>
      break
  
    
    
  }
  return (
    <>
    <Navbar/>
    <div className=" container">
    {component} 
    </div>
    </>
  );
}

export default App;
