import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chats from "../pages/Chats";
import Index from "../pages/auth/Index";
import Home from "../pages/Home";
import UpdatePost from "../components/posts/UpdatePost";
import Profile from "../pages/Profile";
import UpdateUser from "../components/users/UpdateUser";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post-update" element={<UpdatePost />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/auth" element={<Index />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
