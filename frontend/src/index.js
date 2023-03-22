import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NavComp from './components/Navbar/Navbar';
import { AuthContextProvider } from './context/AuthContext'



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  </React.StrictMode>,

);