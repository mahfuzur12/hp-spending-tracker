import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages + components
import Overview from "./pages/Overview";
import Navbar from "./components/Navbar";
import Charts from "./components/Charts"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div classname="pages">
          <Routes>
            <Route path="/charts" element={<Charts />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
