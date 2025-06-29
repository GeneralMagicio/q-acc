import React, { useEffect } from 'react';
import { Button, ButtonColor } from '../Button';

interface TradeOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenTicker: string;
  quickswapUrl: string;
  onBondingCurve: () => void;
}

export const TradeOptionsModal: React.FC<TradeOptionsModalProps> = ({
  isOpen,
  onClose,
  tokenTicker,
  quickswapUrl,
  onBondingCurve,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative text-center'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
          aria-label='Close'
        >
          <svg
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        {/* Title */}
        <h3 className='text-xl font-bold mb-4'>Buy or Sell ${tokenTicker}</h3>
        {/* Description */}
        <p className='text-gray-700 mb-8'>
          You can trade tokens directly with the bonding curve or on Quickswap.
          For larger trades, the bonding curve may have less slippage. Check
          both to ensure you get the best price.
        </p>
        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            color={ButtonColor.Giv}
            className='flex-1'
            onClick={() =>
              window.open(quickswapUrl, '_blank', 'noopener,noreferrer')
            }
          >
            Go To Quickswap
            <svg
              className='ml-2 h-4 w-4 inline-block'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M14 3h7m0 0v7m0-7L10 14m-4 0h4v4'
              />
            </svg>
          </Button>
          <Button
            color={ButtonColor.Giv}
            className='flex-1'
            onClick={onBondingCurve}
          >
            Go To Bonding Curve
          </Button>
        </div>
      </div>
    </div>
  );
};
