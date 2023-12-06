// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import AppRoutes from './routes/routes';
import { ThemeProvider } from '@mui/material/styles'; // Correct import
import themeV2 from './utils/themeV2';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={themeV2}>
          <AppRoutes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
