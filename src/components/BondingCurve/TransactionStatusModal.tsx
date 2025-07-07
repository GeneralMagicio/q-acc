'use client';

import React from 'react';
import { Button, ButtonColor, ButtonStyle } from '../Button';

interface TransactionStatusModalProps {
  isOpen: boolean;
  status: string;
  onClose?: () => void;
}

export const TransactionStatusModal: React.FC<TransactionStatusModalProps> = ({
  isOpen,
  status,
  onClose,
}) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    if (status.includes('failed')) return 'text-red-600';
    if (status.includes('completed')) return 'text-green-600';
    return 'text-blue-600';
  };

  const getStatusIcon = (status: string) => {
    if (status.includes('failed')) {
      return (
        <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
          <svg
            className='w-5 h-5 text-red-600'
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
        </div>
      );
    }

    if (status.includes('completed')) {
      return (
        <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
          <svg
            className='w-5 h-5 text-green-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
      );
    }

    return (
      <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
        <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600'></div>
      </div>
    );
  };

  const getErrorMessage = (status: string) => {
    if (status.includes('Wrap transaction failed')) {
      return 'Your POL wrapping transaction failed. This could be due to insufficient POL balance, insufficient gas, or user rejection. Please check your POL balance and try again.';
    }
    if (status.includes('Insufficient POL balance')) {
      return status; // Return the specific error message from the service
    }
    if (status.includes('Approval transaction failed')) {
      return 'Your approval transaction failed. This could be due to insufficient gas, user rejection, or contract issues. Please try again.';
    }
    if (status.includes('Buy transaction failed')) {
      return 'Your buy transaction failed. This could be due to insufficient funds, slippage protection, or contract issues. Please check your inputs and try again.';
    }
    if (status.includes('Sell transaction failed')) {
      return 'Your sell transaction failed. This could be due to insufficient tokens, slippage protection, or contract issues. Please check your inputs and try again.';
    }
    if (status.includes('Unwrap transaction failed')) {
      return 'Your unwrap transaction failed. This could be due to insufficient gas, user rejection, or contract issues. The sell was successful, but WPOL was not unwrapped to POL.';
    }
    if (status.includes('Transaction failed')) {
      return 'The transaction failed. Please check your wallet and try again.';
    }
    if (status.includes('Insufficient balance')) {
      return status; // Return the specific error message from the service
    }
    return '';
  };

  return (
    <div className='fixed inset-0 z-60 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen pt-20 px-4 pb-20 text-center sm:block sm:p-0'>
        {/* Background overlay */}
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

        {/* Modal panel */}
        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full'>
          <div className='bg-white px-6 py-6'>
            <div className='flex items-center justify-center mb-4'>
              {getStatusIcon(status)}
            </div>

            <div className='text-center'>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Transaction in Progress
              </h3>

              <p
                className={`text-sm font-medium ${getStatusColor(status)} mb-4`}
              >
                {status}
              </p>

              {status.includes('Waiting for wrap transaction confirmation') && (
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
                  <p className='text-xs text-blue-700'>
                    Please wait while your POL wrapping transaction is being
                    confirmed on the blockchain. This may take a few minutes.
                  </p>
                </div>
              )}

              {status.includes(
                'Waiting for approval transaction to be confirmed',
              ) && (
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
                  <p className='text-xs text-blue-700'>
                    Please wait while your approval transaction is being
                    confirmed on the blockchain. This may take a few minutes.
                  </p>
                </div>
              )}

              {status.includes('Waiting for buy transaction confirmation') && (
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
                  <p className='text-xs text-blue-700'>
                    Please wait while your buy transaction is being confirmed on
                    the blockchain. This may take a few minutes.
                  </p>
                </div>
              )}

              {status.includes('Waiting for sell transaction confirmation') && (
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
                  <p className='text-xs text-blue-700'>
                    Please wait while your sell transaction is being confirmed
                    on the blockchain. This may take a few minutes.
                  </p>
                </div>
              )}

              {status.includes('Waiting for unwrap transaction confirmation') && (
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
                  <p className='text-xs text-blue-700'>
                    Please wait while your unwrap transaction is being confirmed
                    on the blockchain. This may take a few minutes.
                  </p>
                </div>
              )}

              {status.includes('failed') && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4'>
                  <p className='text-xs text-red-700'>
                    {getErrorMessage(status)}
                  </p>
                </div>
              )}

              {status.includes('completed') && onClose && (
                <Button
                  onClick={onClose}
                  color={ButtonColor.Green}
                  styleType={ButtonStyle.Solid}
                >
                  Close
                </Button>
              )}

              {status.includes('failed') && onClose && (
                <Button
                  onClick={onClose}
                  color={ButtonColor.Pink}
                  styleType={ButtonStyle.Solid}
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
