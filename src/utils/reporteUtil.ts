import axios from "axios";
import { EnvironmentServer } from "../configs/EnvironmentServer";
import { IReporteTarea } from "../interfaces/IReporte";
import { IUsuario } from "../interfaces/IUsuario";
import { logout } from "../store/slices/authSlice";

export const GetReporteRequest = async (usuario: IUsuario | null): Promise<IReporteTarea[]> => {
    let reporteData: IReporteTarea[] = [];

	const {data} = await axios.get(`${EnvironmentServer.ApiTablero}reporte/getReporteTareas`, {
        headers: {
          'Authorization': `Bearer ${usuario?.token}`,
          'Content-Type': 'application/json',
        }
    } );

    console.log('data-reporte', data);

    if (data.success) {
        reporteData = data.data as unknown as IReporteTarea[]
    }else if(data.statusCode == 401){
        logout()
    }

	return reporteData;
};