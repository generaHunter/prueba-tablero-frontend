// src/components/Modal.tsx
import React, { ReactNode } from 'react';

interface ModalProps {
  titulo: string;
  isOpen: boolean;
  tituloUpdateButton: string;
  showDeleteButton: boolean;
  showModalFooter: boolean
  onClose: () => void;
  handleDelete: () => void;
  handleUpdate: () => void;
  children: ReactNode;
  modalSize: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  handleDelete,
  handleUpdate,
  titulo,
  showDeleteButton,
  tituloUpdateButton,
  showModalFooter = true,
  modalSize = ''
}) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex={-1} style={{ display: isOpen ? 'block' : 'none' }} aria-hidden="true">
      <div className={`modal-dialog ${modalSize}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {
            showModalFooter && (
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                {
                  showDeleteButton && (<button type="button" className="btn btn-danger" onClick={handleDelete}>Borrar</button>)
                }
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>{tituloUpdateButton}</button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Modal;
