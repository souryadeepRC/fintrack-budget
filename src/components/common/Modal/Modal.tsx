import { useEffect } from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCloseIcon?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  showCloseIcon = false,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="backdrop" onClick={onClose} data-testid="modal-backdrop">
      <div
        className={`modal ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseIcon && (
          <button
            className="closeButton"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        )}
        {title && <h2 className="title">{title}</h2>}
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
