import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTablero, setTarea, setLoading, setError } from '../store/slices/tableroSlice';
import { RootState } from '../store/store';
import AddTablero from './AddTablero';
import AddTarea from './AddTarea';
import { GetTableroByIdRequest, GetTablerosRequest, GetTareasByTableroIdRequest } from '../utils/tableroUtil';
import Tarea from './Tarea';
import ReporteTareasTableModal from './ReporteTareasTableModal';
import { LoadingDataHelper } from '../helpers/LoadingDataHelper';
import { ITablero } from '../interfaces/ITablero';
import { logout } from '../store/slices/authSlice';
import Swal from 'sweetalert2';
import { ITarea } from '../interfaces/ITarea';

const Boards: React.FC = () => {
  const dispatch = useDispatch();
  const { tableros, tareas, error } = useSelector((state: RootState) => state.tablero);
  const { isAuthenticated, usuario } = useSelector((state: RootState) => state.auth);

  const [isAddBoardOpen, setIsAddBoardOpen] = useState<boolean>(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false);
  const [isRerpoteModalOpen, setIsRerpoteModalOpen] = useState<boolean>(false);
  const [selectedTableroId, setSelectedTableroId] = useState<number | null>(null);
  const [selectedTablero, setSelectedTablero] = useState<ITablero | null>(null);
  const [isExpiredToken, setIsExpiredToken] = useState<boolean>(false);

  const Alerta = Swal.mixin({
    icon: 'error',
    toast: true,
    position: 'top-end',
    title: "Sesion caducada, favor ingresar nuevamente.",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: { container: 'customSweerAlertContainer' },
  });

  const callLogout = () => {
    Alerta.fire();
   dispatch(logout());
  }
  const obtenerTableros = async () => {
    dispatch(setLoading(true));
    try {
      //const response = await axios.get('/api/boards');
      const responseGetTableros = await GetTablerosRequest(usuario);
      if (responseGetTableros.length > 0) {
        dispatch(setTablero(responseGetTableros));
      }
      //dispatch(setTablero(response.data));
    } catch (err) {
      dispatch(setError('Failed to load boards'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const LoadingData = async () => {
    await LoadingDataHelper('Obteniendo tableros...', true, obtenerTableros);
  }

  useEffect(() => {
    LoadingData()
  }, [dispatch, isAuthenticated]);

  const LoadingTareaData = async (tableroId: number) => {
    await LoadingDataHelper('Obteniendo tareas...', true, async () => { await handleBoardSelect(tableroId) });
  }

  const handleBoardSelect = async (tableroId: number) => {
    setSelectedTableroId(tableroId);
    dispatch(setLoading(true));
    try {
      const responseTableroInfo = await GetTableroByIdRequest(usuario, tableroId);

      responseTableroInfo.idTablero > 0 && setSelectedTablero(responseTableroInfo);

      const responseGetTareasByTablero = await GetTareasByTableroIdRequest(usuario, tableroId);
      
      if (responseGetTareasByTablero.isSucces) {
        const tareas: ITarea[] = responseGetTareasByTablero.responseData as unknown as ITarea[];
        tareas.length > 0 ? dispatch(setTarea(tareas)) : dispatch(setTarea([]));
        dispatch(setError(''));
      }else if(responseGetTareasByTablero.isExpiredToken) {
        setIsExpiredToken(true);
      }

    } catch (err) {
      dispatch(setError('Fallo al buscar tareas'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (isExpiredToken) {
      callLogout();
    }
  }, [isExpiredToken])
  

  return (
    <div className='container-fluid'>
      {/* {loading && <p>Loading...</p>} */}
      {/* {error && <p>{error}</p>}
      <button onClick={() => setIsAddBoardOpen(true)}>Agregar Tablero</button>

      <button onClick={() => setIsAddTaskOpen(true)} disabled={!selectedTableroId}>
        Agregar Tarea
      </button>

      <button onClick={() => setIsRerpoteModalOpen(true)}>Mostrar Reporte de Tareas</button> */}
            {/* Mensaje de error */}
            {error && <p>{error}</p>}

{/* Botones */}
<div className="row mb-3">
  <div className="col-12 col-sm-4 mb-2">
    <button className="btn btn-primary w-100" onClick={() => setIsAddBoardOpen(true)}>
      Agregar Tablero
    </button>
  </div>
  <div className="col-12 col-sm-4 mb-2">
    <button
      className="btn btn-success w-100"
      onClick={() => setIsAddTaskOpen(true)}
      disabled={!selectedTableroId}
    >
      Agregar Tarea
    </button>
  </div>
  <div className="col-12 col-sm-4 mb-2">
    <button className="btn btn-info w-100" onClick={() => setIsRerpoteModalOpen(true)}>
      Mostrar Reporte de Tareas
    </button>
  </div>
</div>

      {/* Selección de tablero */}
      <div className="mb-3">
        <select
          className="form-select"
          onChange={async (e) => await LoadingTareaData(Number(e.target.value))}
        >
          <option value="">Seleccionar tablero</option>
          {tableros.map((tablero) => (
            <option key={tablero.idTablero} value={tablero.idTablero}>
              {tablero.nombre}
            </option>
          ))}
        </select>
      </div>

            {/* Mostrar detalles del tablero seleccionado */}
            {selectedTableroId && selectedTablero && (
        <div className="mb-4">
          <h4>Detalles del Tablero</h4>
          <p><strong>Nombre:</strong> {selectedTablero.nombre}</p>
          <p><strong>Descripción:</strong> {selectedTablero.descripcion}</p>
          <p><strong>Fecha de Creación:</strong> {new Date(selectedTablero.fechaCreacion).toLocaleDateString()}</p>

          {/* Botones de edición y eliminación */}
          {/* <div className="row">
            <div className="col">
              <button className="btn btn-warning w-100" onClick={() => console.log('edit-tablerp')}>
                Editar Tablero
              </button>
            </div>
            <div className="col">
              <button className="btn btn-danger w-100" onClick={() => console.log('eliminar-tablero')}>
                Eliminar Tablero
              </button>
            </div>
          </div> */}
        </div>
      )}
      

      {/* Mostrar tareas */}
      <div>
        <h3>Tareas</h3>
        {tareas.length === 0 && <p>No hay tareas disponibles</p>}
        <div className="row">
          {tareas?.map((tarea, index) => (
            <div className="col-sm-4 mb-3" key={`tarea-${index}`}>
              <Tarea tarea={tarea} key={`t-${index}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Modales */}
      <AddTablero isOpen={isAddBoardOpen} onClose={() => setIsAddBoardOpen(false)} handleBoardSelect={handleBoardSelect} />
      <AddTarea tableroId={selectedTableroId ?? 0} isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
      <ReporteTareasTableModal isOpen={isRerpoteModalOpen} onClose={() => setIsRerpoteModalOpen(false)} />
    </div>
  );
};

export default Boards;
