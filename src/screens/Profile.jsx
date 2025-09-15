// // src/screens/Profile.jsx
// import React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";
// import TopAppBar from "../components/TopAppBar";
// import BottomBar from "../components/BottomBar";
// import { auth, signOut } from "../firebase";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const nav = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = async () => {
//     try {
//       await signOut(auth); // ✅ Firebase logout
//       localStorage.removeItem("user"); // ✅ Clear localStorage
//       nav("/login"); // ✅ Redirect
//     } catch (err) {
//       console.error("Logout failed:", err);
//       alert("Something went wrong, please try again.");
//     }
//   };

//   return (
//     <div className="pb-28">
//       <TopAppBar title="Profile" />
//       <div className="pt-20 p-4 space-y-4">
//         {/* User Info Card */}
//         <Paper className="p-4 rounded-2xl flex items-center gap-4 bg-white/90 backdrop-blur-md shadow-lg">
//           <Avatar
//             src={user?.photoURL || ""}
//             sx={{ width: 64, height: 64 }}
//           >
//             {user?.displayName?.charAt(0) || "U"}
//           </Avatar>
//           <div>
//             <div className="font-semibold text-lg text-gray-800">
//               {user?.displayName || "Guest User"}
//             </div>
//             <div className="text-neutral-500 text-sm">
//               {user?.email || "No email available"}
//             </div>
//           </div>
//         </Paper>

//         {/* Sign Out Button */}
//         <Button
//           variant="outlined"
//           fullWidth
//           color="error"
//           onClick={handleLogout}
//           sx={{
//             borderRadius: "9999px",
//             fontWeight: "bold",
//             py: 1.5,
//           }}
//         >
//           Sign out
//         </Button>
//       </div>
//       <BottomBar />
//     </div>
//   );
// }



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
    <div className="pb-28 relative min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg-pattern.png')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-600/70" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3">
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

        <h2 className="text-white font-semibold text-lg">Profile</h2>

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
      <div className="relative z-10 px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Paper className="p-6 rounded-2xl flex items-center gap-4 bg-black/70 backdrop-blur-md border border-white/20 shadow-lg">
            <Avatar
              src={user?.photoURL || ""}
              sx={{ width: 72, height: 72 }}
            >
              {user?.displayName?.charAt(0) || "U"}
            </Avatar>
            <div>
              <div className="font-semibold text-xl text-white">
                {user?.displayName || "Guest User"}
              </div>
              <div className="text-gray-300 text-sm">
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



