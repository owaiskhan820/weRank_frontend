import { createTheme } from '@mui/material/styles';

const themeV2 = createTheme({
  spacing: 4, // Default spacing is 8px, you can change this base value
  palette: {
    primary: {
      main: '#0A6A69',
      contrastText: '#ffffff', // Usually a light color for dark backgrounds or vice versa
    },
    secondary: {
      main: '#000000', // Example secondary color
      contrastText: '#000000', // Contrast text for secondary color
    },
    text: {
      primary: '#000000', // Example secondary color
      contrastText: '#000000'
    }
    // Add any other color or theme properties you want to customize
  },
  shadows: Array(25).fill('none'), // Adjust as needed or use default MUI shadows
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px', // Example of changing the border radius for buttons
        },
      },
    },
  },
  // Add more theme customizations as needed
});

export default themeV2;
