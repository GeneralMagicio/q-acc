'use client';

import React, { useState } from 'react';
import { BondingCurveBuyForm } from './BondingCurveBuyForm';
import { BondingCurveInfo } from './BondingCurveInfo';
import { Button, ButtonColor, ButtonStyle } from '../Button';

interface BondingCurveContainerProps {
  contractAddress: string;
  title?: string;
  description?: string;
}

export const BondingCurveContainer: React.FC<BondingCurveContainerProps> = ({
  contractAddress,
  title = 'Bonding Curve',
  description = 'Buy tokens using the bonding curve mechanism',
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'info'>('buy');
  const [transactionHash, setTransactionHash] = useState<string>('');

  const handleBuySuccess = (hash: string) => {
    setTransactionHash(hash);
    // You can add toast notification here
    console.log('Transaction successful:', hash);
  };

  const handleBuyError = (error: Error) => {
    // You can add toast notification here
    console.error('Transaction failed:', error.message);
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>{title}</h1>
        <p className='text-gray-600'>{description}</p>
      </div>

      {/* Tab Navigation */}
      <div className='flex mb-6 bg-gray-100 rounded-lg p-1'>
        <button
          onClick={() => setActiveTab('buy')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'buy'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Buy Tokens
        </button>
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'info'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Curve Info
        </button>
      </div>

      {/* Content */}
      <div className='space-y-6'>
        {activeTab === 'buy' && (
          <BondingCurveBuyForm
            contractAddress={contractAddress}
            onSuccess={handleBuySuccess}
            onError={handleBuyError}
          />
        )}

        {activeTab === 'info' && (
          <BondingCurveInfo contractAddress={contractAddress} />
        )}
      </div>

      {/* Transaction Success Message */}
      {transactionHash && (
        <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='text-green-800 font-medium'>
                Transaction Successful!
              </h4>
              <p className='text-green-600 text-sm mt-1'>
                Your tokens have been purchased successfully.
              </p>
            </div>
            <Button
              onClick={() => setTransactionHash('')}
              color={ButtonColor.Green}
              styleType={ButtonStyle.Text}
              className='text-sm'
            >
              Dismiss
            </Button>
          </div>
          <div className='mt-2'>
            <p className='text-xs text-green-600'>Transaction Hash:</p>
            <p className='text-xs font-mono text-green-700 break-all'>
              {transactionHash}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
