'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import Input from '../Input';
import {
  useBondingCurve,
  useCalculateSaleReturn,
} from '@/hooks/useBondingCurve';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import config from '@/config/configuration';
import { executeSellFlow } from '@/services/bondingCurveProxy.service';
import { TransactionStatusModal } from './TransactionStatusModal';
import { Address } from 'viem';

interface BondingCurveSellFormProps {
  contractAddress: string;
  tokenTicker: string;
  tokenAddress: string;
  onSuccess?: (result: { approvalHash?: string; sellHash: string; unwrapHash?: string }) => void;
  onError?: (error: Error) => void;
}

interface SellFormData {
  depositAmount: string;
  minAmountOut: string;
}

const ERC20_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const BondingCurveSellForm: React.FC<BondingCurveSellFormProps> = ({
  contractAddress,
  tokenAddress,
  tokenTicker,
  onSuccess,
  onError,
}) => {
  const { isConnected, address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [slippage, setSlippage] = useState<number>(0.5); // 0.5% default slippage
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<string>('');
  const [transactionResult, setTransactionResult] = useState<null | {
    approvalHash?: string;
    sellHash: string;
  }>(null);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [checkingBalance, setCheckingBalance] = useState(false);

  const { bondingCurveData } = useBondingCurve(contractAddress);
  const { data: roleCheckData } = useRoleCheck(
    contractAddress,
    config.PROXY_CONTRACT_ADDRESS,
  );

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

  // Check user ABC token balance on depositAmount change
  useEffect(() => {
    const checkBalance = async () => {
      setBalanceError(null);
      if (!publicClient || !address || !depositAmount || isNaN(Number(depositAmount)) || Number(depositAmount) <= 0) return;
      setCheckingBalance(true);
      try {
        const balance = await publicClient.readContract({
          address: tokenAddress as Address,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [address as Address],
        });
        const userBalance = Number(balance) / 1e18;
        if (userBalance < Number(depositAmount)) {
          setBalanceError(`Insufficient balance. You need ${depositAmount} ${tokenTicker} but have ${userBalance}.`);
        }
      } catch (e: any) {
        setBalanceError('Failed to check balance.');
      } finally {
        setCheckingBalance(false);
      }
    };
    checkBalance();
  }, [publicClient, address, depositAmount, tokenAddress, tokenTicker]);

  const handleStatusUpdate = (status: string) => {
    setTransactionStatus(status);
  };

  const onSubmit = async (data: SellFormData) => {
    if (!isConnected || !address || !publicClient || !walletClient) {
      onError?.(new Error('Wallet not connected or clients not available'));
      return;
    }
    if (!bondingCurveData?.sellIsOpen || !roleCheckData?.hasRole) {
      onError?.(
        new Error('Selling is currently disabled or you lack permission'),
      );
      return;
    }
    setIsProcessing(true);
    setShowStatusModal(true);
    setTransactionStatus('Starting transaction...');
    try {
      const result = await executeSellFlow(
        publicClient,
        walletClient,
        address,
        contractAddress,
        tokenAddress,
        data.depositAmount,
        data.minAmountOut,
        handleStatusUpdate,
      );
      setTransactionResult(result);
      onSuccess?.(result);
      methods.reset();
    } catch (error) {
      console.error('Error in sell flow:', error);
      onError?.(error as Error);
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setShowStatusModal(false);
        setTransactionStatus('');
      }, 60000);
    }
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    setTransactionStatus('');
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

  if (bondingCurveData === undefined || roleCheckData === undefined) {
    return (
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h3 className='text-lg font-semibold mb-4'>Sell Tokens</h3>
        <div className='flex items-center justify-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          <span className='ml-3 text-gray-600'>Checking permissions...</span>
        </div>
      </div>
    );
  }

  if (!bondingCurveData?.sellIsOpen || !roleCheckData?.hasRole) {
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
    <>
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h3 className='text-lg font-semibold mb-4'>Sell Tokens</h3>
        {balanceError && (
          <div className='mb-2 text-red-600 text-sm'>{balanceError}</div>
        )}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <Input
              name='depositAmount'
              label={`Amount (${tokenTicker})`}
              type='float'
              min='0'
              rules={{
                required: 'Amount is required',
                min: { value: 0, message: 'Amount must be greater than 0' },
              }}
              placeholder='0.0'
              disabled={isProcessing}
            />
            {calculatedWpol && !isCalculating && (
              <div className='bg-gray-50 rounded-lg p-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>
                    You will receive:
                  </span>
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
            {isCalculating &&
              depositAmount &&
              parseFloat(depositAmount) > 0 && (
                <div className='bg-gray-50 rounded-lg p-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>
                      Calculating...
                    </span>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500'></div>
                  </div>
                </div>
              )}
            {/* Slippage Settings */}
            {/* <div className='pt-4 border-t border-gray-200'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm text-gray-600'>
                  Slippage Tolerance:
                </span>
                <span className='text-sm font-medium'>{slippage}%</span>
              </div>
              <div className='flex space-x-2'>
                {[0.1, 0.5, 1.0].map(value => (
                  <button
                    key={value}
                    type='button'
                    onClick={() => setSlippage(value)}
                    className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                      slippage === value
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>
            </div> */}

            <Input
              name='minAmountOut'
              label='Minimum WPOL to Receive'
              type='float'
              min='0'
              rules={{
                required: 'Minimum amount out is required',
                min: { value: 0, message: 'Amount must be greater than 0' },
              }}
              placeholder='0.0'
              disabled={isProcessing}
            />
            <Button
              type='submit'
              color={ButtonColor.Giv}
              styleType={ButtonStyle.Solid}
              disabled={isProcessing || isCalculating || !!balanceError || checkingBalance}
            >
              {isProcessing ? 'Processing...' : 'Swap'}
            </Button>
          </form>
        </FormProvider>
      </div>
      {/* Transaction Status Modal */}
      <TransactionStatusModal
        isOpen={showStatusModal}
        status={transactionStatus}
        onClose={handleCloseStatusModal}
      />
    </>
  );
};
