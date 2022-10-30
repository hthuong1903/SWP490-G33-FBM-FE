import { createTheme } from '@mui/material'

export const theme = createTheme({
    palette: {
        background: {
            default: '#efefef'
        },
        common: { lightOrange: 'RGB(247, 218, 204)' },
        primary: {
            main: '#e68656',
            light: '#e68656',
            dark: '#e4804e',
            contrastText: '#fff'
        },
        action: {
            selected: '#fff',
            selectedOpacity: 0.3
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
