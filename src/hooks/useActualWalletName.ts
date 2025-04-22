import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

export function useActualWalletName() {
  const { connector } = useAccount();
  const [walletName, setWalletName] = useState<string | null>(null);

  useEffect(() => {
    const getWalletBrand = async () => {
      if (!connector || connector.id !== 'walletConnect') {
        setWalletName(connector?.name ?? null);
        return;
      }

      try {
        const provider = await connector.getProvider();
        const metadata = (provider as any)?.session?.peer?.metadata;
        const name = metadata?.name;
        setWalletName(name ?? connector.name);
      } catch (err) {
        setWalletName(connector?.name ?? null);
      }
    };

    getWalletBrand();
  }, [connector]);

  return walletName;
}
