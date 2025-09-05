import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6750A4' },
    background: { default: '#0b0b0f', paper: '#121217' }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true, variant: 'contained' },
      styleOverrides: {
        root: { borderRadius: '1rem', textTransform: 'none' }
      }
    }
  }
})

export default theme
