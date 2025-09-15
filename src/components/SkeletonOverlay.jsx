// src/components/SkeletonOverlay.jsx
import React, { useRef, useEffect } from "react";
import * as posedetection from "@tensorflow-models/pose-detection";

export default function SkeletonOverlay({ pose, videoWidth, videoHeight, step }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = videoWidth || 640;
    canvas.height = videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw translucent silhouette guide depending on step
    ctx.save();
    ctx.fillStyle = "rgba(16,185,129,0.06)";
    const guidePad = 40;
    if (step === "front") {
      // centered tall rectangle as rough full-body guide
      ctx.fillRect(canvas.width * 0.18, canvas.height * 0.05, canvas.width * 0.64, canvas.height * 0.9);
    } else if (step === "side") {
      // narrow vertical guide (side posture)
      ctx.fillRect(canvas.width * 0.35, canvas.height * 0.05, canvas.width * 0.28, canvas.height * 0.9);
    } else if (step === "back") {
      ctx.fillRect(canvas.width * 0.18, canvas.height * 0.05, canvas.width * 0.64, canvas.height * 0.9);
    }
    ctx.restore();

    // draw pose keypoints
    if (pose && pose.keypoints) {
      const keypoints = pose.keypoints;
      // points
      ctx.fillStyle = "#10B981";
      ctx.strokeStyle = "#06B6D4";
      ctx.lineWidth = 2;
      keypoints.forEach((kp) => {
        if (kp.score > 0.35) {
          ctx.beginPath();
          ctx.arc(kp.x, kp.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // skeleton lines using posedetection util
      const adjacentPairs = posedetection.util.getAdjacentPairs(posedetection.SupportedModels.BlazePose);
      ctx.strokeStyle = "#06B6D4";
      ctx.lineWidth = 2.2;
      adjacentPairs.forEach(([i, j]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];
        if (kp1 && kp2 && kp1.score > 0.35 && kp2.score > 0.35) {
          ctx.beginPath();
          ctx.moveTo(kp1.x, kp1.y);
          ctx.lineTo(kp2.x, kp2.y);
          ctx.stroke();
        }
      });
    }
  }, [pose, videoWidth, videoHeight, step]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />;
}
