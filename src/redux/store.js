import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if you have any
  },
});

export const persistor = persistStore(store);
export default store;
