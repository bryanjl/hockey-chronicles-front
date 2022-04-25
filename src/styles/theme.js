import { createTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';


export const theme = createTheme({
    palette: {
        orange: {
            main: '#F74902'
        },
        black: {
            main: '#000000'
        },
        secondary: blue
    },
    typography: {
        fontFamily: 'Hind Siliguri',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    }
});