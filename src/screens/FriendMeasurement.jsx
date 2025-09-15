// // FriendMeasurement.jsx
// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// export default function FriendMeasurement({ onBack }) {
//   const [showPermission, setShowPermission] = useState(true);
//   const [showVideo, setShowVideo] = useState(false);
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Handle permission selection
//   const handlePermission = () => {
//     setShowPermission(false);
//     setShowVideo(true);
//   };

//   // Start camera
//   const startCamera = async () => {
//     setShowVideo(false);
//     setShowCamera(true);

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user" }, // front camera
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (err) {
//       console.error("Camera access denied:", err);
//     }
//   };

//   // Capture photo
//   const capturePhoto = () => {
//     const context = canvasRef.current.getContext("2d");
//     context.drawImage(videoRef.current, 0, 0, 400, 300);
//     const imageData = canvasRef.current.toDataURL("image/png");

//     // Save to localStorage
//     localStorage.setItem("capturedImage", imageData);
//     setCapturedImage(imageData);

//     // Stop camera stream
//     const stream = videoRef.current.srcObject;
//     const tracks = stream.getTracks();
//     tracks.forEach((track) => track.stop());
//   };

//   return (
//     <div className="relative min-h-screen text-white">
//       {/* Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url('/bg-pattern.png')" }}
//       />
//       <div className="absolute inset-0 bg-blue-900/70" />

//       {/* Content */}
//       <div className="relative z-10 px-6 pt-12">
//         <button onClick={onBack} className="mb-6">
//           <ArrowBackIcon className="text-white" />
//         </button>

//         {/* Permission Popup */}
//         {showPermission && (
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
//           >
//             <div className="bg-black/80 text-white rounded-2xl p-6 w-80 text-center space-y-4">
//               <div className="text-4xl">📷</div>
//               <p className="text-sm">
//                 Allow <span className="font-bold">Abody.ai</span> to take
//                 pictures and record video?
//               </p>
//               <div className="space-y-2">
//                 <button
//                   className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
//                   onClick={handlePermission}
//                 >
//                   While using the app
//                 </button>
//                 <button
//                   className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
//                   onClick={handlePermission}
//                 >
//                   Only this time
//                 </button>
//                 <button
//                   className="w-full py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
//                   onClick={() => setShowPermission(false)}
//                 >
//                   Don’t allow
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Video Instructions Screen */}
//         {showVideo && (
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6"
//           >
//             <h1 className="text-2xl font-bold">How it works</h1>
//             <p className="opacity-80">
//               Follow our instructions below to get highest accuracy of your
//               measurements.
//             </p>

//             {/* Demo Video */}
//             <div className="rounded-xl overflow-hidden border border-white/20 shadow-lg">
//               <video
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="w-full"
//                 controls
//                 src="https://video.wixstatic.com/video/112f4b_628d3bd40f4c41d596b78133214704b1/720p/mp4/file.mp4"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-center space-x-4 pt-4">
//               <button className="px-6 py-2 rounded-full bg-purple-500 hover:bg-purple-600">
//                 Setup
//               </button>
//               <button
//                 className="px-6 py-2 rounded-full bg-purple-500 hover:bg-purple-600"
//                 onClick={startCamera}
//               >
//                 Get Measured
//               </button>
//             </div>
//           </motion.div>
//         )}

//         {/* Camera Screen */}
//         {showCamera && (
//           <div className="flex flex-col items-center space-y-4">
//             <h2 className="text-lg font-semibold">Instructions</h2>
//             <ul className="text-sm opacity-90 list-disc list-inside text-left">
//               <li>Stand straight in front of the camera.</li>
//               <li>Ensure your full body is visible.</li>
//               <li>Good lighting improves accuracy.</li>
//             </ul>

//             {/* Live Camera */}
//             <div className="relative w-[400px] h-[300px] border-2 border-white rounded-lg overflow-hidden">
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 playsInline
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Capture Button */}
//             <button
//               onClick={capturePhoto}
//               className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg"
//             >
//               <div className="w-12 h-12 bg-red-500 rounded-full"></div>
//             </button>

//             {/* Hidden canvas for capturing */}
//             <canvas ref={canvasRef} width="400" height="300" hidden />

//             {/* Show Captured Image */}
//             {capturedImage && (
//               <div className="mt-4">
//                 <h3 className="text-sm font-semibold">Captured Image:</h3>
//                 <img
//                   src={capturedImage}
//                   alt="Captured"
//                   className="mt-2 w-40 rounded-lg border"
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// src/screens/FriendMeasurement.jsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import MeasurementCamera from "./MeasurementCamera";
// import { useNavigate } from "react-router-dom";

// export default function FriendMeasurement({ onBack }) {
//   const nav = useNavigate();
//   const [showPermission, setShowPermission] = useState(true);
//   const [showVideo, setShowVideo] = useState(false);
//   const [openCamera, setOpenCamera] = useState(false);

//   const handlePermission = () => {
//     setShowPermission(false);
//     setShowVideo(true);
//   };

//   const handleOpenCamera = () => {
//     setShowVideo(false);
//     setOpenCamera(true);
//   };

//   if (openCamera) {
//     return (
//       <MeasurementCamera
//         onBack={() => setOpenCamera(false)}
//         onSaved={() => setOpenCamera(false)}
//       />
//     );
//   }

//   return (
//     <div className="relative min-h-screen text-white">
//       {/* Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url('/bg-pattern.png')" }}
//       />
//       <div className="absolute inset-0 bg-blue-900/70" />

//       {/* Content */}
//       <div className="relative z-10 px-6 pt-12">
//         <button onClick={onBack} className="mb-6">
//           <ArrowBackIcon className="text-white" />
//         </button>

//         {/* Permission Popup */}
//         {showPermission && (
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
//           >
//             <div className="bg-black/80 text-white rounded-2xl p-6 w-80 text-center space-y-4">
//               <div className="text-4xl">📷</div>
//               <p className="text-sm">
//                 Allow <span className="font-bold">Body.ai</span> to take
//                 pictures?
//               </p>
//               <div className="space-y-2">
//                 <button
//                   className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
//                   onClick={handlePermission}
//                 >
//                   While using the app
//                 </button>
//                 <button
//                   className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
//                   onClick={handlePermission}
//                 >
//                   Only this time
//                 </button>
//                 <button
//                   className="w-full py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
//                   // onClick={() => setShowPermission(false)}
//                   onClick={() => nav("/home")}
//                 >
//                   Don’t allow
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Video Instructions */}
//         {showVideo && (
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6"
//           >
//             <h1 className="text-2xl font-bold">How it works</h1>
//             <p className="opacity-80">
//               Follow our instructions below to get highest accuracy of your
//               measurements.
//             </p>

//             {/* Demo Video */}
//             <div className="rounded-xl overflow-hidden border border-white/20 shadow-lg">
//               <video
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="w-full"
//                 controls
//                 src="../../public/video.mp4"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-center space-x-4 pt-4">
//               {/* <button className="px-6 py-2 rounded-full bg-purple-500 hover:bg-purple-600">
//                 Setup
//               </button> */}
//               <button
//                 className="px-6 py-2 rounded-full bg-purple-500 hover:bg-purple-600"
//                 onClick={handleOpenCamera}
//               >
//                 Get Measured
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/screens/FriendMeasurement.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function FriendMeasurement({ onBack }) {
  const nav = useNavigate();
  const [showPermission, setShowPermission] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const handlePermission = () => {
    setShowPermission(false);
    setShowVideo(true);
  };

  const handleOpenCamera = () => {
    // navigate to front-capture route which uses MeasurementCamera(mode="front")
    nav("/front-capture");
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-pattern.png')" }}
      />
      <div className="absolute inset-0 bg-blue-900/70" />

      {/* Content */}
      <div className="relative z-10 px-6 pt-12">
        <button onClick={onBack} className="mb-6">
          <ArrowBackIcon className="text-white" />
        </button>

        {/* Permission Popup */}
        {showPermission && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <div className="bg-black/80 text-white rounded-2xl p-6 w-80 text-center space-y-4">
              <div className="text-4xl">📷</div>
              <p className="text-sm">
                Allow <span className="font-bold">Body.ai</span> to take pictures?
              </p>
              <div className="space-y-2">
                <button
                  className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
                  onClick={handlePermission}
                >
                  While using the app
                </button>
                <button
                  className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
                  onClick={handlePermission}
                >
                  Only this time
                </button>
                <button
                  className="w-full py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
                  onClick={() => nav("/home")}
                >
                  Don’t allow
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Video Instructions */}
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-2xl font-bold">How it works</h1>
            <p className="opacity-80">
              Follow our instructions below to get highest accuracy of your
              measurements.
            </p>

            {/* Demo Video */}
            <div className="rounded-xl overflow-hidden border border-white/20 shadow-lg">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full"
                controls
                src="../../public/video.mp4"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 pt-4">
              <button
                className="px-6 py-2 rounded-full bg-purple-500 hover:bg-purple-600"
                onClick={handleOpenCamera}
              >
                Get Measured
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

