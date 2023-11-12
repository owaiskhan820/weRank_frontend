import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/signup';
import Home from '../pages/Home/Home'
import ResetPassword from '../pages/Auth/ResetPassword';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
