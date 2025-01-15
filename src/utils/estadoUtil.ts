import axios from "axios";
import { EnvironmentServer } from "../configs/EnvironmentServer";
import { IEstado } from "../interfaces/IEstado";
import { IUsuario } from "../interfaces/IUsuario";
import { logout } from '../store/slices/authSlice'

export const GetEstadosRequest = async (usuario: IUsuario | null): Promise<IEstado[]> => {
    let estados: IEstado[] = [];

	const {data} = await axios.get(`${EnvironmentServer.ApiTablero}estado/getAll`, {
        headers: {
          'Authorization': `Bearer ${usuario?.token}`,
          'Content-Type': 'application/json',
        }
    } );

    if (data.success) {
        estados = data.data as unknown as IEstado[]
    }else if(data.statusCode == 401){
        logout()
    }

	return estados;
};