import React from 'react';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;      
    onClose: () => void;  
    content: string;  // Prop para el contenido
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>Cerrar</button>
                <div className="modal-body-AI" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default Modal;
