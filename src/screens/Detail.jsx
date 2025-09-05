import React from 'react'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TopAppBar from '../components/TopAppBar'
import { useParams, useNavigate } from 'react-router-dom'
import { items } from '../data/mock'

export default function Detail() {
  const { id } = useParams()
  const nav = useNavigate()
  const item = items.find(i => i.id === id)

  if (!item) return <div className="p-6 pt-24">Not found.</div>

  return (
    <div className="pb-6">
      <TopAppBar title="Details" />
      <div className="pt-20 p-4 space-y-4">
        <Paper className="p-4 rounded-2xl space-y-2">
          <div className="text-xl font-semibold">{item.title}</div>
          <div className="text-neutral-400">{item.subtitle}</div>
          <Chip label={item.status} />
        </Paper>
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={() => nav('/edit/'+item.id)} fullWidth variant="outlined">Edit</Button>
          <Button color="error" variant="contained">Delete</Button>
        </div>
      </div>
    </div>
  )
}
