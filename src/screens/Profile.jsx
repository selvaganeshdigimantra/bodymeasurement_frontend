// src/screens/Profile.jsx
import React from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { auth, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import { motion } from "framer-motion";

export default function Profile() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Firebase logout failed:", err);
    } finally {
      localStorage.removeItem("user");
      nav("/login");
    }
  };

  return (
    <div className="pb-28 relative min-h-screen flex flex-col">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-pattern.png')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-600/70" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Back Button with round bg */}
        <IconButton
          onClick={() => nav("/home")}
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <h2 className="text-white font-semibold text-base sm:text-lg">
          Profile
        </h2>

        {/* Logout Button with round bg */}
        <IconButton
          onClick={handleLogout}
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
          }}
        >
          <LogoutIcon />
        </IconButton>
      </div>

      {/* User Info Card */}
      <div className="relative z-10 flex-1 px-4 sm:px-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Paper className="p-5 sm:p-6 rounded-2xl flex flex-wrap sm:flex-nowrap items-center gap-4 bg-black/70 backdrop-blur-md border border-white/20 shadow-lg">
            <Avatar
              src={user?.photoURL || ""}
              sx={{ width: 72, height: 72 }}
            >
              {user?.displayName?.charAt(0) || "U"}
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-lg sm:text-xl text-white truncate">
                {user?.displayName || "Guest User"}
              </div>
              <div className="text-gray-300 text-sm sm:text-base break-all">
                {user?.email || "No email available"}
              </div>
            </div>
          </Paper>
        </motion.div>
      </div>

      <BottomBar />
    </div>
  );
}
