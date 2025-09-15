// src/screens/MeasurementCamera.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import * as posedetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { ImCamera } from "react-icons/im";

/*
  Props:
    - onBack  (optional) : callback for back action
    - mode = "front" | "side" (default: "front")
*/
export default function MeasurementCamera({ onBack, mode = "front" }) {
  const nav = useNavigate();
  const webcamRef = useRef(null);
  const detectorRef = useRef(null);
  const rafRef = useRef(null);

  const [loadingModel, setLoadingModel] = useState(true);
  const [accuracy, setAccuracy] = useState(0);
  const [captured, setCaptured] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Same threshold you used
  const ACC_THRESHOLD = 60;

  // Instruction texts (match your screenshots)
  const instructionText =
    mode === "front"
      ? "Adjust the angle number on screen to 90-degree"
      : "Raise your arm extended out to your side at 15 degrees. Palm down";

  // Top title
  const titleText = mode === "front" ? "POSTURE 1/2" : "POSTURE 2/2";

  // Load MoveNet detector (same as your original code)
  useEffect(() => {
    let mounted = true;
    const setup = async () => {
      try {
        await tf.setBackend("webgl");
        const detector = await posedetection.createDetector(
          posedetection.SupportedModels.MoveNet,
          { modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
        );
        detectorRef.current = detector;
        if (mounted) setLoadingModel(false);
        startLoop();
      } catch (err) {
        console.error("Pose detector load failed", err);
        if (mounted) setLoadingModel(false);
      }
    };
    setup();
    return () => {
      mounted = false;
      stopLoop();
      if (detectorRef.current?.dispose) detectorRef.current.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startLoop = () => {
    const run = async () => {
      await detectPose();
      rafRef.current = requestAnimationFrame(run);
    };
    if (!rafRef.current) rafRef.current = requestAnimationFrame(run);
  };
  const stopLoop = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const detectPose = useCallback(async () => {
    const video = webcamRef.current?.video;
    const detector = detectorRef.current;
    if (!video || !detector || video.readyState < 2) return;

    try {
      const poses = await detector.estimatePoses(video);
      if (!poses?.length) {
        setAccuracy(0);
        return;
      }
      const pose = poses[0];
      const score = computeAccuracyScore(pose);
      setAccuracy(score);
    } catch (err) {
      console.error("detectPose error", err);
    }
  }, []);

  const computeAccuracyScore = (pose) => {
    const keypoints = pose.keypoints || [];
    const confident = keypoints.filter((k) => k.score > 0.5).length;
    const base = Math.min(80, Math.round((confident / keypoints.length) * 80));
    return Math.min(99, base + Math.round((pose.score || 0) * 10));
  };

  const handleCapture = async () => {
    if (!webcamRef.current) return;
    setProcessing(true);
    try {
      const image = webcamRef.current.getScreenshot();
      if (!image) throw new Error("capture failed");

      // Save captured object in state (image + accuracy + timestamp)
      const obj = {
        image,
        accuracy,
        date: new Date().toISOString(),
      };
      setCaptured(obj);
    } catch (err) {
      console.error("capture error", err);
    } finally {
      setProcessing(false);
    }
  };

  const handleDone = () => {
    if (!captured) return;

    // Store JSON string so review can validate accuracy too
    if (mode === "front") {
      localStorage.setItem("frontImage", JSON.stringify(captured));
      // stop detection loop before navigation
      stopLoop();
      nav("/side-capture");
    } else if (mode === "side") {
      localStorage.setItem("sideImage", JSON.stringify(captured));
      stopLoop();
      nav("/review-capture");
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Top-left close (circle X) */}
      <button
        onClick={() => {
          stopLoop();
          if (typeof onBack === "function") onBack();
          else nav("/measurements");
        }}
        className="absolute left-4 top-6 z-40 bg-white/20 w-10 h-10 rounded-full flex items-center justify-center"
        aria-label="Close"
      >
        <span style={{ fontSize: 18, color: "white", lineHeight: 0 }}>✕</span>
      </button>

      {/* Title & instruction (top center) */}
      <div className="absolute top-6 left-0 right-0 z-30 flex flex-col items-center pointer-events-none">
        <div className="text-sm tracking-widest">{titleText}</div>
        <div className="text-center text-xs px-6 mt-2 opacity-90">{instructionText}</div>
      </div>

      {/* Webcam (full screen) */}
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Silhouette overlay (front.png / side.png must be in public folder) */}
      <img
        src={mode === "front" ? "/front.png" : "/side.png"}
        alt="silhouette"
        className="absolute inset-0 m-auto w-[60%] md:w-[50%] h-auto opacity-90 z-30 pointer-events-none"
        style={{ mixBlendMode: "normal" }}
      />

      {/* Accuracy counter or Capture button (bottom center) */}
      {!captured && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 z-40">
          {accuracy < ACC_THRESHOLD ? (
            // circular accuracy display
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center border-2 border-slate-400">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-2xl font-semibold">
                {accuracy}
              </div>
            </div>
          ) : (
            // camera capture button (white with camera icon)
            <button
              disabled={processing}
              onClick={handleCapture}
              className="w-20 h-20 rounded-full flex items-center justify-center border-4 bg-white shadow-lg"
              aria-label="Capture"
            >
              <ImCamera className="text-sky-700" size={34} />
            </button>
          )}
        </div>
      )}

      {/* Captured Preview overlay */}
      {captured && (
        <div className="absolute inset-0 bg-black/85 z-50 flex flex-col items-center justify-center p-6">
          <div className="bg-white/5 rounded-lg p-3">
            <img
              src={captured.image}
              alt="captured"
              className="w-72 rounded-md shadow-lg object-cover"
            />
          </div>

          <div className="mt-4 text-white text-center">
            <div>Accuracy: <strong>{captured.accuracy}</strong></div>
            <div className="text-sm opacity-80">{new Date(captured.date).toLocaleString()}</div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              className="px-4 py-2 rounded-md bg-white text-black"
              onClick={() => {
                setCaptured(null);
                // resume loop
                startLoop();
              }}
            >
              Retake
            </button>

            <button
              className="px-4 py-2 rounded-md bg-green-500 text-white"
              onClick={handleDone}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Loading model spinner */}
      {loadingModel && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 text-white/90 p-3 rounded-md bg-black/60">
          <Circles height="100" width="100" color="#ffffffff" ariaLabel="loading" />
        </div>
      )}
    </div>
  );
}
