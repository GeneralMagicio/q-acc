'use client';

import React, { useState, useEffect } from 'react';
import { BondingCurveBuyForm } from './BondingCurveBuyForm';
import { BondingCurveSellForm } from './BondingCurveSellForm';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { TransactionHash } from './TransactionHash';

interface BondingCurveModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractAddress: string;
  tokenTicker: string;
  tokenAddress: string;
}

interface TransactionResult {
  wrapHash?: string;
  approvalHash?: string;
  buyHash?: string;
  sellHash?: string;
  unwrapHash?: string;
}

export const BondingCurveModal: React.FC<BondingCurveModalProps> = ({
  isOpen,
  onClose,
  contractAddress,
  tokenAddress,
  tokenTicker,
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'info'>('buy');
  const [transactionResult, setTransactionResult] =
    useState<TransactionResult | null>(null);

  // Add/remove class to body to hide header when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleTransactionSuccess = (result: TransactionResult) => {
    setTransactionResult(result);
    console.log('Transaction successful:', result);
  };

  const handleTransactionError = (error: Error) => {
    console.error('Transaction failed:', error.message);
  };

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
          className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full mt-16'
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className='bg-white px-6 py-4 border-b border-gray-200'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Trade With The Bonding Curve
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

            {/* Tab Navigation */}
            <div className='flex mt-4 bg-gray-100 rounded-lg p-1'>
              <button
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'buy'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'sell'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sell
              </button>
              {/* <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'info'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Info
              </button> */}
            </div>
          </div>

          {/* Content */}
          <div className='bg-gray-50 px-6 py-6'>
            {activeTab === 'buy' && (
              <BondingCurveBuyForm
                contractAddress={contractAddress}
                tokenTicker={tokenTicker}
                onSuccess={handleTransactionSuccess}
                onError={handleTransactionError}
              />
            )}

            {activeTab === 'sell' && (
              <BondingCurveSellForm
                contractAddress={contractAddress}
                tokenAddress={tokenAddress}
                tokenTicker={tokenTicker}
                onSuccess={handleTransactionSuccess}
                onError={handleTransactionError}
              />
            )}

            {/* {activeTab === 'info' && (
              <BondingCurveInfo
                contractAddress={contractAddress}
                tokenTicker={tokenTicker}
              />
            )} */}
          </div>

          {/* Transaction Success Message */}
          {transactionResult && (
            <div className='bg-white px-6 py-4 border-t border-gray-200'>
              <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='text-green-800 font-medium'>
                      Transaction Successful!
                    </h4>
                    <p className='text-green-600 text-sm mt-1'>
                      Your transaction has been completed successfully.
                    </p>
                  </div>
                  <Button
                    onClick={() => setTransactionResult(null)}
                    color={ButtonColor.Green}
                    styleType={ButtonStyle.Text}
                    className='text-sm'
                  >
                    Dismiss
                  </Button>
                </div>

                {/* Show buy transaction if it exists */}
                {transactionResult.buyHash && (
                  <div className='mt-2'>
                    <p className='text-xs text-green-600 font-medium'>
                      Buy Transaction:
                    </p>
                    <div className='mt-1'>
                      <TransactionHash
                        value={transactionResult.buyHash}
                        truncate={false}
                        className='text-xs text-green-700'
                      />
                    </div>
                  </div>
                )}

                {/* Show sell transaction if it exists */}
                {transactionResult.sellHash && (
                  <div className='mt-2'>
                    <p className='text-xs text-green-600 font-medium'>
                      Sell Transaction:
                    </p>
                    <div className='mt-1'>
                      <TransactionHash
                        value={transactionResult.sellHash}
                        truncate={false}
                        className='text-xs text-green-700'
                      />
                    </div>
                  </div>
                )}

                {/* Show unwrap transaction if it exists */}
                {transactionResult.unwrapHash && (
                  <div className='mt-2'>
                    <p className='text-xs text-green-600 font-medium'>
                      Unwrap Transaction:
                    </p>
                    <div className='mt-1'>
                      <TransactionHash
                        value={transactionResult.unwrapHash}
                        truncate={false}
                        className='text-xs text-green-700'
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
