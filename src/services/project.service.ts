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
  GET_PROJECT_METADATA_BY_SLUG,
  GET_PROJECTS_COUNT_BY_USER_ID,
  UPDATE_PROJECT_BY_ID,
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
    res?.allProjects.projects.sort((a, b) =>
      a.seasonNumber < b.seasonNumber ? -1 : 1,
    );

    return res?.allProjects;
  } catch (error) {
    console.error(error);
  }
};

export const updateProjectById = async (
  projectId: number,
  newProjectData: any,
) => {
  try {
    const res = await requestGraphQL<{ updateProject: any }>(
      UPDATE_PROJECT_BY_ID,
      {
        projectId,
        newProjectData,
      },
      {
        auth: true,
      },
    );
    return res?.updateProject;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectByUserId = async (
  userId: number,
): Promise<IProject | undefined> => {
  try {
    const res = await requestGraphQL<{
      projectsByUserId: {
        projects: IProject[];
      };
    }>(
      GET_PROJECT_BY_USER_ID,
      {
        userId,
        take: 1,
      },
      {
        auth: true,
      },
    );
    return res?.projectsByUserId.projects[0];
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectsCountByUserId = async (userId: number) => {
  try {
    const res = await requestGraphQL<{
      projectsByUserId: {
        totalCount: number;
      };
    }>(
      GET_PROJECTS_COUNT_BY_USER_ID,
      {
        userId,
        take: 1,
      },
      {
        auth: true,
      },
    );
    return res?.projectsByUserId.totalCount;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectMetadata = async (slug: string, address?: Address) => {
  try {
    const res = await requestGraphQL<{ projectBySlug: any }>(
      GET_PROJECT_METADATA_BY_SLUG,
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
