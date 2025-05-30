import config from '@/config/configuration';
import { getPoolAddressByPair } from '@/helpers/getListedTokenData';
import { useEffect, useState } from 'react';

const PRISMO_TOKEN_ADDRESS = '0x0b7a46e1af45e1eaadeed34b55b6fc00a85c7c68';

export const useGetCurrentTokenPrice = (tokenAddress?: string) => {
  const [isTokenListed, setIsTokenListed] = useState<boolean | null>(null);
  const [currentTokenPrice, setCurrentTokenPrice] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const fetchPoolAddress = async () => {
      if (!tokenAddress) return;

      try {
        const { price, isListed } = await getPoolAddressByPair(
          tokenAddress,
          config.WPOL_TOKEN_ADDRESS,
        );

        setIsTokenListed(isListed);

        const numericPrice = Number(price);
        const finalPrice =
          tokenAddress.toLowerCase() === PRISMO_TOKEN_ADDRESS.toLowerCase()
            ? numericPrice
            : numericPrice === 0
              ? 0
              : 1 / numericPrice;

        setCurrentTokenPrice(finalPrice);
        console.log('Current Price Address:', isListed, finalPrice);
      } catch (error) {
        console.error('Failed to fetch token price:', error);
        setIsTokenListed(null);
        setCurrentTokenPrice(null);
      }
    };

    fetchPoolAddress();
  }, [tokenAddress]);

  return { isTokenListed, currentTokenPrice };
};
