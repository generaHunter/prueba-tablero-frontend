// src/components/AddTarea.tsx
import React from 'react';
import Modal from './Modal';

import ReporteTareasTable from './ReporteTareasTable';

interface ReporteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReporteTareasTableModal: React.FC<ReporteModalProps> = ({ isOpen, onClose }) => {
//   const { usuario } = useSelector((state: RootState) => state.auth);
//   const [taskName, setTaskName] = useState<string>('');
//   const [taskDescription, setTaskDescription] = useState<string>('');
//   const dispatch = useDispatch();

  const handleDelete= () => {};
  const handleAdd = async () => {};

  return (
    <Modal
    titulo='Reporte de Tareas por Tablero'
    isOpen={isOpen}
    showDeleteButton={false}
    onClose={onClose}
    tituloUpdateButton=''
    handleUpdate={handleAdd}
    handleDelete={handleDelete}
    showModalFooter={false}
    modalSize='modal-xl'>
        <ReporteTareasTable />
    </Modal>
  );
};

export default ReporteTareasTableModal;
