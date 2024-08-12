"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/router";
// import { client } from "@/apollo/apolloClient";
import { ChainType, EVerificationStatus, IProject } from "@/apollo/types/types";

// import { compareAddresses, showToastError } from "@/lib/helpers";
import {
  EDirection,
  EDonationStatus,
  EProjectStatus,
  ESortby,
} from "@/apollo/types/gqlEnums";
// import { useAppDispatch, useAppSelector } from "@/features/hooks";
import {
  ACTIVATE_PROJECT,
  FETCH_PROJECT_BY_SLUG_SINGLE_PROJECT,
} from "@/apollo/gql/gqlProjects";
import { IDonationsByProjectIdGQL } from "@/apollo/types/gqlTypes";
import { FETCH_PROJECT_DONATIONS_COUNT } from "@/apollo/gql/gqlDonations";
// import { setShowSignWithWallet } from "@/features/modal/modal.slice";

const dummyData = {
  data: {
    projectBySlug: {
      id: "115",
      title: "Herbs and Drugs and Tools to Combat Sleepiness",
      image:
        "https://giveth.mypinata.cloud/ipfs/QmcQFkNQ3o6f555whoRtFqJgPz6k9nb8WfNEBHk3j2i3CW",
      slug: "herbs-and-drugs-and-tools-to-combat-sleepiness",
      verified: true,
      donations: [],
      totalDonations: 13598.026,
      totalDonationsCount: 20,
      description:
        '<h1>the novelty of rich text has sadly wore off</h1><p><br></p><h2>but I can still try to cause trouble with grey-area projects</h2><p><br></p><p><strong>like this one... I mean... it has "drugs" in the title... but is that really a violation? I\'m raising money to develop drugs to help sleepy people... is that so bad</strong></p><p><br></p><p><strong class="ql-size-small">is it any different really than what the pharmaceutical industry does?</strong></p>',
      addresses: [
        {
          address: "0xc172542e7f4f625bb0301f0bafc423092d9cac71",
          isRecipient: true,
          networkId: 100,
          chainType: undefined,
        },
        {
          address: "0xc172542e7f4f625bb0301f0bafc423092d9cac71",
          isRecipient: true,
          networkId: 5,
          chainType: ChainType.EVM,
        },
      ],
      socialMedia: [],
      totalProjectUpdates: 2,
      creationDate: "2021-09-02T19:02:29.623Z",
      reaction: {
        id: "12",
        userId: "12",
      },
      categories: [
        {
          name: "research",
          value: "Research",
          mainCategory: {
            title: "Technology",
          },
        },
      ],
      adminUser: {
        id: "68",
        name: "Lauren Luz",
        walletAddress: "0xc46c67bb7e84490d7ebdd0b8ecdaca68cf3823f4",
        avatar: "s",
      },
      listed: true,
      status: {
        id: "5",
        name: EProjectStatus.ACTIVE,
      },

      organization: {
        name: "Giveth",
        label: "giveth",
        supportCustomTokens: true,
      },
      verificationFormStatus: EVerificationStatus.DRAFT,
      projectPower: {
        powerRank: 1,
        totalPower: 3677699,
        round: 47670,
      },
      projectFuturePower: {
        totalPower: 3677698.995042,
        powerRank: 1,
        round: 47671,
      },
      givbackFactor: 0.8,
      sumDonationValueUsdForActiveQfRound: 0,
      countUniqueDonorsForActiveQfRound: 0,
      countUniqueDonors: 26,
      estimatedMatching: {
        projectDonationsSqrtRootSum: 0,
        allProjectsSum: 1532.1809627410576,
        matchingPool: 300000,
      },
      updatedAt: "",
      anchorContracts: [],
    },
  },
};

interface IProjectContext {
  projectedRank?: number | null;
  // fetchProjectBySlug: () => Promise<void>;
  // activateProject: () => Promise<void>;
  projectData?: IProject;
  isActive: boolean;
  isDraft: boolean;
  isAdmin: boolean;
  totalDonationsCount: number;
  isCancelled: boolean;
  isLoading: boolean;
}

const ProjectContext = createContext<IProjectContext>({
  // fetchProjectBySlug: () =>
  //   Promise.reject("fetchProjectBySlug not initialed yet!"),
  // activateProject: () => Promise.reject("activateProject not initialed yet!"),
  projectData: undefined,
  isActive: true,
  isDraft: false,
  isAdmin: false,
  totalDonationsCount: 0,
  isCancelled: false,
  isLoading: true,
});
ProjectContext.displayName = "ProjectContext";

export const ProjectProvider = ({
  children,
  project,
}: {
  children: ReactNode;
  project?: IProject;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalDonationsCount, setTotalDonationsCount] = useState(0);

  const [projectedRank, setProjectedRank] = useState<number | undefined | null>(
    undefined
  );

  const [projectData, setProjectData] = useState(project);
  const [isCancelled, setIsCancelled] = useState(false);

  // const { isSignedIn, userData: user } = useAppSelector(
  //   (state: any) => state.user
  // );
  // const dispatch = useAppDispatch();
  // const router = useRouter();
  // const slug = (router.query.projectIdSlug as string)
  //   ? router.query.projectIdSlug
  //   : project?.slug;

  const isAdmin = false;
  //   compareAddresses(
  //     projectData?.adminUser?.walletAddress,
  //     user?.walletAddress
  //   );

  // const hasActiveQFRound = hasActiveRound(projectData?.qfRounds);

  const fetchProjectBySlug = useCallback(async () => {
    // setIsLoading(true);
    // client
    //   .query({
    //     query: FETCH_PROJECT_BY_SLUG_SINGLE_PROJECT,
    //     variables: { slug, connectedWalletUserId: Number(user?.id) },
    //   })
    //   .then((res: { data: { projectBySlug: IProject } }) => {
    //     const _project = res.data.projectBySlug;
    //     if (_project.status.name !== EProjectStatus.CANCEL) {
    //       setProjectData(_project);
    //     } else {
    //       setIsCancelled(true);
    //       setProjectData(undefined);
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch((error: unknown) => {
    //     console.error("fetchProjectBySlug error: ", error);
    //     setIsLoading(false);
    //   });
  }, []);
  useEffect(() => {
    setTotalDonationsCount(20);
    setProjectData(dummyData["data"]?.projectBySlug);
  }, []);
  // const activateProject = async () => {
  //   try {
  //     if (!isSignedIn) {
  //       dispatch(setShowSignWithWallet(true));
  //       return;
  //     }
  //     await client.mutate({
  //       mutation: ACTIVATE_PROJECT,
  //       variables: { projectId: Number(projectData?.id || "") },
  //     });
  //     await fetchProjectBySlug();
  //   } catch (e) {
  //     //   showToastError(e);
  //   }
  // };

  // useEffect(() => {
  //   if (!projectData?.id) return;
  //   client
  //     .query({
  //       query: FETCH_PROJECT_DONATIONS_COUNT,
  //       variables: {
  //         projectId: parseInt(projectData.id),
  //         skip: 0,
  //         take: 1,
  //         status: isAdmin ? null : EDonationStatus.VERIFIED,
  //         orderBy: {
  //           field: ESortby.CREATION_DATE,
  //           direction: EDirection.DESC,
  //         },
  //       },
  //     })
  //     .then((res: IDonationsByProjectIdGQL) => {
  //       const donationsByProjectId = res.data.donationsByProjectId;
  //       setTotalDonationsCount(
  //         donationsByProjectId.totalCount +
  //           donationsByProjectId.recurringDonationsCount
  //       );
  //     })
  //     .catch((error: unknown) => {
  //       // showToastError(error);
  //     });
  // }, [isAdmin, projectData?.id]);

  const isActive = projectData?.status.name === EProjectStatus.ACTIVE;
  const isDraft = projectData?.status.name === EProjectStatus.DRAFT;

  // useEffect(() => {
  //   setIsCancelled(false);
  //   if (user?.isSignedIn && !project) {
  //     fetchProjectBySlug();
  //   } else {
  //     setProjectData(project);
  //   }
  // }, [fetchProjectBySlug, project, user?.isSignedIn]);

  return (
    <ProjectContext.Provider
      value={{
        projectedRank,
        // fetchProjectBySlug,
        // activateProject,
        projectData,
        isActive,
        isDraft,
        isAdmin,
        totalDonationsCount,
        isCancelled,
        isLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export function useProjectContext() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("Project context not found!");
  }

  return context;
}
