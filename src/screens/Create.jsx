import React from 'react'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import TopAppBar from '../components/TopAppBar'

export default function Create() {
  const [form, setForm] = React.useState({ title: '', subtitle: '' })
  const onChange = (k, v) => setForm({ ...form, [k]: v })

  return (
    <div className="pb-6">
      <TopAppBar title="Create" />
      <div className="pt-20 p-4">
        <Paper className="p-4 rounded-2xl space-y-3">
          <TextField label="Title" fullWidth value={form.title} onChange={e=>onChange('title', e.target.value)} />
          <TextField label="Subtitle" fullWidth value={form.subtitle} onChange={e=>onChange('subtitle', e.target.value)} />
          <Button fullWidth>Create</Button>
        </Paper>
      </div>
    </div>
  )
}
