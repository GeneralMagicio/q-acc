'use client';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import DonateNavbar from './DonatePageNavbar';
import DonatePageBody from './DonatePageBody';
import { checkUserOwnsNFT } from '@/helpers/token';

import { useDonateContext } from '@/context/donation.context';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { NFTModal } from '../Modals/NFTModal';
import { ConnectModal } from '../ConnectModal';

const DonateIndex = () => {
  const [ownsNFT, setOwnsNFT] = useState(false);
  const { address, isConnected } = useAccount();
  const { projectData } = useDonateContext();
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkNFT = async () => {
      setLoading(true);
      if (projectData?.abc?.nftContractAddress && address) {
        const res = await checkUserOwnsNFT(
          projectData.abc.nftContractAddress,
          address,
        );
        setOwnsNFT(res);
        setLoading(false);
      }
    };
    checkNFT();
  }, [projectData?.abc?.nftContractAddress, address, ownsNFT]);

  if (!isConnected) {
    return (
      <>
        <ConnectModal
          isOpen={true}
          onClose={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </>
    );
  }
  if (loading) {
    return;
  }
  if (activeRoundDetails?.__typename === 'EarlyAccessRound' && !ownsNFT) {
    return (
      <NFTModal isOpen={true} onClose={() => true} showCloseButton={false} />
    );
  }

  return (
    <div>
      <DonateNavbar />
      <DonatePageBody />
    </div>
  );
};

export default DonateIndex;
