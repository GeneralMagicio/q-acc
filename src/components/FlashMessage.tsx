import React, { useEffect } from 'react';

const FlashMessage = ({ message, onClose, duration = 4000 }: any) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  if (!message) return null;

  return <div className='  text-red-500 px-4 py-2 rounded'>{message}</div>;
};

export default FlashMessage;
