import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ActivateLayout from "./Layouts/ActivateLayout/ActivateLayout";
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import ProfileLayout from "./Layouts/ProfileLayout/ProfileLayout";
import ResetLayout from "./Layouts/ResetLayout/ResetLayout";

function App() {
  const isLoggedIn = false;

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