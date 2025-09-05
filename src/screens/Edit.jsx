import React from 'react'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import TopAppBar from '../components/TopAppBar'
import { useParams } from 'react-router-dom'
import { items } from '../data/mock'

export default function Edit() {
  const { id } = useParams()
  const base = items.find(i => i.id === id) || { title: '', subtitle: '' }
  const [form, setForm] = React.useState({ title: base.title, subtitle: base.subtitle })
  const onChange = (k, v) => setForm({ ...form, [k]: v })

  return (
    <div className="pb-6">
      <TopAppBar title="Edit" />
      <div className="pt-20 p-4">
        <Paper className="p-4 rounded-2xl space-y-3">
          <TextField label="Title" fullWidth value={form.title} onChange={e=>onChange('title', e.target.value)} />
          <TextField label="Subtitle" fullWidth value={form.subtitle} onChange={e=>onChange('subtitle', e.target.value)} />
          <Button fullWidth>Save</Button>
        </Paper>
      </div>
    </div>
  )
}
