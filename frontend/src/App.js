import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
// pages + components
import Navbar from "./components/Navbar";
//import Overview from "./pages/Overview";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
