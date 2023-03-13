import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import Transactions from './pages/Transactions';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Transactions />
    </AuthContextProvider>
  </React.StrictMode>,
  
);