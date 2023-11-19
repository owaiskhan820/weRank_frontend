import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A6A69', // Your primary color
    },
    // Add any other colors or theme properties you want to customize
  },
  shadows: Array(25).fill('0px 3px 6px rgba(0,0,0,0.1), 0px 3px 6px rgba(0,0,0,0.1)'), // Adjust the RGBA values for the shadow color and opacity as needed
});

export default theme;
