import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        //type: 'dark',
        primary: {
            main: '#f5cb5c',
        },
        secondary: {
            main: '#f50057',
        },
        text: {
            primary: '#e8eddf',
            secondary: '#cfdbd5',
        },
        background: {
            default: '#242423',
            paper: '#333533',
        },
    },
    typography: {
        fontFamily: '"Montserrat"',
        h6: {
            fontWeight: 1000,
            fontSize: '1.2rem',
        },
        h4: {
            fontWeight: 1000,
            fontSize: '2.4rem',
        },
    },
})

export default theme;