// import React from 'react'
// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import Chip from '@mui/material/Chip'
// import { useNavigate } from 'react-router-dom'
// import TopAppBar from '../components/TopAppBar'
// import BottomBar from '../components/BottomBar'
// import SearchSheet from '../components/SearchSheet'
// import { items } from '../data/mock'

// export default function Home() {
//   const nav = useNavigate()
//   const [open, setOpen] = React.useState(false)

//   return (
//     <div className="pb-28">
//       <TopAppBar title="Home" onSearch={() => setOpen(true)} />
//       <div className="pt-20 px-4 space-y-3">
//         {items.map(i => (
//           <Card key={i.id} onClick={() => nav('/detail/' + i.id)} className="rounded-2xl bg-neutral-900">
//             <CardContent className="flex items-center justify-between">
//               <div>
//                 <div className="font-semibold">{i.title}</div>
//                 <div className="text-sm text-neutral-400">{i.subtitle}</div>
//               </div>
//               <Chip label={i.status} color="primary" variant="outlined" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//       <BottomBar />
//       <SearchSheet open={open} onClose={() => setOpen(false)} onPick={(r) => { setOpen(false); nav('/detail/'+r.id) }} />
//     </div>
//   )
// }




import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import { useNavigate } from 'react-router-dom'
import TopAppBar from '../components/TopAppBar'
import BottomBar from '../components/BottomBar'
import SearchSheet from '../components/SearchSheet'
import { items } from '../data/mock'
import { motion } from 'framer-motion'

export default function Home() {
  const nav = useNavigate()
  const [open, setOpen] = React.useState(false)

  const getChipColor = (status) => {
    switch (status) {
      case 'Open': return 'success'
      case 'Paused': return 'warning'
      case 'Done': return 'info'
      default: return 'default'
    }
  }

  return (
    <div className="pb-28">
      <div className="flex items-center justify-center min-h-screen text-3xl font-bold">
      🎉 Welcome to Dashboard
      </div>
      {/* <TopAppBar title="Home" onSearch={() => setOpen(true)} />
      <div className="pt-20 px-4 space-y-4">
        {items.map((i, idx) => (
          <motion.div
            key={i.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card 
              onClick={() => nav('/detail/' + i.id)} 
              className="rounded-3xl bg-white/20 backdrop-blur-md shadow-lg border border-white/30"
            >
              <CardContent className="flex items-center justify-between text-white">
                <div>
                  <div className="font-bold text-lg">{i.title}</div>
                  <div className="text-sm opacity-80">{i.subtitle}</div>
                </div>
                <Chip label={i.status} color={getChipColor(i.status)} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div> */}
      <BottomBar />
      {/* <SearchSheet open={open} onClose={() => setOpen(false)} onPick={(r) => { setOpen(false); nav('/detail/'+r.id) }} /> */}
    </div>
  )
}

