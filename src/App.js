// src/App.js
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import AppRoutes from './routes/routes';
import { setCredentials } from './redux/auth/authSlice';

const App = () => {
  return (
    <Provider store={store}>
      <RehydrationWrapper>
        <AppRoutes />
      </RehydrationWrapper>
    </Provider>
  );
}

// Create a wrapper component for rehydration logic
const RehydrationWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    const localToken = localStorage.getItem('token');
    if (localUser && localToken) {
      dispatch(setCredentials({ user: JSON.parse(localUser), token: localToken }));
    }
  }, [dispatch]);

  return children;
}

export default App;
