// screens/CameraScreen.jsx
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { motion } from "framer-motion";

export default function CameraScreen({ onBack, onCapture }) {
  const webcamRef = useRef(null);
  const [error, setError] = useState("");

  const capture = () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        setError("Camera not ready, please try again.");
        return;
      }
      onCapture(imageSrc);
    } catch (e) {
      setError("Error capturing photo.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-pattern.png')" }}
      />
      <div className="absolute inset-0 bg-blue-900/70" />

      {/* Header */}
      <div className="relative z-10 flex items-center space-x-3 p-4">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30"
        >
          <ArrowBackIosNewIcon className="text-white" fontSize="small" />
        </button>
        <h1 className="text-white text-lg font-bold">Get Measured</h1>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 px-6 text-white space-y-2"
      >
        <h2 className="text-lg font-semibold">Instructions</h2>
        <ul className="list-disc list-inside text-sm text-white/90 space-y-1">
          <li>Stand straight in front of the camera.</li>
          <li>Ensure your full body is visible.</li>
          <li>Good lighting improves accuracy.</li>
        </ul>
      </motion.div>

      {/* Webcam */}
      <div className="relative z-10 flex-1 flex justify-center items-center p-4">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          className="rounded-xl shadow-lg border-2 border-white/30 max-h-[60vh]"
        />
      </div>

      {/* Capture button */}
      <div className="relative z-10 flex justify-center pb-8">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={capture}
          className="w-16 h-16 rounded-full bg-red-500 shadow-lg flex items-center justify-center"
        >
          <span className="w-10 h-10 rounded-full bg-white" />
        </motion.button>
      </div>

      {/* Error */}
      {error && (
        <p className="absolute bottom-2 text-center w-full text-red-400 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
