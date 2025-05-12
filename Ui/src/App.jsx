// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Componets/NavigationBar';  
import Home from './Componets/Home';
import ApplyLeave from './Componets/ApplyLeave';
import {Leavelist} from './Componets/Leavelist';
import AboutUs from './Componets/Aboutus';
import ContactUs from './Componets/ContactUs';
import ManageLeaves from './Componets/ManageLeaves';
import ManageEmployees from './Componets/ManageEmployees';
import Login from './Componets/Login';
import SignUp from './Componets/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [role, setRole] = useState('');  

  return (
    <Router>
      <Navbar role={role} />  

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/leaves" element={role === 'manager' ? <ManageLeaves /> : <Leavelist />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/manage-leaves" element={role === 'manager' ? <ManageLeaves /> : <Leavelist />} />
        <Route path="/manage-employees" element={role === 'manager' ? <ManageEmployees /> : <Leavelist />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
