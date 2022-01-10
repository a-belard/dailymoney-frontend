import React from "react"
import { Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Account from './Pages/Account/Account';
import Checkemail from './Pages/Checkemail/Checkemail';
import Dashboard from './Pages/Dashboard/Dashboard';
import Info from './Pages/Info/Info';
import Invite from './Pages/Invite/Invite';
import Landing from './Pages/Landing/Landing';
import Login from './Pages/Login/Login';
import Notifications from './Pages/Notifications/Notifications';
import Signup from './Pages/Signup/Signup';
import decode from "jwt-decode"

function App() {
  let decoded;
  if(localStorage.token){
    if(window.location.pathname === "/login" || window.location.pathname.includes("register")){
      window.location.href = "/dashboard"
    }
    try{
      decoded = decode(localStorage.token)
      if(!decoded.exp || decoded.exp * 1000){
      }
    }
    catch(err){
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
  }
  else{
    if(window.location.pathname !== "/login" && !window.location.pathname.includes("register") && window.location.pathname !== "/")
      window.location.href = "/login"
  }
  return (
      <Routes>
        <Route element={<Landing/>} path="/"/>
        <Route element={<Signup/>} path="/register/:referer"/>
        <Route element={<Checkemail/>} path="/checkemail/:id"/>
        <Route element={<Login/>} path="/login"/>
        <Route element={<Dashboard/>} path="/dashboard"/>
        <Route element={<Invite/>} path="/referrals"/>
        <Route element={<Notifications/>} path="/notifications"/>
        <Route element={<Account/>} path="/account"/>
        <Route element={<Info/>} path="/info"/>
        <Route path="/*" element={<Navigate to="/"/>}/>
      </Routes>
  );
}

export default App;
