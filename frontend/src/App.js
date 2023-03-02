import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ActivateLayout from "./Layouts/ActivateLayout/ActivateLayout";
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import ProfileLayout from "./Layouts/ProfileLayout/ProfileLayout";
import ResetLayout from "./Layouts/ResetLayout/ResetLayout";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";

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
          element={isLoggedIn ? <ProfileLayout /> : <AuthLayout />}
        />
        <Route
          path="/auth/reset-password/:token"
          exact element={<ResetLayout />} />
        <Route
          path="/api/auth/activate/:activation_token"
          exact element={<ActivateLayout />} />
          
      </Routes>
    </Router>
  );
}

export default App;