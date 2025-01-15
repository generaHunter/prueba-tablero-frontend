import { IUsuario } from './IUsuario'
export interface IAuthState {
    isAuthenticated: boolean;
    usuario: IUsuario | null;
  }