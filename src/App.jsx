// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Splash from "./screens/Splash";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Measurements from "./screens/Measurements";
// import ListScreen from "./screens/List";
import Detail from "./screens/Detail";
import Create from "./screens/Create";
import Edit from "./screens/Edit";
// import Notifications from "./screens/Notifications";
import Profile from "./screens/Profile";
import Layout from "./Layout";
// import FriendMeasurement from "./screens/FriendMeasurement";
import FriendMeasurement from "./screens/FriendMeasurement";
// NOTE: removed direct MeasurementCamera import from App (we mount via front/side wrappers)
import FrontCapture from "./screens/FrontCapture";
import SideCapture from "./screens/SideCapture";
import ReviewCapture from "./screens/ReviewCapture";
import MeasurementForm from "./screens/MeasurementForm";

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
          <Route path="/measurements" element={<Measurements />} />
          <Route path="/friend-measure" element={<FriendMeasurement onBack={() => window.history.back()} />} />
          {/* new capture flow routes */}
          <Route path="/front-capture" element={<FrontCapture />} />
          <Route path="/side-capture" element={<SideCapture />} />
          <Route path="/review-capture" element={<ReviewCapture />} />
          <Route path="/measurement-form" element={<MeasurementForm/>} />

          {/* other existing routes */}
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* ✅ Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
