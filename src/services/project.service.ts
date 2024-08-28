import { Address } from 'viem';
import { requestGraphQL } from '@/helpers/request';
import config from '@/config/configuration';
import { IProjectCreation } from '@/types/project.type';
import { CREATE_PROJECT, GET_PROJECT_BY_ID } from '@/queries/project.query';
import type { IGivethUser } from '@/types/user.type';

export const createProject = async (project: IProjectCreation) => {
  try {
    const res = await requestGraphQL<{ userByAddress: IGivethUser }>(
      CREATE_PROJECT,
      { project },
      {
        url: config.GIVETH_GQL_ENDPOINT,
      },
    );
    return res?.userByAddress;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectById = async (id: number, address?: Address) => {
  try {
    const res = await requestGraphQL<{ projectById: any }>(
      GET_PROJECT_BY_ID,
      {
        id,
        address,
      },
      {
        auth: true,
      },
    );
    return res?.projectById;
  } catch (error) {
    console.error(error);
  }
};
