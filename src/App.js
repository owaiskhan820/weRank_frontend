// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import AppRoutes from './routes/routes';
import LoadingModal from './shared/LoadingModal/LoadingModal'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingModal />} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
