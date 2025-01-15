export interface ITarea {
    idTarea: number;
    titulo: string;
    descripcion: string;
    fechaCreacion: string;
    idEstado: number;
    idTablero: number;
    userId: number;
  }

  export interface ITareaRequest {
    titulo: string;
    descripcion: string;
    idEstado: number;
    idTablero: number;
    userId: number | undefined;
  }

  export interface ITareaUpdateRequest {
    idTarea: number;
    titulo: string;
    descripcion: string;
    idEstado: number;
  }

  export interface ITareaResponse {
    idTarea: number;
    isSuccess: boolean;
  }
  