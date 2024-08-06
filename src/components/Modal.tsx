import { useEffect } from "react";
import { createPortal } from "react-dom";

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ModalProps extends BaseModalProps {
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
        {/* <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button> */}
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
