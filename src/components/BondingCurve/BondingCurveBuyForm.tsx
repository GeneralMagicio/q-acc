'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import Input from '../Input';
import { useBondingCurve } from '@/hooks/useBondingCurve';

interface BondingCurveBuyFormProps {
  contractAddress: string;
  onSuccess?: (hash: string) => void;
  onError?: (error: Error) => void;
}

interface BuyFormData {
  depositAmount: string;
  minAmountOut: string;
}

export const BondingCurveBuyForm: React.FC<BondingCurveBuyFormProps> = ({
  contractAddress,
  onSuccess,
  onError,
}) => {
  const { isConnected } = useAccount();
  const [calculatedTokens, setCalculatedTokens] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5); // 0.5% default slippage

  const { bondingCurveData, calculatePurchaseReturn, buyTokens, buyTokensFor } =
    useBondingCurve(contractAddress);

  const methods = useForm<BuyFormData>({
    defaultValues: {
      depositAmount: '',
      minAmountOut: '',
    },
  });

  const { watch, setValue, handleSubmit } = methods;
  const depositAmount = watch('depositAmount');

  // Calculate tokens when deposit amount changes
  useEffect(() => {
    const calculateTokens = async () => {
      if (!depositAmount || parseFloat(depositAmount) <= 0) {
        setCalculatedTokens('');
        return;
      }

      try {
        const result = await calculatePurchaseReturn.mutateAsync(depositAmount);
        setCalculatedTokens(result);

        // Calculate minimum amount out based on slippage
        const minAmountOut = parseFloat(result) * (1 - slippage / 100);
        setValue('minAmountOut', minAmountOut.toFixed(6));
      } catch (error) {
        console.error('Error calculating purchase return:', error);
        setCalculatedTokens('');
      }
    };

    calculateTokens();
  }, [depositAmount, slippage, calculatePurchaseReturn, setValue]);

  const onSubmit = async (data: BuyFormData) => {
    if (!isConnected) {
      onError?.(new Error('Wallet not connected'));
      return;
    }

    if (!bondingCurveData?.buyIsOpen) {
      onError?.(new Error('Buying is currently disabled'));
      return;
    }

    try {
      const hash = await buyTokens.mutateAsync({
        depositAmount: data.depositAmount,
        minAmountOut: data.minAmountOut,
      });

      onSuccess?.(hash);
      methods.reset();
      setCalculatedTokens('');
    } catch (error) {
      console.error('Error buying tokens:', error);
      onError?.(error as Error);
    }
  };

  if (!isConnected) {
    return (
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h3 className='text-lg font-semibold mb-4'>Buy Tokens</h3>
        <p className='text-gray-600'>
          Please connect your wallet to buy tokens.
        </p>
      </div>
    );
  }

  if (!bondingCurveData?.buyIsOpen) {
    return (
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h3 className='text-lg font-semibold mb-4'>Buy Tokens</h3>
        <p className='text-red-600'>
          Buying is currently disabled for this bonding curve.
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border'>
      <h3 className='text-lg font-semibold mb-4'>Buy Tokens</h3>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <Input
            name='depositAmount'
            label='Amount to Deposit (WPOL)'
            type='number'
            min='0'
            rules={{
              required: 'Deposit amount is required',
              min: { value: 0, message: 'Amount must be greater than 0' },
            }}
            placeholder='0.0'
          />

          {calculatedTokens && (
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600'>You will receive:</span>
                <span className='text-lg font-semibold text-green-600'>
                  {parseFloat(calculatedTokens).toFixed(6)} tokens
                </span>
              </div>

              {bondingCurveData && (
                <div className='mt-2 text-xs text-gray-500'>
                  <div className='flex justify-between'>
                    <span>Buy Price:</span>
                    <span>{bondingCurveData.BuyPrice} WPOL</span>
                  </div>
                </div>
              )}
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
            label='Minimum Tokens to Receive'
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
            loading={buyTokens.isPending || buyTokensFor.isPending}
            color={ButtonColor.Green}
            styleType={ButtonStyle.Solid}
            className='w-full'
            disabled={!depositAmount || parseFloat(depositAmount) <= 0}
          >
            {buyTokens.isPending || buyTokensFor.isPending
              ? 'Buying Tokens...'
              : 'Buy Tokens'}
          </Button>
        </form>
      </FormProvider>

      {(buyTokens.error || buyTokensFor.error) && (
        <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
          <p className='text-red-600 text-sm'>
            Error: {(buyTokens.error || buyTokensFor.error)?.message}
          </p>
        </div>
      )}
    </div>
  );
};
