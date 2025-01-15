import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice'
import {LoginRequest} from '../utils/authUtil'
import { IUsuario } from '../interfaces/IUsuario';
import { setEstados } from '../store/slices/estadoSlice';
import { GetEstadosRequest } from '../utils/estadoUtil';
import { IEstado } from '../interfaces/IEstado';


const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const responseLogin: IUsuario  = await LoginRequest(username, password);
    if (responseLogin.token.length > 0) {
      dispatch(login(responseLogin));

      const responseEstados: IEstado[] = await GetEstadosRequest(responseLogin);
      if (responseEstados.length > 0) {
        dispatch(setEstados(responseEstados));
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
