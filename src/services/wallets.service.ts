import { projectId } from '@/config/wagmi';

export const fetchWalletsInfo = () => {
  return fetch(
    `https://explorer-api.walletconnect.com/v3/wallets?projectId=${projectId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then(response => response.json());
};
