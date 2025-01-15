import { ITablero } from "./ITablero";
import { ITarea } from "./ITarea";

export interface ITableroState {
    tableros: ITablero[];
    tareas: ITarea[];
    loading: boolean;
    error: string | null;
  }