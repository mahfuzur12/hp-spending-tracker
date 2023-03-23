import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ActivateLayout from "./Layouts/ActivateLayout/ActivateLayout";
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import ProfileLayout from "./Layouts/ProfileLayout/ProfileLayout";
import ResetLayout from "./Layouts/ResetLayout/ResetLayout";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import Budget from "./pages/Budget";
import Overview from "./pages/Overview/Overview";
import Transactions from "./pages/Transactions"
import Profile from "./components/Profile/Profile";
import Streaks from "./pages/Streaks";
import StreaksNavbar from "./pages/StreaksNavbar"
import Points from "./pages/Points";
import NavComp from "./components/Navbar/Navbar";
import theme from "./pages/Overview/theme";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 4vh 14vw;
`;

function App() {
  const { dispatch, token, isLoggedIn } = useContext(AuthContext);

  // get ac token
  useEffect(() => {
    const _appSigning = localStorage.getItem("_appSigning");
    if (_appSigning) {
      const getToken = async () => {
        const res = await axios.post("/access", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.ac_token });
      };
      getToken();
    }
  }, [dispatch, isLoggedIn]);

  // get user data
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch({ type: "SIGNING" });
        const res = await axios.get("/user", {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_USER", payload: res.data });
      };
      getUser();
    }
  }, [dispatch, token]);



  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={isLoggedIn ?
            <ProfileLayout />
            : <AuthLayout />}
        />
        <Route
          path="/auth/reset-password/:token"
          exact element={<ResetLayout />} />
        <Route
          path="/api/auth/activate/:activation_token"
          exact element={<ActivateLayout />} />
        <Route path="/overview" exact element={isLoggedIn ? <Overview /> : <AuthLayout />} />
        <Route path="/budget" exact element={isLoggedIn ? <Budget /> : <AuthLayout />} />
        <Route path="/transactions" exact element={isLoggedIn ? <Transactions /> : <AuthLayout />} />
        <Route path="/profile" exact element={isLoggedIn ? <Profile /> : <AuthLayout />} />
        <Route path="/progress" exact element={isLoggedIn ? <Streaks /> : <AuthLayout />} />
        <Route path="/streaks" exact element={isLoggedIn ? <StreaksNavbar /> : <AuthLayout />} />
        <Route path="/points" exact element={isLoggedIn ? <Points /> : <AuthLayout />} />





      </Routes>
    </Router>
  );

}

export default App;