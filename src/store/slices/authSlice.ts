// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from '../../interfaces/IAuthState';
import { IUsuario } from '../../interfaces/IUsuario';

const initialState: IAuthState = {
  isAuthenticated: false,
  usuario: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUsuario>) {
      state.isAuthenticated = true;
      state.usuario = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.usuario = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
