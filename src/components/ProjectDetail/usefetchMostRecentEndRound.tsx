import { useEffect, useState } from 'react';
import { getMostRecentEndRound } from '@/helpers/round';
import type { IEarlyAccessRound, IQfRound } from '@/types/round.type';

export const useFetchMostRecentEndRound = (
  activeRoundDetails: IEarlyAccessRound | IQfRound | undefined,
) => {
  const [isRoundEnded, setIsRoundEnded] = useState(false);
  useEffect(() => {
    const fetchMostRecentEndRound = async () => {
      const res = await getMostRecentEndRound();

      return res?.__typename === 'QfRound';
    };

    const getData = async () => {
      const data = await fetchMostRecentEndRound();
      setIsRoundEnded(data);
    };

    getData();
  }, [activeRoundDetails, isRoundEnded]);

  return isRoundEnded;
};
