'use client';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import DonateNavbar from './DonatePageNavbar';
import DonatePageBody from './DonatePageBody';
import { checkUserOwnsNFT } from '@/helpers/token';

import { useDonateContext } from '@/context/donation.context';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { NFTModal } from '../Modals/NFTModal';

const DonateIndex = () => {
  const [ownsNFT, setOwnsNFT] = useState(false);
  const { address } = useAccount();
  const { projectData } = useDonateContext();
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();

  useEffect(() => {
    const checkNFT = async () => {
      if (projectData?.abc?.nftContractAddress && address) {
        const res = await checkUserOwnsNFT(
          projectData.abc.nftContractAddress,
          address,
        );
        setOwnsNFT(res);
      }
    };
    checkNFT();
  }, [projectData?.abc?.nftContractAddress, address, ownsNFT]);

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
