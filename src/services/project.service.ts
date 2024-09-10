import { Address } from 'viem';
import { requestGraphQL } from '@/helpers/request';
import config from '@/config/configuration';
import { IProject, IProjectCreation } from '@/types/project.type';
import {
  CREATE_PROJECT,
  GET_ALL_PROJECTS,
  GET_PROJECT_BY_ID,
  GET_PROJECT_BY_SLUG,
  GET_PROJECT_BY_USER_ID,
} from '@/queries/project.query';
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

export const fetchProjectBySlug = async (slug: string, address?: Address) => {
  try {
    const res = await requestGraphQL<{ projectBySlug: any }>(
      GET_PROJECT_BY_SLUG,
      {
        slug,
        address,
      },
      {
        auth: true,
      },
    );
    return res?.projectBySlug;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllProjects = async () => {
  try {
    const res = await requestGraphQL<{
      allProjects: {
        projects: IProject[];
        totalCount: number;
      };
    }>(
      GET_ALL_PROJECTS,
      {},
      {
        auth: true,
      },
    );
    return res?.allProjects;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectByUserId = async (userId: number) => {
  try {
    const res = await requestGraphQL<{
      project: IProject;
    }>(
      GET_PROJECT_BY_USER_ID,
      {
        userId,
      },
      {
        auth: true,
      },
    );
    return res?.project;
  } catch (error) {
    console.error(error);
  }
};
