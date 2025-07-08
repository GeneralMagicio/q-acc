'use client';

import React, { useEffect } from 'react';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { IconViewTransaction } from '../Icons/IconViewTransaction';

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
    <div className='fixed inset-0 z-50'>
      {/* Background overlay */}
      <div
        className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
        onClick={e => {
          e.stopPropagation();
          onClose();
        }}
      ></div>

      {/* Modal container */}
      <div
        className='flex items-center justify-center min-h-screen pt-20 px-4 pb-20 text-center sm:block sm:p-0'
        onClick={e => {
          e.stopPropagation();
          onClose();
        }}
      >
        {/* Modal panel */}
        <div
          className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full mt-24'
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className='bg-white px-6 py-4 border-b border-gray-200'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Buy or Sell ${tokenTicker}
              </h3>
              <button
                onClick={e => {
                  e.stopPropagation();
                  onClose();
                }}
                className='text-gray-400 hover:text-gray-600 transition-colors'
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
            </div>
          </div>

          {/* Content */}
          <div className='bg-gray-50 px-6 py-6'>
            <p className='text-gray-700 mb-8'>
              You can trade tokens directly with the bonding curve or on
              Quickswap. For larger trades, the bonding curve may have less
              slippage. Check both to ensure you get the best price.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                color={ButtonColor.Giv}
                styleType={ButtonStyle.Outline}
                onClick={() =>
                  window.open(quickswapUrl, '_blank', 'noopener,noreferrer')
                }
              >
                Go To Quickswap
                <IconViewTransaction color='#5326EC' />
              </Button>
              <Button
                color={ButtonColor.Giv}
                styleType={ButtonStyle.Outline}
                onClick={onBondingCurve}
              >
                Go To Bonding Curve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
