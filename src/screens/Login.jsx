import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import { auth, provider, signInWithPopup, signInWithEmailAndPassword } from '../../src/firebase'
import GoogleIcon from '@mui/icons-material/Google'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // 🔹 Manual Email/Password login
const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 👉 First check if it's the hardcoded credentials
    if (email === "selva@gmail.com" && password === "Selva@123") {
      const user = { email, displayName: "Selvaganesh (Local User)" }
      localStorage.setItem("user", JSON.stringify(user))
      nav('/home')
      return;
    }

    // 👉 Otherwise, try Firebase auth
    const result = await signInWithEmailAndPassword(auth, email, password)
    const user = result.user
    localStorage.setItem("user", JSON.stringify(user))
    nav('/home')

  } catch (err) {
    console.error("Manual login failed:", err)
    alert("Invalid email or password")
  } finally {
    setLoading(false)
  }
}

  // 🔹 Google login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      localStorage.setItem("user", JSON.stringify(user))
      nav('/home')
    } catch (err) {
      console.error("Google login failed:", err)
      alert("Login failed, try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/background.jpg')" }} // 🔹 same as home page
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <Paper 
        className="w-full max-w-sm p-8 rounded-2xl space-y-5 shadow-2xl relative z-10"
        style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
      >
        <div className="text-2xl font-bold text-center text-white">Welcome back</div>
        
        {/* Manual Login Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <TextField 
            label="Email" 
            fullWidth 
            required 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "#ccc" } }}
          />
          <TextField 
            label="Password" 
            fullWidth 
            required 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "#ccc" } }}
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained"
            style={{ backgroundColor: "#1976d2", color: "#fff", fontWeight: "bold" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="flex items-center justify-center text-gray-300">
          <span>OR</span>
        </div>

        {/* Google Login Button */}
        <Button
          onClick={handleGoogleLogin}
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          style={{ color: "white", borderColor: "white" }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Continue with Google"}
        </Button>
      </Paper>
    </div>
  )
}
