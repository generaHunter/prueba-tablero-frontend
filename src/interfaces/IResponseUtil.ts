import { IEstado } from "./IEstado";
import { IReporteTarea } from "./IReporte";
import { ITablero, ITableroResponse } from "./ITablero";
import { ITarea, ITareaResponse } from "./ITarea";

export interface IResponseUtil {
    isExpiredToken: boolean;
    isSucces: boolean;
    responseData: IReporteTarea[] | IEstado[] | ITablero[] | ITableroResponse | ITareaResponse | boolean | ITarea[] | ITablero | {} ;
  }