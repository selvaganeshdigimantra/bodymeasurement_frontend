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
    e.preventDefault()
    try {
      setLoading(true)
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
    <div className="min-h-screen p-5 flex items-center justify-center">
      <Paper className="w-full max-w-sm p-6 rounded-2xl space-y-4 shadow-lg">
        <div className="text-xl font-semibold text-center">Welcome back</div>
        
        {/* Manual Login Form */}
        <form onSubmit={onSubmit} className="space-y-3">
          <TextField 
            label="Email" 
            fullWidth 
            required 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <TextField 
            label="Password" 
            fullWidth 
            required 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="flex items-center justify-center">
          <span className="text-gray-500">OR</span>
        </div>

        {/* Google Login Button */}
        <Button
          onClick={handleGoogleLogin}
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Continue with Google"}
        </Button>
      </Paper>
    </div>
  )
}
