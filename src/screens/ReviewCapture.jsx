// src/screens/ReviewCapture.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewCapture() {
  const navigate = useNavigate();

  // stored as JSON strings { image, accuracy, date }
  const frontRaw = localStorage.getItem("frontImage");
  const sideRaw = localStorage.getItem("sideImage");

  const front = useMemo(() => {
    try { return frontRaw ? JSON.parse(frontRaw) : null; } catch { return null; }
  }, [frontRaw]);

  const side = useMemo(() => {
    try { return sideRaw ? JSON.parse(sideRaw) : null; } catch { return null; }
  }, [sideRaw]);

  // validation thresholds
  const MIN_DETECTED_ACC = 10; // if accuracy below this, we treat as "no person"
  const frontOk = front && front.accuracy >= MIN_DETECTED_ACC && front.image;
  const sideOk = side && side.accuracy >= MIN_DETECTED_ACC && side.image;

  const anyMissing = !frontOk || !sideOk;

  const handleRetry = () => {
    // clear and start again
    localStorage.removeItem("frontImage");
    localStorage.removeItem("sideImage");
    navigate("/front-capture");
  };

  const handleFinish = () => {
    // store to measure_history (optional) and go home
    // Save to measure_history as two entries (front + side)
    try {
      const existing = JSON.parse(localStorage.getItem("measure_history") || "[]");
      if (front) existing.unshift({ id: Date.now()+1, date: front.date, image: front.image, accuracy: front.accuracy, source: "friend-measure-front" });
      if (side) existing.unshift({ id: Date.now()+2, date: side.date, image: side.image, accuracy: side.accuracy, source: "friend-measure-side" });
      localStorage.setItem("measure_history", JSON.stringify(existing));
    } catch (e) {
      console.warn("measure_history storage failed", e);
    }

    navigate("/measurement-form");
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-white relative pb-10" style={{
      background: "linear-gradient(180deg,#3b82f6 0%, #7c3aed 100%)"
    }}>
      {/* Close */}
      <button
        onClick={() => {
          // go home and clear temp images
          localStorage.removeItem("frontImage");
          localStorage.removeItem("sideImage");
          navigate("/home");
        }}
        className="absolute left-4 top-6 bg-white/20 w-10 h-10 rounded-full flex items-center justify-center"
      >
        <span style={{ color: "white", fontSize: 18 }}>✕</span>
      </button>

      <h1 className="mt-7 text-2xl font-semibold">Review</h1>
      <p className="max-w-xl text-center mt-2 px-6 text-sm">
        Please check your postures, censoring faces and your clothing to make sure they look like model
      </p>

      {/* Grid with two rows */}
      <div className="w-full max-w-3xl px-6 mt-4 grid grid-cols-1 gap-5">
        {/* Row 1 - Front */}
        <div className="flex items-center justify-between gap-5">
          <div className="w-1/2 flex justify-center">
            {front?.image ? (
              <img src={front.image} alt="front-captured" className="w-56 h-80 object-cover rounded shadow-lg" />
            ) : (
              <div className="w-56 h-80 bg-black/30 rounded flex items-center justify-center">No front image</div>
            )}
          </div>

          <div className="w-1/2 relative flex flex-col items-center">
            <img src="/front.png" alt="front-silhouette" className="w-56 h-80 object-cover rounded shadow-lg" />
            {frontOk ? (
              <div className="absolute left-4 bottom-6 bg-green-500 rounded-full p-1 text-white text-xs">✓</div>
            ) : (
              <div className="absolute left-4 bottom-6 bg-red-500 rounded-full p-1 text-white text-xs">!</div>
            )}
          </div>
        </div>

        {/* Row 2 - Side */}
        <div className="flex items-center justify-between gap-5">
          <div className="w-1/2 flex justify-center">
            {side?.image ? (
              <img src={side.image} alt="side-captured" className="w-56 h-80 object-cover rounded shadow-lg" />
            ) : (
              <div className="w-56 h-80 bg-black/30 rounded flex items-center justify-center">No side image</div>
            )}
          </div>

          <div className="w-1/2 relative flex flex-col items-center">
            <img src="/side.png" alt="side-silhouette" className="w-56 h-80 object-cover rounded shadow-lg" />
            {sideOk ? (
              <div className="absolute left-4 bottom-6 bg-green-500 rounded-full p-1 text-white text-xs">✓</div>
            ) : (
              <div className="absolute left-4 bottom-6 bg-red-500 rounded-full p-1 text-white text-xs">!</div>
            )}
          </div>
        </div>
      </div>

      {/* Red error badge if any missing/bad */}
      {anyMissing && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 z-50">
          <div className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg text-center max-w-sm">
            <div><strong>There is nobody in your photos!</strong></div>
            <div className="text-sm mt-1">Please capture again!</div>
          </div>
        </div>
      )}

      {/* Bottom action button */}
      <div className="w-full max-w-3xl px-6 fixed bottom-2 left-0 right-0 mx-auto flex justify-center">
        {anyMissing ? (
          <button
            onClick={handleRetry}
            className="bg-green-600 px-6 py-3 rounded-full text-white font-semibold"
          >
            Get Measured again!
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="bg-green-600 px-6 py-3 rounded-full text-white font-semibold"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
