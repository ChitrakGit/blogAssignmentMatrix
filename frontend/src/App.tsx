import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/authPage';
import Dashboard from './pages/dashboard';
import './index.css';
import Register from './pages/register';
import React, { useState } from 'react';

function App() {
  const [isAuthenticated, setAuthenticated] = useState<Boolean>(false);

  React.useEffect(() => {

    const token = localStorage.getItem('accesstoken');
    if(token) setAuthenticated(true)

  }, []);
  return (
    <div>
      {/* Other components */}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        {/* <Route path="/dashboard"  element={
          isAuthenticated? <Dashboard /> : <Navigate to="/" replace />
        } /> */}


      </Routes>
    </div>
  );
}


export default App;