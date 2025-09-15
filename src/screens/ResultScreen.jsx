// screens/ResultScreen.jsx
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function ResultScreen({ photo, onBack }) {
  // Dummy AI results
  const results = {
    Height: "172 cm",
    Waist: "82 cm",
    Chest: "94 cm",
    BodyFat: "18%",
    BMI: "23.1",
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white">
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
        <h1 className="text-white text-lg font-bold">Results</h1>
      </div>

      {/* Captured photo */}
      <div className="relative z-10 flex justify-center p-4">
        <img
          src={photo}
          alt="Captured"
          className="rounded-xl shadow-lg border border-white/30 max-h-[40vh]"
        />
      </div>

      {/* Results */}
      <div className="relative z-10 px-6 space-y-3">
        {Object.entries(results).map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between py-2 border-b border-white/20"
          >
            <span className="text-white/80">{k}</span>
            <span className="font-semibold">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
