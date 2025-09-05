import React from 'react'
import Drawer from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { items } from '../data/mock'

export default function SearchSheet({ open, onClose, onPick }) {
  const [q, setQ] = React.useState('')
  const results = items.filter(i => (i.title + ' ' + i.subtitle).toLowerCase().includes(q.toLowerCase()))

  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <div className="bg-neutral-900 min-h-[70vh] p-4 pt-10">
        <TextField
          fullWidth
          autoFocus
          variant="filled"
          label="Search"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <List>
          {results.map(r => (
            <ListItem button key={r.id} onClick={() => onPick(r)}>
              <ListItemText primary={r.title} secondary={r.subtitle} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )
}
