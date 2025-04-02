import { Address } from 'viem';

export function shortenAddress(
  address: Address | string | null | undefined,
): string {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
}
