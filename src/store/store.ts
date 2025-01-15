// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tableroReducer from './slices/tableroSlice';
import estadoReducer from './slices/estadoSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    tablero: tableroReducer,
    estado: estadoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>; // Tipo para el estado global
export type AppDispatch = typeof store.dispatch; // Tipo para dispatch

export default store;
