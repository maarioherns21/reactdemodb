import { useEffect, useState } from 'react';
import Form from '../pages/Form/Form';
import Home from '../pages/Home/Home';
import ProfilePage from '../pages/Profile/ProfilePage';
import './App.css';
import {Routes, BrowserRouter, Route, Navigate} from "react-router-dom"
import Login from '../pages/Auth/Login/Login';
import Signup from '../pages/Auth/Signup/Signup';
import DetailsPage from '../pages/Details/DetailsPage';
import Cookies from 'js-cookie';
import useToken from '../components/useToken/useToken';
import NavBar from '../components/NavBar/NavBar';


function App() {
 const { token, removeCookieToken , user} = useToken();



if (token) {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar token={token} removeCookieToken={removeCookieToken} user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
          <Route path="/form" element={<Form user={user} />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

return (
  <div className="App">
    <BrowserRouter>
    <NavBar token={token} removeCookieToken={removeCookieToken} user={user} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  </div>
);
 
}

export default App;
