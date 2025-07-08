'use client';

import React from 'react';
import { formatUnits } from 'viem';
import { useBondingCurve } from '@/hooks/useBondingCurve';

interface BondingCurveInfoProps {
  contractAddress: string;
  tokenTicker: string;
}

export const BondingCurveInfo: React.FC<BondingCurveInfoProps> = ({
  contractAddress,
  tokenTicker,
}) => {
  const { bondingCurveData } = useBondingCurve(contractAddress);

  if (!bondingCurveData) {
    return (
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h3 className='text-lg font-semibold mb-4'>Bonding Curve Info</h3>
        <div className='animate-pulse space-y-3'>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
          <div className='h-4 bg-gray-200 rounded w-1/2'></div>
          <div className='h-4 bg-gray-200 rounded w-2/3'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border'>
      <h3 className='text-lg font-semibold mb-4'>Bonding Curve Info</h3>

      <div className='space-y-4'>
        {/* Status */}
        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-600'>Buy Status:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              bondingCurveData.buyIsOpen
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {bondingCurveData.buyIsOpen ? 'Open' : 'Closed'}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-600'>Sell Status:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              bondingCurveData.sellIsOpen
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {bondingCurveData.sellIsOpen ? 'Open' : 'Closed'}
          </span>
        </div>

        {/* Reserve Ratios */}
        <div className='pt-4 border-t border-gray-200'>
          <h4 className='text-sm font-medium text-gray-700 mb-3'>Prices</h4>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Buy Price:</span>
              <span className='text-sm font-medium'>
                {bondingCurveData.BuyPrice} WPOL
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Sell Price:</span>
              <span className='text-sm font-medium'>
                {bondingCurveData.SellPrice} WPOL
              </span>
            </div>
          </div>
        </div>

        {/* Virtual Supplies */}
        <div className='pt-4 border-t border-gray-200'>
          <h4 className='text-sm font-medium text-gray-700 mb-3'>
            Virtual Supplies
          </h4>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>
                Virtual Collateral Supply:
              </span>
              <span className='text-sm font-medium'>
                {Number(
                  formatUnits(bondingCurveData.virtualCollateralSupply, 18),
                ).toFixed(3)}{' '}
                WPOL
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>
                Virtual Issuance Supply:
              </span>
              <span className='text-sm font-medium'>
                {Number(
                  formatUnits(bondingCurveData.virtualIssuanceSupply, 18),
                ).toFixed(3)}{' '}
                {tokenTicker}
              </span>
            </div>
          </div>
        </div>

        {/* Token Addresses */}
        <div className='pt-4 border-t border-gray-200'>
          <h4 className='text-sm font-medium text-gray-700 mb-3'>
            Token Addresses
          </h4>
          <div className='space-y-2'>
            <div>
              <span className='text-sm text-gray-600 block'>
                Collateral Token:
              </span>
              <span className='text-xs font-mono text-gray-500 break-all'>
                {bondingCurveData.token}
              </span>
            </div>
            <div>
              <span className='text-sm text-gray-600 block'>
                Issuance Token:
              </span>
              <span className='text-xs font-mono text-gray-500 break-all'>
                {bondingCurveData.issuanceToken}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
