import React from "react";

import "@/app/styles/modal.css";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const ViewerModal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  return (
    <div
      className={`modal-viewer-overlay ${isOpen ? "show" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal-viewer-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ViewerModal;
