'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { Address } from 'viem';
import { useAppKit } from '@reown/appkit/react';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import Input from '../Input';
import {
  useBondingCurve,
  useCalculatePurchaseReturn,
} from '@/hooks/useBondingCurve';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import config from '@/config/configuration';
import { executeBuyFlow } from '@/services/bondingCurveProxy.service';
import { TransactionStatusModal } from './TransactionStatusModal';

interface BondingCurveBuyFormProps {
  contractAddress: string;
  tokenTicker: string;
  onSuccess?: (result: {
    wrapHash?: string;
    approvalHash?: string;
    buyHash: string;
  }) => void;
  onError?: (error: Error) => void;
}

interface BuyFormData {
  depositAmount: string;
  minAmountOut: string;
}

export const BondingCurveBuyForm: React.FC<BondingCurveBuyFormProps> = ({
  contractAddress,
  tokenTicker,
  onSuccess,
  onError,
}) => {
  const { isConnected, address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { open } = useAppKit();
  const [slippage, setSlippage] = useState<number>(0.5); // 0.5% default slippage
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<string>('');
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [checkingBalance, setCheckingBalance] = useState(false);

  const { bondingCurveData } = useBondingCurve(contractAddress);

  const { data: roleCheckData } = useRoleCheck(
    contractAddress,
    config.PROXY_CONTRACT_ADDRESS,
  );

  const methods = useForm<BuyFormData>({
    defaultValues: {
      depositAmount: '',
      minAmountOut: '',
    },
  });

  const { watch, setValue, handleSubmit } = methods;
  const depositAmount = watch('depositAmount');

  // Use the cached calculation hook with built-in debouncing
  const { data: calculatedTokens, isLoading: isCalculating } =
    useCalculatePurchaseReturn(contractAddress, depositAmount);

  // Update minimum amount out when calculation changes
  useEffect(() => {
    if (calculatedTokens && !isCalculating) {
      const minAmountOut = parseFloat(calculatedTokens) * (1 - slippage / 100);
      setValue('minAmountOut', minAmountOut.toFixed(6));
    }
  }, [calculatedTokens, slippage, setValue, isCalculating]);

  // Check user POL balance on depositAmount change
  useEffect(() => {
    const checkBalance = async () => {
      setBalanceError(null);
      if (
        !publicClient ||
        !address ||
        !depositAmount ||
        isNaN(Number(depositAmount)) ||
        Number(depositAmount) <= 0
      )
        return;
      setCheckingBalance(true);
      try {
        // Check if POL is native token (zero address) or ERC20
        if (
          config.ERC_TOKEN_ADDRESS ===
          '0x0000000000000000000000000000000000000000'
        ) {
          // Native token - use getBalance
          const balance = await publicClient.getBalance({
            address: address as Address,
          });
          const userBalance = Number(balance) / 1e18;
          if (userBalance < Number(depositAmount)) {
            setBalanceError(
              `Insufficient POL balance. You need ${depositAmount} POL but have ${userBalance.toFixed(6)} POL.`,
            );
          }
        } else {
          // ERC20 token - use balanceOf
          const balance = await publicClient.readContract({
            address: config.ERC_TOKEN_ADDRESS as Address,
            abi: [
              {
                inputs: [
                  { internalType: 'address', name: 'account', type: 'address' },
                ],
                name: 'balanceOf',
                outputs: [
                  { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            functionName: 'balanceOf',
            args: [address as Address],
          });
          const userBalance = Number(balance) / 1e18;
          if (userBalance < Number(depositAmount)) {
            setBalanceError(
              `Insufficient POL balance. You need ${depositAmount} POL but have ${userBalance.toFixed(6)} POL.`,
            );
          }
        }
      } catch (e: any) {
        setBalanceError('Failed to check balance.');
      } finally {
        setCheckingBalance(false);
      }
    };
    checkBalance();
  }, [publicClient, address, depositAmount]);

  const handleStatusUpdate = (status: string) => {
    setTransactionStatus(status);
  };

  const onSubmit = async (data: BuyFormData) => {
    if (!isConnected || !address || !publicClient || !walletClient) {
      onError?.(new Error('Wallet not connected or clients not available'));
      return;
    }

    if (!bondingCurveData?.buyIsOpen || !roleCheckData?.hasRole) {
      onError?.(
        new Error('Buying is currently disabled or you lack permission'),
      );
      return;
    }

    setIsProcessing(true);
    setShowStatusModal(true);
    setTransactionStatus('Starting transaction...');

    try {
      // Execute the complete buy flow with approval
      const result = await executeBuyFlow(
        publicClient,
        walletClient,
        address,
        contractAddress,
        data.depositAmount,
        data.minAmountOut,
        handleStatusUpdate,
      );

      // Call onSuccess with the complete result object
      onSuccess?.(result);
      methods.reset();
    } catch (error) {
      console.error('Error in buy flow:', error);
      onError?.(error as Error);
    } finally {
      setIsProcessing(false);
      // Keep modal open for a moment to show final status
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
        <h3 className='text-lg font-semibold mb-4'>Buy Tokens</h3>
        <p className='text-gray-600 mb-4'>
          Please connect your wallet to buy tokens.
        </p>
        <Button
          onClick={() => open()}
          color={ButtonColor.Giv}
          styleType={ButtonStyle.Solid}
        >
          Connect Wallet
        </Button>
      </div>
    );
  }

  if (bondingCurveData === undefined || roleCheckData === undefined) {
    return (
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h3 className='text-lg font-semibold mb-4'>Buy Tokens</h3>
        <div className='flex items-center justify-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          <span className='ml-3 text-gray-600'>Checking permissions...</span>
        </div>
      </div>
    );
  }

  if (!bondingCurveData?.buyIsOpen || !roleCheckData?.hasRole) {
    console.log('has correct role:', roleCheckData?.hasRole);
    console.log('bonding curve buy is open:', bondingCurveData?.buyIsOpen);

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
    <>
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h3 className='text-lg font-semibold mb-4'>Buy Tokens</h3>
        {balanceError && (
          <div className='mb-2 text-red-600 text-sm'>{balanceError}</div>
        )}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <Input
              name='depositAmount'
              label='Amount (POL)'
              type='float'
              min='0'
              rules={{
                required: 'Amount is required',
                min: { value: 0, message: 'Amount must be greater than 0' },
              }}
              placeholder='0.0'
              disabled={isProcessing}
            />

            {calculatedTokens && !isCalculating && (
              <div className='bg-gray-50 rounded-lg p-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>
                    You will receive:
                  </span>
                  <span className='text-lg font-semibold text-green-600'>
                    {parseFloat(calculatedTokens).toFixed(6)} {tokenTicker}
                  </span>
                </div>

                {bondingCurveData && (
                  <div className='mt-2 text-xs text-gray-500'>
                    <div className='flex justify-between'>
                      <span>Buy Price:</span>
                      <span>{bondingCurveData.BuyPrice} POL</span>
                    </div>
                  </div>
                )}
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
              label={`Minimum Tokens to Receive (${tokenTicker})`}
              type='float'
              min='0'
              rules={{
                required: 'Minimum amount out is required',
                min: { value: 0, message: 'Amount must be greater than 0' },
              }}
              placeholder='0.0'
              disabled={isProcessing}
            />

            <div className='flex space-x-4'>
              <Button
                type='submit'
                color={ButtonColor.Giv}
                styleType={ButtonStyle.Solid}
                disabled={
                  isProcessing ||
                  isCalculating ||
                  !!balanceError ||
                  checkingBalance
                }
              >
                {isProcessing ? 'Processing...' : 'Swap'}
              </Button>
            </div>
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
