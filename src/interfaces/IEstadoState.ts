import { IEstado } from "./IEstado";

export interface IEstadoState {
    estados: IEstado[];
    loading: boolean;
    error: string | null;
  }