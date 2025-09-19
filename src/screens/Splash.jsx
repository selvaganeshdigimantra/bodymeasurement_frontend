import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import logo from '../../public/logo.png';

export default function Splash() {
  const nav = useNavigate()
  React.useEffect(() => {
    const t = setTimeout(() => nav('/home'), 2000)
    return () => clearTimeout(t)
  }, [nav])

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-black">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-center"
      >
        <div className="text-5xl font-black tracking-tight">AI</div>
        <div className="mt-2 text-neutral-400">Body Measurement App</div>
        <div>
  <img src={logo} alt="Logo" />
</div>
      </motion.div>
    </div>
  )
}
