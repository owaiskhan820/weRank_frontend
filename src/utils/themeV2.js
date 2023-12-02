import { createTheme } from '@mui/material/styles';

const themeV2 = createTheme({
  palette: {
    primary: {
      main: '#0A6A69',
    },
    // Add any other color or theme properties you want to customize
  },
  shadows: Array(25).fill('none'), // Adjust as needed or use default MUI shadows
  components: {
    // You can override styles for MUI components here
    // Example for Button:
    MuiButton: {
      styleOverrides: {
        root: {
          // styles here will apply to all MuiButton components
        },
      },
    },
  },
  // Add more theme customizations as needed
});

export default themeV2;
