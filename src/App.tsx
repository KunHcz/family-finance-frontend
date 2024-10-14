import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
