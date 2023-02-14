import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages + components
import Overview from "./pages/Overview";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div classname="pages">
          <Routes>
            <Route path="/" element={<Navbar />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
