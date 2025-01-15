import axios from 'axios';
import { EnvironmentServer } from '../configs/EnvironmentServer';
import { IUsuario } from '../interfaces/IUsuario';

export const LoginRequest = async (username: string, userPassword: string): Promise<IUsuario> => {

    let usuario: IUsuario = {
        firstName: '',
        lastName: '',
        password: '',
        token: '',
        userId: 0,
        userName: ''
    }
	const {data} = await axios.get(`${EnvironmentServer.ApiTablero}usuario/getUserByCredential/${username}/${userPassword}`);

    if (data.success) {
        usuario = data.data as unknown as IUsuario
    }

	return usuario;

};