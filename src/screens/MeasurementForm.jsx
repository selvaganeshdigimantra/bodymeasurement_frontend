import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

/** point to your local FastAPI */
const API_BASE = "http://103.117.180.138:8002";
const ENDPOINT = "/measure";

/** helpers */
function getLS(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function dataUrlToFile(dataUrl, filename = "image.jpg") {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}

export default function MeasurementForm() {
  const nav = useNavigate();
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [result, setResult] = useState(null);

  const { frontDataUrl, sideDataUrl } = useMemo(() => {
    const front = getLS("frontImage"); // { image: "data:image/..." }
    const side = getLS("sideImage");
    return {
      frontDataUrl: front?.image || "",
      sideDataUrl: side?.image || "",
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    setResult(null);

    if (!frontDataUrl || !sideDataUrl) {
      setApiError("Front/Side images not found in local storage.");
      return;
    }
    if (!gender || !height) {
      setApiError("Please select gender and enter height (cm).");
      return;
    }

    const formData = new FormData();
    formData.append("front_image", dataUrlToFile(frontDataUrl, "front.jpg"));
    formData.append("side_image", dataUrlToFile(sideDataUrl, "side.jpg"));
    formData.append("height_cm", String(height));
    formData.append("gender", gender);

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}${ENDPOINT}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to measure");
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setApiError(err.message || "Something went wrong while measuring.");
    } finally {
      setLoading(false);
    }
  }

  const Row = ({ label, value, unit = "cm" }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-white/80">{label}</span>
      <span className="text-white font-semibold">
        {typeof value === "number" ? value.toFixed(2) : value}
        {typeof value === "number" ? ` ${unit}` : ""}
      </span>
    </div>
  );

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-pattern.png')" }}
      />
      <div className="absolute inset-0 bg-blue-600/70" />

      {/* Content */}
      <div className="relative z-10 flex-1 px-6 pt-10 pb-6 overflow-y-auto">
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={() => nav(-1)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            aria-label="Back"
          >
            <ArrowBackIosNewIcon className="text-white" fontSize="small" />
          </button>
          <h1 className="text-white text-xl font-bold">Update More Info</h1>
        </div>

        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-4 leading-relaxed mb-6"
          >
            <p className="text-white/90">
              These information are very important for calculating the high
              precision of your body measurements.
            </p>
          </motion.div>
        )}

        {!result && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>

            <div>
              <label className="block text-white/80 mb-1">Height (cm)</label>
              <input
                type="number"
                inputMode="decimal"
                min="50"
                max="250"
                step="0.01"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                placeholder="Enter your height"
                className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {apiError && <div className="text-red-200 text-sm">{apiError}</div>}

            <div className="mt-6 space-y-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg disabled:opacity-70"
              >
                {loading ? "Measuring..." : "Update"}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => nav(-1)}
                className="w-full py-3 rounded-xl bg-white/20 text-white font-semibold shadow-lg"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-2 rounded-2xl p-5 bg-white/10 backdrop-blur-md"
          >
            <h2 className="text-white font-semibold text-lg mb-3">
              Your Measurements
            </h2>

            <div className="divide-y divide-white/10">
              <Row label="Gender" value={result.gender} unit="" />
              <Row label="Height" value={result.height_cm} />
              <Row label="Shoulder Width" value={result.shoulder_width_cm} />
              <Row label="Waist Circumference" value={result.waist_circumference_cm} />
              <Row label="Hip Circumference" value={result.hip_circumference_cm} />
              <Row label="Front Length" value={result.front_length_cm} />
              <Row label="Inseam Length" value={result.inseam_length_cm} />
              <Row label="Outseam Length" value={result.outseam_length_cm} />
              {result.gender === "men" && (
                <Row label="Chest Circumference" value={result.chest_circumference_cm} />
              )}
              {result.gender === "women" && (
                <Row label="Bust Circumference" value={result.bust_circumference_cm} />
              )}
            </div>

            <div className="mt-6 space-y-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setResult(null)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg"
              >
                Finish update
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => nav(-1)}
                className="w-full py-3 rounded-xl bg-white/20 text-white font-semibold shadow-lg"
              >
                Back
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
