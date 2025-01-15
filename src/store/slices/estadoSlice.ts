// src/redux/slices/boardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEstadoState } from '../../interfaces/IEstadoState';
import { IEstado } from '../../interfaces/IEstado';

const initialState: IEstadoState = {
  estados: [],
  loading: false,
  error: null,
};

const estadoSlice = createSlice({
  name: 'estados',
  initialState,
  reducers: {
    setEstados(state, action: PayloadAction<IEstado[]>) {
      state.estados = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setEstados, setLoading, setError } = estadoSlice.actions;
export default estadoSlice.reducer;
