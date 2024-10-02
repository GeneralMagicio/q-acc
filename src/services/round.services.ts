import { requestGraphQL } from '@/helpers/request';
import {
  GET_ACTIVE_ROUND,
  GET_ALL_ROUNDS,
  GET_PROJECT_ROUND_RECORDS,
} from '@/queries/round.query';
import { IEarlyAccessRound, IQfRound } from '@/types/round.type';

export const fetchActiveRoundDetails = async () => {
  try {
    const res = await requestGraphQL<{
      activeRound: {
        activeRound: IEarlyAccessRound | IQfRound;
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
      allRounds: (IEarlyAccessRound | IQfRound)[];
    }>(GET_ALL_ROUNDS, {});
    return res?.allRounds;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectRoundRecords = async (
  projectId: number,
  qfRoundNumber?: number,
  earlyAccessRoundNumber?: number,
) => {
  try {
    const res = await requestGraphQL<{
      getProjectRoundRecords: any;
    }>(GET_PROJECT_ROUND_RECORDS, {
      projectId,
      qfRoundNumber,
      earlyAccessRoundNumber,
    });
    return res?.getProjectRoundRecords;
  } catch (error) {
    console.error(error);
  }
};
