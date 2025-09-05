import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TopAppBar from '../components/TopAppBar'
import BottomBar from '../components/BottomBar'
import { notifications } from '../data/mock'

export default function Notifications() {
  return (
    <div className="pb-28">
      <TopAppBar title="Notifications" />
      <div className="pt-20">
        <List>
          {notifications.map(n => (
            <ListItem key={n.id}>
              <ListItemText primary={n.title} secondary={n.body} />
            </ListItem>
          ))}
        </List>
      </div>
      <BottomBar />
    </div>
  )
}
