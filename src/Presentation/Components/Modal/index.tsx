import React from "react";

import "@/Presentation/Styles/modal.scss";

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
