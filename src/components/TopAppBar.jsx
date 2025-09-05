import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SearchRounded from '@mui/icons-material/SearchRounded'
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded'
import { useLocation, useNavigate } from 'react-router-dom'

export default function TopAppBar({ title, onSearch }) {
  const nav = useNavigate()
  const loc = useLocation()
  const canBack = loc.pathname !== '/' && loc.pathname !== '/home'

  return (
    <AppBar position="fixed" color="transparent" elevation={0} className="backdrop-blur bg-opacity-60 bg-black">
      <Toolbar className="px-3">
        {canBack ? (
          <IconButton edge="start" onClick={() => nav(-1)} aria-label="Back">
            <ArrowBackRounded />
          </IconButton>
        ) : (
          <div className="w-10" />
        )}
        <Typography variant="h6" className="font-semibold flex-1 text-center">{title}</Typography>
        <IconButton edge="end" onClick={onSearch} aria-label="Search">
          <SearchRounded />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
