import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chats from "../pages/Chats";
import Home from "../pages/Home";
import UpdatePost from "../components/posts/UpdatePost";
import Profile from "../pages/Profile";
import UpdateUser from "../components/users/UpdateUser";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Error from "../pages/Error";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post-update" element={<UpdatePost />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
