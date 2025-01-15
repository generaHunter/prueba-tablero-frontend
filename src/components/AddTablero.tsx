// src/components/AddBoard.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading, setTablero } from '../store/slices/tableroSlice';
import Modal from './Modal';
import { RootState } from '../store/store';
import { AddTableroRequest, GetTablerosRequest } from '../utils/tableroUtil';
import { ITableroRequest, ITableroResponse } from '../interfaces/ITablero';

interface AddTableroProps {
  isOpen: boolean;
  onClose: () => void;
  handleBoardSelect: (tableroId: number) => void;
}

const AddTablero: React.FC<AddTableroProps> = ({ isOpen, onClose, handleBoardSelect }) => {
  const { usuario } = useSelector((state: RootState) => state.auth);
  const [nombreTablero, setNombreTablero] = useState<string>('');
  const [boardDescription, setBoardDescription] = useState<string>('');
  const dispatch = useDispatch();

  const handleDeleteTablero = () => {
    console.log('eleminando tablero');
  }

  const handleAddTablero = async () => {
    dispatch(setLoading(true));
    try {
      const newTablero: ITableroRequest = {
        nombre: nombreTablero,
        descripcion: boardDescription,
        userId: usuario?.userId, // Reemplazar con el ID del usuario actual
      };

      const respose: ITableroResponse = await AddTableroRequest(usuario, newTablero);
      if (respose.isSuccess) {
        const responseGetTableros = await GetTablerosRequest(usuario);
        if (responseGetTableros.length > 0) {
          dispatch(setTablero(responseGetTableros));
        }

        console.log('response.idTablero', respose.idTablero);
        
        setNombreTablero('');
        setBoardDescription('');
        handleBoardSelect(respose.idTablero);
        onClose(); // Cerrar el modal después de agregar
      }
     
    } catch (error) {
      console.error('Error agregando tablero:', error);
      dispatch(setError('Error agregando tablero'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Modal titulo='Crear Tablero'
      isOpen={isOpen}
      showDeleteButton={false}
      onClose={onClose}
      tituloUpdateButton='Guardar'
      handleDelete={handleDeleteTablero}
      handleUpdate={handleAddTablero}
      showModalFooter={true}
      modalSize=''>
      <h3>Agregar Tablero</h3>
      <input
        type="text"
        placeholder="Nombre del tablero"
        value={nombreTablero}
        onChange={(e) => setNombreTablero(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={boardDescription}
        onChange={(e) => setBoardDescription(e.target.value)}
      />
    </Modal>
  );
};

export default AddTablero;
