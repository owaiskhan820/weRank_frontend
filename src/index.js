import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

const container = document.getElementById('root'); // Get the root container
const root = createRoot(container); // Create a root

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
