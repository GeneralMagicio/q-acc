import React from 'react';
import { Address } from 'viem';
import { useEnsName } from 'wagmi';
import { shortenAddress } from '@/helpers/address';

// Ensuring the component accepts the correct type for `address`
interface ENSNameProps {
  address: Address;
}

export const ENSName: React.FC<ENSNameProps> = ({ address }) => {
  const { data: name } = useEnsName({ address, chainId: 1 });

  return <div>{name ? name : shortenAddress(address)}</div>; // Show ENS name or fallback to address
};
