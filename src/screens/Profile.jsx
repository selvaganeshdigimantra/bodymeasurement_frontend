// src/screens/Profile.jsx
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TopAppBar from "../components/TopAppBar";
import BottomBar from "../components/BottomBar";
import { auth, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await signOut(auth); // ✅ Firebase logout
      localStorage.removeItem("user"); // ✅ Clear localStorage
      nav("/login"); // ✅ Redirect
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div className="pb-28">
      <TopAppBar title="Profile" />
      <div className="pt-20 p-4 space-y-4">
        {/* User Info Card */}
        <Paper className="p-4 rounded-2xl flex items-center gap-4 bg-white/90 backdrop-blur-md shadow-lg">
          <Avatar
            src={user?.photoURL || ""}
            sx={{ width: 64, height: 64 }}
          >
            {user?.displayName?.charAt(0) || "U"}
          </Avatar>
          <div>
            <div className="font-semibold text-lg text-gray-800">
              {user?.displayName || "Guest User"}
            </div>
            <div className="text-neutral-500 text-sm">
              {user?.email || "No email available"}
            </div>
          </div>
        </Paper>

        {/* Sign Out Button */}
        <Button
          variant="outlined"
          fullWidth
          color="error"
          onClick={handleLogout}
          sx={{
            borderRadius: "9999px",
            fontWeight: "bold",
            py: 1.5,
          }}
        >
          Sign out
        </Button>
      </div>
      <BottomBar />
    </div>
  );
}
