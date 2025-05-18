import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import AgentManagement from './components/AgentManagement';
import CsvUpload from './components/CsvUpload';
import Navbar from './components/Navbar';

const App = () => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
    return user;
  });

  return (
    <Router>
      {auth && <Navbar setAuth={setAuth} />}
      <Routes>
        <Route path="/" element={auth ? <Navigate to="/dashboard" replace /> : <Login setAuth={setAuth} />} />
        <Route path="/register" element={auth ? <Navigate to="/dashboard" replace /> : <Register setAuth={setAuth} />} />
        <Route path="/dashboard" element={auth ? <Dashboard /> : <Navigate to="/" replace />} />
        <Route path="/agents" element={auth ? <AgentManagement /> : <Navigate to="/" replace />} />
        <Route path="/lists" element={auth ? <CsvUpload /> : <Navigate to="/" replace />} />
        {/* Add this new route */}
        <Route path="/upload" element={auth ? <CsvUpload /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;