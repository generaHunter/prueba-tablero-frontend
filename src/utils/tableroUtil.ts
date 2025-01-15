import axios from 'axios';
import { EnvironmentServer } from '../configs/EnvironmentServer';
import { ITablero, ITableroRequest, ITableroResponse } from '../interfaces/ITablero';
import { IUsuario } from '../interfaces/IUsuario';
import { ITarea, ITareaRequest, ITareaResponse, ITareaUpdateRequest } from '../interfaces/ITarea';
import { IResponseUtil } from '../interfaces/IResponseUtil';

export const GetTablerosRequest = async (usuario: IUsuario | null): Promise<ITablero[]> => {
    let tableros: ITablero[] = [];

	const {data} = await axios.get(`${EnvironmentServer.ApiTablero}tablero/getAll`, {
        headers: {
          'Authorization': `Bearer ${usuario?.token}`,
          'Content-Type': 'application/json',
        }
    } );

    if (data.success) {
        tableros = data.data as unknown as ITablero[]
    }

	return tableros;
};

export const AddTableroRequest = async (usuario: IUsuario | null, tablero: ITableroRequest): Promise<ITableroResponse> => {
    let response: ITableroResponse = {
        idTablero: 0,
        isSuccess: false
    };
	const {data} = await axios.post(`${EnvironmentServer.ApiTablero}tablero/create`,
    tablero, 
    {
        headers: {
          'Authorization': `Bearer ${usuario?.token}`,
          'Content-Type': 'application/json',
        }
    } );

    if (data.success) {
        const tableroAdding: ITablero  = data.data as unknown as ITablero;
        response.idTablero = tableroAdding.idTablero;
        response.isSuccess = true;
    }

	return response;
};

export const AddTareaRequest = async (usuario: IUsuario | null, tarea: ITareaRequest): Promise<ITareaResponse> => {
    let response: ITareaResponse = {
        idTarea: 0,
        isSuccess: false
    };
	const {data} = await axios.post(`${EnvironmentServer.ApiTablero}tarea/create`,
    tarea, 
    {
        headers: {
          'Authorization': `Bearer ${usuario?.token}`,
          'Content-Type': 'application/json',
        }
    } );

    if (data.success) {
        const tareaAdding: ITarea  = data.data as unknown as ITarea;
        response.idTarea = tareaAdding.idTarea;
        response.isSuccess = true;
    }

	return response;
};


export const UpdateTareaRequest = async (usuario: IUsuario | null, tarea: ITareaUpdateRequest): Promise<boolean> => {
    let response: boolean = false;
	const {data} = await axios.patch(`${EnvironmentServer.ApiTablero}tarea/update`,
    tarea, 
    {
        headers: {
          'Authorization': `Bearer ${usuario?.token}`,
          'Content-Type': 'application/json',
        }
    } );

    if (data.success) {
        response = data.data as unknown as boolean;
    }

	return response;
};


export const GetTareasByTableroIdRequest = async (usuario: IUsuario | null, tableroId: number): Promise<IResponseUtil> => {
    let tareas: ITarea[] = [];
    const respose: IResponseUtil = {
        isSucces: false,
        isExpiredToken: false,
        responseData: []
    };

    try {
        const {data} = await axios.get(`${EnvironmentServer.ApiTablero}tarea/getByTableroId?tableroId=${tableroId}`, {
            headers: {
              'Authorization': `Bearer ${usuario?.token}`,
              'Content-Type': 'application/json',
            }
        } );
    
        console.log('GetTareasByTableroIdRequest', data);
        if (data.success) {
            tareas = data.data as unknown as ITarea[]
            respose.responseData = tareas;
            respose.isSucces = true;
        }
    } catch (error: any) {
        if (error.response.status === 401) {
            respose.responseData = [];
            respose.isSucces = false;
            respose.isExpiredToken = true;
        }
    }

	return respose;
};

export const GetTableroByIdRequest = async (usuario: IUsuario | null, tableroId: number): Promise<ITablero> => {
    let tablero: ITablero = {
        descripcion: '',
        fechaCreacion: '',
        idTablero: 0,
        nombre: '',
        userId: 0
    };
    
	const {data} = await axios.get(`${EnvironmentServer.ApiTablero}tablero/getById?tableroId=${tableroId}`, {
        headers: {
          'Authorization': `Bearer ${usuario?.token}`,
          'Content-Type': 'application/json',
        }
    } );

    if (data.success) {
        tablero = data.data as unknown as ITablero;
    }

	return tablero;
};

export const DeleteTarea = async (usuario: IUsuario | null, tareaId: number): Promise<boolean> => {
    let response: boolean = false;
    
	const {data} = await axios.delete(`${EnvironmentServer.ApiTablero}tarea/delete?tareaId=${tareaId}`, {
        headers: {
          'Authorization': `Bearer ${usuario?.token}`,
          'Content-Type': 'application/json',
        }
    } );

    if (data.success) {
        response = data.data as unknown as boolean;
    }

	return response;
};

export const DeleteTablero = async (usuario: IUsuario | null, tableroId: number): Promise<boolean> => {
    let response: boolean = false;
    
	const {data} = await axios.delete(`${EnvironmentServer.ApiTablero}tablero/delete?tableroId=${tableroId}`, {
        headers: {
          'Authorization': `Bearer ${usuario?.token}`,
          'Content-Type': 'application/json',
        }
    } );

    if (data.success) {
        response = data.data as unknown as boolean;
    }

	return response;
};