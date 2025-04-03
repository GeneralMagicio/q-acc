import { requestGraphQL } from '@/helpers/request';
import { FETCH_LEADERBOARD } from '@/queries/points.query';

export type SortField = 'QaccPoints' | 'ProjectsFundedCount';
export type SortDirection = 'ASC' | 'DESC';

export interface IOrderBy {
  field: SortField;
  direction: SortDirection;
}

export interface ILeaderBoardInfo {
  getUsersByQaccPoints: {
    totalCount: number;
    users: {
      id: string;
      name: string;
      email: string;
      qaccPoints: number;
      qaccPointsMultiplier: number;
      projectsFundedCount: number;
    }[];
  };
}

export const fetchLeaderBoard = async (
  take: number,
  skip: number,
  orderBy: IOrderBy,
) => {
  try {
    const res = await requestGraphQL<ILeaderBoardInfo>(FETCH_LEADERBOARD, {
      take,
      skip,
      orderBy,
    });
    return res?.getUsersByQaccPoints;
  } catch (error) {
    console.error(error);
  }
};
