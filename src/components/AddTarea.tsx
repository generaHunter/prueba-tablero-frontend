// src/components/AddTarea.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setTarea } from '../store/slices/tableroSlice';
import Modal from './Modal';
import { ITarea, ITareaRequest, ITareaResponse } from '../interfaces/ITarea';
import { RootState } from '../store/store';
import { AddTareaRequest, GetTareasByTableroIdRequest } from '../utils/tableroUtil';
import { PENDIENTE } from '../constants/estadosContants';
import { IResponseUtil } from '../interfaces/IResponseUtil';

interface AddTareaProps {
  tableroId: number;
  isOpen: boolean;
  onClose: () => void;
}

const AddTarea: React.FC<AddTareaProps> = ({ tableroId, isOpen, onClose }) => {
  const { usuario } = useSelector((state: RootState) => state.auth);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const dispatch = useDispatch();

  const handleDeleteTarea = () => {
    console.log('delete tarea');
  }


  const handleAddTarea = async () => {
    dispatch(setLoading(true));
    try {
      const newTarea: ITareaRequest = {
        titulo: taskName,
        descripcion: taskDescription,
        idEstado: PENDIENTE, 
        idTablero: tableroId,
        userId: usuario?.userId, // ID del usuario actual
      };

      const respose: ITareaResponse = await AddTareaRequest(usuario, newTarea);

      if (respose.isSuccess) {
        const responseGetTareasByTablero: IResponseUtil = await GetTareasByTableroIdRequest(usuario, tableroId);
        if (responseGetTareasByTablero.isSucces) {
            const tareas: ITarea[] = responseGetTareasByTablero.responseData as unknown as ITarea[];
            tareas.length > 0 ? dispatch(setTarea(tareas)) : dispatch(setTarea([]));
            setTaskName('');
            setTaskDescription('');
            dispatch(setLoading(false));
            onClose(); // Cerrar el modal después de agregar 
        }

      }


    } catch (error) {
      dispatch(setLoading(false));
      console.error('Error agregando tarea:', error);
    }
  };

  return (
    <Modal
    titulo='Crear Tarea'
    isOpen={isOpen}
    showDeleteButton={false}
    onClose={onClose}
    tituloUpdateButton='Guardar'
    handleUpdate={handleAddTarea}
    handleDelete={handleDeleteTarea}
    showModalFooter={true}
    modalSize=''>
      <h3>Agregar Tarea</h3>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
    </Modal>
  );
};

export default AddTarea;
