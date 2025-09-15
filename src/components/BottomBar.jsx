import React from 'react'
import Paper from '@mui/material/Paper'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import HomeRounded from '@mui/icons-material/HomeRounded'
// import ListAltRounded from '@mui/icons-material/ListAltRounded'
// import AddCircleRounded from '@mui/icons-material/AddCircleRounded'
// import NotificationsRounded from '@mui/icons-material/NotificationsRounded'
import PersonRounded from '@mui/icons-material/PersonRounded'
import { useNavigate, useLocation } from 'react-router-dom'

export default function BottomBar() {
  const nav = useNavigate()
  const loc = useLocation()
  const value = ['/home','/profile'].indexOf(loc.pathname)

  return (
    <Paper elevation={8} className="fixed bottom-0 left-0 right-0 rounded-t-2xl overflow-hidden" sx={{ pb: 'calc(env(safe-area-inset-bottom))' }}>
      <BottomNavigation
        showLabels
        value={value < 0 ? 0 : value}
        onChange={(e, idx) => {
          const map = ['/home','/profile']
          nav(map[idx] || '/home')
        }}
      >
        <BottomNavigationAction icon={<HomeRounded />} />
        {/* <BottomNavigationAction icon={<ListAltRounded />} /> */}
        {/* <BottomNavigationAction icon={<AddCircleRounded />} /> */}
        {/* <BottomNavigationAction icon={<NotificationsRounded />} /> */}
        <BottomNavigationAction icon={<PersonRounded />} />
      </BottomNavigation>
    </Paper>
  )
}
