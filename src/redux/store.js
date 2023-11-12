// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only auth will be persisted
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    // other reducers can be added here
    auth: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
