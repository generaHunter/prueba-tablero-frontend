// src/redux/slices/boardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITarea } from '../../interfaces/ITarea';
import { ITablero } from '../../interfaces/ITablero';
import { ITableroState } from '../../interfaces/ITableroState';

const initialState: ITableroState = {
  tableros: [],
  tareas: [],
  loading: false,
  error: null,
};

const tableroSlice = createSlice({
  name: 'tablero',
  initialState,
  reducers: {
    setTablero(state, action: PayloadAction<ITablero[]>) {
      state.tableros = action.payload;
    },
    setTarea(state, action: PayloadAction<ITarea[]>) {
      state.tareas = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setTablero, setTarea, setLoading, setError } = tableroSlice.actions;
export default tableroSlice.reducer;
