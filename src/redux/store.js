import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import authReducer from './auth/authSlice';
import notificationReducer from './notifications/notificationSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationReducer,
  },
});

export const persistor = persistStore(store);
export default store;
