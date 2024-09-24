import { requestGraphQL } from '@/helpers/request';
import { GET_ACTIVE_ROUND, GET_ALL_ROUNDS } from '@/queries/round.query';
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

export const fetchAllRoundDetails = async () => {
  try {
    const res = await requestGraphQL<{
      allRounds: any;
    }>(GET_ALL_ROUNDS, {});
    return res?.allRounds;
  } catch (error) {
    console.error(error);
  }
};
