import React from "react";

import "@/app/styles/modal.css";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  onClose,
  className,
}) => {
  return (
    <div
      className={`modal-overlay ${isOpen ? "show" : ""} ${className}`}
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
