import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { IReporteTarea } from '../interfaces/IReporte';
import { GetReporteRequest } from '../utils/reporteUtil';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { LoadingDataHelper } from '../helpers/LoadingDataHelper';

const ReporteTareasTable: React.FC = () => {

    const { usuario } = useSelector((state: RootState) => state.auth);
    const [data, setData] = useState<IReporteTarea[]>([])
    const [searchText, setSearchText] = useState('');

    const filteredData = data.filter(item =>
        item.tablero.toLowerCase().includes(searchText.toLowerCase()) ||
        item.idTablero.toString().includes(searchText)
    );

    // Columnas de la tabla
    const columns = [
        {
            name: 'ID Tablero',
            selector: (row: IReporteTarea) => row.idTablero,
            sortable: true,
        },
        {
            name: 'Tablero',
            selector: (row: IReporteTarea) => row.tablero,
            sortable: true,
        },
        {
            name: 'Total de Tareas',
            selector: (row: IReporteTarea) => row.totalTareas,
            sortable: true,
        },
        {
            name: 'Pendientes',
            selector: (row: IReporteTarea) => row.pendiente,
            sortable: true,
        },
        {
            name: 'En Progreso',
            selector: (row: IReporteTarea) => row.enProgreso,
            sortable: true,
        },
        {
            name: 'Completadas',
            selector: (row: IReporteTarea) => row.completada,
            sortable: true,
        },
        {
            name: 'Porcentaje Completadas',
            selector: (row: IReporteTarea) => `${row.porcentajeCompletadas}%`,
            sortable: true,
        },
    ];

    const executeGetReportRequest = async () => {
        const response = await GetReporteRequest(usuario);
        if (response.length > 0) {
            setData(response)
        }
    };

    const LoadingData = async () => {
        await LoadingDataHelper('Obteniendo datos...', true, executeGetReportRequest);
    }

    useEffect(() => {
		LoadingData();
    }, [usuario])
    
    return (
        <div>
            <input
                type="text"
                placeholder="Buscar tablero..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="form-control mb-3"
            />

            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                fixedHeader
                fixedHeaderScrollHeight="400px"
            />
        </div>
    );
};

export default ReporteTareasTable;
