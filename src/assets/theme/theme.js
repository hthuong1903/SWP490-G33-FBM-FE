import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    background: {
      default: '#efefef'
    },
    primary: {
      main: '#e68656',
      light: '#eeb090',
      dark: '#e4804e',
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
})
