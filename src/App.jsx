import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Splash from "./screens/Splash";
import Login from "./screens/Login";
import Home from "./screens/Home";
import ListScreen from "./screens/List";
import Detail from "./screens/Detail";
import Create from "./screens/Create";
import Edit from "./screens/Edit";
import Notifications from "./screens/Notifications";
import Profile from "./screens/Profile";
import Layout from "./Layout";

function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div
      className="max-w-auto mx-auto relative min-h-screen"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Routes>
  {/* ✅ Public routes */}
  <Route path="/" element={<Splash />} />
  <Route path="/login" element={<Login />} />

  {/* ✅ Private routes with layout */}
  <Route
    element={
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    }
  >
    <Route path="/home" element={<Home />} />
    <Route path="/list" element={<ListScreen />} />
    <Route path="/detail/:id" element={<Detail />} />
    <Route path="/create" element={<Create />} />
    <Route path="/edit/:id" element={<Edit />} />
    <Route path="/notifications" element={<Notifications />} />
    <Route path="/profile" element={<Profile />} />
  </Route>

  {/* ✅ Fallback */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>

    </div>
  );
}
