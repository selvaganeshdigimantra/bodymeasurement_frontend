// import React, { useState } from "react";
// import FriendMeasurement from "./FriendMeasurement";
// import { motion } from "framer-motion"; 
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// export default function BodyMeasurements({ onBack }) {
//   const [friendMode, setFriendMode] = useState(false);

//   if (friendMode) {
//     return <FriendMeasurement onBack={() => setFriendMode(false)} />;
//   }

//   return (
//     <div className="relative min-h-screen flex flex-col">
//       {/* Background image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/bg-pattern.png')", // same as Home
//         }}
//       />

//       {/* Blue overlay */}
//       <div className="absolute inset-0 bg-blue-600/70" />

//       {/* Content */}
//       <div className="relative z-10 flex-1 px-6 pt-10 pb-6 overflow-y-auto">
//         {/* Header with back button */}
//         <div className="flex items-center space-x-3 mb-6">
//           <button
//             onClick={() => nav(-1)}
//             className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
//           >
//             <ArrowBackIosNewIcon className="text-white" fontSize="small" />
//           </button>
//           <h1 className="text-white text-xl font-bold">Body Measurements</h1>
//         </div>

//         {/* Intro text */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-white space-y-4 leading-relaxed"
//         >
//           <h2 className="text-lg font-semibold">Introduction</h2>
//           <p className="text-white/90">
//             Taking your measurements is a better way to track progress because
//             you get an idea of what's really happening with your body. Knowing
//             how to take body measurements with <b>Abody.ai</b> app is a valuable
//             tool if you are trying to change your body composition by losing fat
//             and/or adding muscle.
//           </p>
//         </motion.div>
//       </div>

//       {/* Buttons */}
//       <div className="relative z-10 px-6 pb-10 space-y-3">
//         <motion.button
//           whileTap={{ scale: 0.97 }}
//           className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg"
//         >
//           Get Measured by Yourself
//         </motion.button>

//         <motion.button
//           whileTap={{ scale: 0.97 }}
//           className="w-full py-3 rounded-xl bg-teal-400 text-white font-semibold shadow-lg"
//           onClick={() => setFriendMode(true)}
//         >
//           Get Measured by a Friend
//         </motion.button>
//       </div>
//     </div>
//   );
// }

// src/screens/Measurement.jsx
import React, { useState } from "react";
import FriendMeasurement from "./FriendMeasurement";
import { motion } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

export default function BodyMeasurements({ onBack }) {
  const nav = useNavigate();
  const [friendMode, setFriendMode] = useState(false);

  if (friendMode) {
    return <FriendMeasurement onBack={() => setFriendMode(false)} />;
  }

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
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <ArrowBackIosNewIcon className="text-white" onClick={()=> nav("/home")} fontSize="small" />
          </button>
          <h1 className="text-white text-xl font-bold">Body Measurements</h1>
        </div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white space-y-4 leading-relaxed"
        >
          <h2 className="text-lg font-semibold">Introduction</h2>
          <p className="text-white/90">
            Taking your measurements is a better way to track progress because
            you get an idea of what's really happening with your body. Knowing
            how to take body measurements with <b>Body.ai</b> app is a valuable
            tool if you are trying to change your body composition by losing fat
            and/or adding muscle.
          </p>
          <p className="text-white/90">
            From consumers, perspective, shoppers are increasingly aware of their role in circular fashion. Our solution provides you informed choices on their sizes for purchase decisions. Once the fit concern is removed, the growth of loyal consumers for brands and retailers consequently follows in ethical direction.
          </p>
        </motion.div>
      </div>

      {/* Buttons */}
      <div className="relative z-10 px-6 pb-10 space-y-3">
        {/* <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg"
        >
          Get Measured by Yourself
        </motion.button> */}

        <motion.button
  whileTap={{ scale: 0.97 }}
  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg"
  // onClick={() => nav("/front-capture")} 
  onClick={() => setFriendMode(true)}
>
  Get Measured Together
</motion.button>
      </div>               
    </div>
  );
}

