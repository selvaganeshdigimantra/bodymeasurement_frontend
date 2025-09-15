// src/screens/FriendMeasurementWrapper.jsx
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import MeasurementCamera from "./MeasurementCamera";

export default function FriendMeasurementWrapper({ onBack }) {
  const [step, setStep] = useState("permission"); // permission -> video -> camera
  if (step === "camera") {
    return <MeasurementCamera onBack={() => setStep("video")} />;
  }
  return (
    <div className="relative min-h-screen text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg-pattern.png')" }} />
      <div className="absolute inset-0 bg-blue-900/70" />
      <div className="relative z-10 px-6 pt-12">
        <button onClick={onBack} className="mb-6"><ArrowBackIcon className="text-white" /></button>
        {step === "permission" && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-black/80 text-white rounded-2xl p-6 w-80 text-center space-y-4">
              <div className="text-4xl">📷</div>
              <p className="text-sm">Allow Body.ai to take pictures?</p>
              <div className="space-y-2">
                <button className="w-full py-2 rounded-lg bg-purple-600" onClick={() => setStep("video")}>While using the app</button>
                <button className="w-full py-2 rounded-lg bg-purple-600" onClick={() => setStep("video")}>Only this time</button>
                <button className="w-full py-2 rounded-lg bg-gray-600" onClick={() => setStep("video")}>Don't allow</button>
              </div>
            </div>
          </motion.div>
        )}
        {step === "video" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">How it works</h1>
            <p className="opacity-80">Follow our instructions below to get highest accuracy of your measurements.</p>
            <div className="rounded-xl overflow-hidden border border-white/20 shadow-lg">
              <video autoPlay muted loop playsInline className="w-full" controls src="https://video.wixstatic.com/video/112f4b_628d3bd40f4c41d596b78133214704b1/720p/mp4/file.mp4" />
            </div>
            <div className="flex justify-center space-x-4 pt-4">
              <button className="px-6 py-2 rounded-full bg-purple-500" onClick={() => setStep("camera")}>Get Measured</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
