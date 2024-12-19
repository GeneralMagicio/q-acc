import { requestGraphQL } from '@/helpers/request';
import {
  GET_ACTIVE_ROUND,
  GET_ALL_ROUNDS,
  GET_PROJECT_ROUND_RECORDS,
  GET_QACC_ROUND_STATS,
} from '@/queries/round.query';
import { IEarlyAccessRound, IQaccStats, IQfRound } from '@/types/round.type';

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

export const fetchQaccRoundStats = async () => {
  try {
    const res = await requestGraphQL<{
      qAccStat: IQaccStats;
    }>(GET_QACC_ROUND_STATS, {});
    return res?.qAccStat;
  } catch (error) {
    console.error(error);
  }
};
