import React from "react";
import "./App.scss";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Users from "./components/Users";
import { Counter } from "./features/counter/counter";
import Dashboard from "./components/Dashboard"

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </>
  );
}

// https://github.com/woodburydev/passport-local-video
// https://www.youtube.com/watch?v=IUw_TgRhTBE