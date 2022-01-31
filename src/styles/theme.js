import { createTheme } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';


export const theme = createTheme({
    palette: {
        primary: red,
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