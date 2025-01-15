import { TAllEnvironment } from '../constants/types';

/**
 * @type { typeof import("../constants/types").TAllEnvironment }
 */
const EnvironmentServer: TAllEnvironment = {
    AppEnvironment: process.env.NODE_ENV ? process.env.NODE_ENV : 'local',
    ApiTablero: import.meta.env.VITE_URI_API_TABLERO ? import.meta.env.VITE_URI_API_TABLERO : 'saa',
};


export { EnvironmentServer };