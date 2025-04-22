import { useMemo } from 'react';
import { useFetchWalletsInfo } from './useFetchWalletsInfo';
import { useActualWalletName } from './useActualWalletName';

export interface WalletMetadata {
  id: string;
  name: string;
  slug: string;
  description: string;
  homepage: string;
  chains: string[];
  versions: string[];
  sdks: string[];
  app_type: string;
  category: string;
  image_id: string;
  image_url: {
    sm: string;
    md: string;
    lg: string;
  };
  app: {
    browser: string | null;
    ios: string | null;
    android: string | null;
    mac: string | null;
    windows: string | null;
    linux: string | null;
    chrome: string | null;
    firefox: string | null;
    safari: string | null;
    edge: string | null;
    opera: string | null;
  };
  injected?: {
    namespace: string;
    injected_id: string;
  }[];
  rdns: string | null;
  mobile: {
    native: string;
    universal: string | null;
  };
  desktop: {
    native: string;
    universal: string | null;
  };
  metadata: {
    shortName: string;
    colors: {
      primary: string | null;
      secondary: string | null;
    };
  };
  updatedAt: string;
}

export const useWalletInfo = (): WalletMetadata | null => {
  const walletName = useActualWalletName();
  const { data: walletsInfo } = useFetchWalletsInfo();

  const matchedWallet = useMemo(() => {
    if (!walletName || !walletsInfo?.listings) return null;

    const normalized = walletName.toLowerCase().trim();

    return (
      Object.values(walletsInfo.listings).find((wallet: any) =>
        wallet.name.toLowerCase().includes(normalized),
      ) ?? null
    );
  }, [walletName, walletsInfo]);

  return matchedWallet as WalletMetadata | null;
};
