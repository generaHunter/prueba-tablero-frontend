export interface ITablero {
    idTablero: number;
    nombre: string;
    descripcion: string;
    fechaCreacion: string;
    userId: number;
  }

  export interface ITableroRequest {
    nombre: string;
    descripcion: string;
    userId: number | undefined;
  }

  export interface ITableroResponse {
    idTablero: number;
    isSuccess: boolean;
  }
  
  