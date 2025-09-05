import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import TopAppBar from '../components/TopAppBar'
import BottomBar from '../components/BottomBar'
import { items } from '../data/mock'
import { useNavigate } from 'react-router-dom'

export default function ListScreen() {
  const nav = useNavigate()
  return (
    <div className="pb-28">
      <TopAppBar title="Items" />
      <div className="pt-20">
        <List>
          {items.map((i, idx) => (
            <React.Fragment key={i.id}>
              <ListItem button onClick={() => nav('/detail/' + i.id)}>
                <ListItemText primary={i.title} secondary={i.subtitle} />
              </ListItem>
              {idx < items.length-1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </div>
      <BottomBar />
    </div>
  )
}
