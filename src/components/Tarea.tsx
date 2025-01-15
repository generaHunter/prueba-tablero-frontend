import React, { useState } from 'react';
import { ITarea, ITareaUpdateRequest } from '../interfaces/ITarea';  // Asegúrate de tener la interfaz ITarea correctamente importada
import { EN_PROGRESO, PENDIENTE } from '../constants/estadosContants';
import Modal from './Modal';
import { DeleteTarea, GetTareasByTableroIdRequest, UpdateTareaRequest } from '../utils/tableroUtil';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setLoading, setTarea } from '../store/slices/tableroSlice';
import { logout } from '../store/slices/authSlice';

interface TareaCardProps {
    tarea: ITarea;  // La tarea que se pasará al componente
    // onUpdate: (tarea: ITarea) => void;  // Función para actualizar la tarea
    // onDelete: (idTarea: number) => void;  // Función para eliminar la tarea
}

const Tarea: React.FC<TareaCardProps> = ({ tarea }) => {
    const { usuario } = useSelector((state: RootState) => state.auth);
    const { estados } = useSelector((state: RootState) => state.estado);
    const [showModal, setShowModal] = useState(false);
    const [tareaData, setTaraData] = useState<ITarea>(tarea);
    const dispatch = useDispatch();

    const callLogout = () => {
        dispatch(logout());
      }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTaraData({
            ...tareaData,
            [name]: value,  // Actualiza el campo correspondiente
        });
    };


    // Función para abrir el modal
    const handleShow = () => setShowModal(true);

    // Función para cerrar el modal
    const handleClose = () => setShowModal(false);

    // Función para actualizar la tarea con los datos modificados
    const handleUpdate = async() => {
        dispatch(setLoading(true));
        const tareaUpdateRequest: ITareaUpdateRequest = {
            descripcion: tareaData.descripcion,
            idEstado: tareaData.idEstado,
            idTarea: tareaData.idTarea,
            titulo: tareaData.titulo
        }
        const respose: boolean = await UpdateTareaRequest(usuario, tareaUpdateRequest);

        if (respose) {
            const responseGetTareasByTablero = await GetTareasByTableroIdRequest(usuario, tarea.idTablero);
            if (responseGetTareasByTablero.isSucces) {
                const tareas: ITarea[] = responseGetTareasByTablero.responseData as unknown as ITarea[];
                tareas.length > 0 ? dispatch(setTarea(tareas)) : dispatch(setTarea([]));
                dispatch(setLoading(false));
                handleClose();  // Cierra el modal
              }else {
                callLogout();
              }
        }

        dispatch(setLoading(false));
    };

    // Función para eliminar la tarea
    const handleDelete = async () => {
        dispatch(setLoading(true));
        const respose: boolean = await DeleteTarea(usuario, tarea.idTarea);

        if (respose) {
            const responseGetTareasByTablero = await GetTareasByTableroIdRequest(usuario, tarea.idTablero);
            if (responseGetTareasByTablero.isSucces) {
                const tareas: ITarea[] = responseGetTareasByTablero.responseData as unknown as ITarea[];
                tareas.length > 0 ? dispatch(setTarea(tareas)) : dispatch(setTarea([]));
                dispatch(setLoading(false));
                handleClose();  // Cierra el modal
              }else {
                callLogout();
              }
            dispatch(setLoading(false));
            handleClose();  // Cierra el modal
        }

        dispatch(setLoading(false));

    };

    return (
        <div className="card mb-3" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{tarea.titulo}</h5>
                <p className="card-text">{tarea.descripcion}</p>
                <p className="card-text">
                    <strong>Creado:</strong> {new Date(tarea.fechaCreacion).toLocaleDateString()}
                </p>
                <p className="card-text">
                    <strong>Estado:</strong> {tarea.idEstado === PENDIENTE ? (
                        <span className="badge text-bg-warning">Pendiente</span>
                    ) : (
                        tarea.idEstado === EN_PROGRESO ? (
                            <span className="badge text-bg-info">En progreso</span>
                        ) : (
                            <span className="badge text-bg-success">Completada</span>
                        )
                    )}
                </p>
                <button className="btn btn-primary" onClick={handleShow}>Editar</button>
            </div>

            <Modal titulo={`Editar Tarea: ${tarea.titulo}`}
                isOpen={showModal}
                showDeleteButton={true}
                onClose={() => setShowModal(false)}
                handleDelete={handleDelete}
                tituloUpdateButton='Actualizar tarea'
                handleUpdate={handleUpdate}
                showModalFooter={true}
                modalSize=''>
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        name="titulo"
                        value={tareaData.titulo}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={tareaData.descripcion}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="fechaCreacion" className="form-label">Fecha de Creación</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fechaCreacion"
                        name="fechaCreacion"
                        value={new Date(tareaData.fechaCreacion).toLocaleDateString()}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select
                        id="idEstado"
                        name="idEstado"
                        className="form-control"
                        value={tareaData.idEstado}
                        onChange={handleInputChange}
                    >
                        {estados.map((estado) => (
                            <option key={estado.idEstado} value={estado.idEstado}>
                                {estado.nombreEstado}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal>
        </div>
    );
};

export default Tarea;
