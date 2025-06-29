'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import Input from '../Input';
import {
  useBondingCurve,
  useCalculateSaleReturn,
} from '@/hooks/useBondingCurve';

interface BondingCurveSellFormProps {
  contractAddress: string;
  tokenTicker: string;
  onSuccess?: (hash: string) => void;
  onError?: (error: Error) => void;
}

interface SellFormData {
  depositAmount: string;
  minAmountOut: string;
}

export const BondingCurveSellForm: React.FC<BondingCurveSellFormProps> = ({
  contractAddress,
  tokenTicker,
  onSuccess,
  onError,
}) => {
  const { isConnected } = useAccount();
  const [slippage, setSlippage] = useState<number>(0.5); // 0.5% default slippage

  const { bondingCurveData, sellTokens, sellTokensTo } =
    useBondingCurve(contractAddress);

  const methods = useForm<SellFormData>({
    defaultValues: {
      depositAmount: '',
      minAmountOut: '',
    },
  });

  const { watch, setValue, handleSubmit } = methods;
  const depositAmount = watch('depositAmount');

  // Use the cached calculation hook with built-in debouncing
  const { data: calculatedWpol, isLoading: isCalculating } =
    useCalculateSaleReturn(contractAddress, depositAmount);

  // Update minimum amount out when calculation changes
  useEffect(() => {
    if (calculatedWpol && !isCalculating) {
      const minAmountOut = parseFloat(calculatedWpol) * (1 - slippage / 100);
      setValue('minAmountOut', minAmountOut.toFixed(6));
    }
  }, [calculatedWpol, slippage, setValue, isCalculating]);

  const onSubmit = async (data: SellFormData) => {
    if (!isConnected) {
      onError?.(new Error('Wallet not connected'));
      return;
    }

    if (!bondingCurveData?.sellIsOpen) {
      onError?.(new Error('Selling is currently disabled'));
      return;
    }

    try {
      const hash = await sellTokens.mutateAsync({
        depositAmount: data.depositAmount,
        minAmountOut: data.minAmountOut,
      });

      onSuccess?.(hash);
      methods.reset();
    } catch (error) {
      console.error('Error selling tokens:', error);
      onError?.(error as Error);
    }
  };

  if (!isConnected) {
    return (
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h3 className='text-lg font-semibold mb-4'>Sell Tokens</h3>
        <p className='text-gray-600'>
          Please connect your wallet to sell tokens.
        </p>
      </div>
    );
  }

  if (!bondingCurveData?.sellIsOpen) {
    return (
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h3 className='text-lg font-semibold mb-4'>Sell Tokens</h3>
        <p className='text-red-600'>
          Selling is currently disabled for this bonding curve.
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border'>
      <h3 className='text-lg font-semibold mb-4'>Sell Tokens</h3>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <Input
            name='depositAmount'
            label={`Amount (${tokenTicker})`}
            type='number'
            min='0'
            rules={{
              required: 'Amount is required',
              min: { value: 0, message: 'Amount must be greater than 0' },
            }}
            placeholder='0.0'
          />

          {calculatedWpol && !isCalculating && (
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600'>You will receive:</span>
                <span className='text-lg font-semibold text-green-600'>
                  {parseFloat(calculatedWpol).toFixed(6)} WPOL
                </span>
              </div>

              {bondingCurveData && (
                <div className='mt-2 text-xs text-gray-500'>
                  <div className='flex justify-between'>
                    <span>Sell Price:</span>
                    <span>{bondingCurveData.SellPrice} WPOL</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {isCalculating && depositAmount && parseFloat(depositAmount) > 0 && (
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600'>Calculating...</span>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500'></div>
              </div>
            </div>
          )}

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Slippage Tolerance
            </label>
            <div className='flex gap-2'>
              {[0.1, 0.5, 1.0].map(value => (
                <button
                  key={value}
                  type='button'
                  onClick={() => setSlippage(value)}
                  className={`px-3 py-1 rounded text-sm ${
                    slippage === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>

          <Input
            name='minAmountOut'
            label='Minimum WPOL to Receive'
            type='number'
            min='0'
            rules={{
              required: 'Minimum amount out is required',
              min: { value: 0, message: 'Amount must be greater than 0' },
            }}
            placeholder='0.0'
          />

          <Button
            type='submit'
            loading={sellTokens.isPending || sellTokensTo.isPending}
            color={ButtonColor.Giv}
            styleType={ButtonStyle.Solid}
            disabled={
              !depositAmount || parseFloat(depositAmount) <= 0 || isCalculating
            }
          >
            {sellTokens.isPending || sellTokensTo.isPending
              ? 'Selling Tokens...'
              : 'Swap'}
          </Button>
        </form>
      </FormProvider>

      {(sellTokens.error || sellTokensTo.error) && (
        <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
          <p className='text-red-600 text-sm'>
            Error: {(sellTokens.error || sellTokensTo.error)?.message}
          </p>
        </div>
      )}
    </div>
  );
};
