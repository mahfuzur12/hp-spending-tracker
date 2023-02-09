import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Navbar from "./components/Navbar"; 
// pages + components
import Overview from "./pages/Overview";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div classname="pages">
          <Routes>
            <Route path="/" element={<Overview />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
