import { requestGraphQL } from '@/helpers/request';
import { GET_ACTIVE_ROUND } from '@/queries/round.query';
import { IEarlyAccessRound } from '@/types/round.type';

export const fetchActiveRoundDetails = async () => {
  try {
    const res = await requestGraphQL<{
      activeRound: {
        activeRound: IEarlyAccessRound;
      };
    }>(GET_ACTIVE_ROUND, {});
    return res?.activeRound.activeRound;
  } catch (error) {
    console.error(error);
  }
};
