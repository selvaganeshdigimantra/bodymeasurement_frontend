// Home.jsx
import React from "react";
import { Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";

export default function Home() {
  const nav = useNavigate();

  const menuItems = [
    // { id: 1, title: "BMI calculator", path: "/bmi" },
    { id: 2, title: "Find My Size", path: "/measurements" },
    // { id: 3, title: "Body Fat calculator", path: "/body-fat" },
    // { id: 4, title: "Body Shape", path: "/shape" },
    // { id: 5, title: "TDEE", path: "/tdee" },
    // { id: 6, title: "Body Stat", path: "/stats" },
    // { id: 7, title: "Celebs look alike me!", path: "/celebs" },
  ];

  return (
    <div className="pb-28 relative min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg-pattern.png')", // place your image in public/bg-pattern.png
        }}
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-blue-600/70" />

      <div className="relative z-10 px-6 pt-12">
        {/* Header */}
        <h1 className="text-white text-2xl font-bold mb-8">My Body Tracking</h1>

        {/* Menu list */}
        <div className="space-y-4">
          {menuItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card
                onClick={() => nav(item.path)}
                className="rounded-xl bg-black/70 backdrop-blur-md border border-white/20 cursor-pointer hover:bg-black/80 transition"
              >
                <CardContent className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">⭐</span>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <span className="text-xl">›</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomBar />
    </div>
  );
}
