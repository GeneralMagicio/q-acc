import { HTMLAttributes, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from './Icons/IconX';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

interface ModalProps extends BaseModalProps {
  title?: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  titleIcon,
  showCloseButton = false,
  children,
  className,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen && mounted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, mounted]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur'
      onClick={e => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className={`bg-white w-full max-h-[100vh] overflow-x-hidden overflow-y-auto relative p-4 md:max-h-[90vh] md:rounded-xl md:shadow-lg md:max-w-lg md:p-6 ${className}`}
        onClick={e => e.stopPropagation()} // Prevent modal content clicks from propagating
      >
        {showCloseButton && (
          <button
            className='absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-10'
            onClick={onClose}
          >
            <IconX size={14} />
          </button>
        )}
        <div className='flex gap-4'>
          {titleIcon && titleIcon}
          {title && <h2 className='text-lg font-bold mb-4'>{title}</h2>}
        </div>

        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
