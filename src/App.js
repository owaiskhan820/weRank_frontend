// src/App.js
import React  from 'react';
import { Provider  } from 'react-redux';
import AppRoutes from './routes/routes';
import { ThemeProvider } from '@mui/styles';
import theme from './utils/themeV2'; // Import your custom theme
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store'; // Adjust the path as necessary


const App = () => {
  return (
    <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}> 
          <AppRoutes />
      </ThemeProvider>
        </PersistGate>
    </Provider>
  );
}


export default App;
