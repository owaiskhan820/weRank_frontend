// src/App.js
import React  from 'react';
import { Provider  } from 'react-redux';
import AppRoutes from './routes/routes';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './utils/theme'; // Import your custom theme
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store'; // Adjust the path as necessary


const App = () => {
  return (
    <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}> {/* Wrap your components with ThemeProvider */}
          <AppRoutes />
      </ThemeProvider>
        </PersistGate>
    </Provider>
  );
}


export default App;
