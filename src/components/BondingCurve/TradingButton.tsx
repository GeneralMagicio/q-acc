'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { BondingCurveModal } from './BondingCurveModal';

interface TradingButtonProps {
  contractAddress: string;
  tokenTicker: string;
  tokenAddress: string;
  className?: string;
}

export const TradingButton: React.FC<TradingButtonProps> = ({
  contractAddress,
  tokenTicker,
  tokenAddress,
  className = '',
}) => {
  const { isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!isConnected) {
      // You can add a toast notification here
      console.log('Please connect your wallet first');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        color={ButtonColor.Giv}
        styleType={ButtonStyle.Solid}
        className={className}
        disabled={!isConnected}
      >
        {isConnected ? `Trade ${tokenTicker}` : 'Connect Wallet to Trade'}
      </Button>

      <BondingCurveModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        contractAddress={contractAddress}
        tokenAddress={tokenAddress}
        tokenTicker={tokenTicker}
      />
    </>
  );
};
