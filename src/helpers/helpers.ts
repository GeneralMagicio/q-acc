import { IProject } from "@/apollo/types/types";

export function ensureHttps(url: string): string {
  if (!url.startsWith("https://")) {
    if (url.startsWith("http://")) {
      // Replace http:// with https://
      url = url.replace("http://", "https://");
    } else {
      // Add https:// if no protocol is present
      url = "https://" + url;
    }
  }
  return url;
}
interface ProjectProps {
  project: IProject;
}
export async function getProjectbySlug(): Promise<{ props: ProjectProps }> {
  // const { query } = props;
  // const slug = decodeURI(query.projectIdSlug).replace(/\s/g, "");

  // const { data } = await client.query({
  //   query: FETCH_PROJECT_BY_SLUG_SINGLE_PROJECT,
  //   variables: { slug },
  //   fetchPolicy: "no-cache",
  // });

  const project: IProject = {
    id: "115",
    title: "Herbs and Drugs and Tools to Combat Sleepiness",
    image:
      "https://giveth.mypinata.cloud/ipfs/QmcQFkNQ3o6f555whoRtFqJgPz6k9nb8WfNEBHk3j2i3CW",
    slug: "herbs-and-drugs-and-tools-to-combat-sleepiness",
    verified: true,
    totalDonations: 13598.026,
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
        chainType: undefined,
      },
    ],
    socialMedia: [],
    totalProjectUpdates: 2,
    creationDate: "2021-09-02T19:02:29.623Z",
    reaction: undefined,
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
      avatar: undefined,
    },
    listed: true,
    status: {
      id: "5",
      name: undefined,
    },
    organization: {
      name: "Giveth",
      label: "giveth",
      supportCustomTokens: true,
    },
    verificationFormStatus: undefined,
    projectPower: {
      powerRank: 1,
      totalPower: 3677699,
      round: 47656,
    },
    projectFuturePower: {
      totalPower: 3677698.9950419995,
      powerRank: 1,
      round: 47657,
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
    anchorContracts: [],
    donations: [],
    updatedAt: "",
  };

  return {
    props: {
      project: project,
    },
  };
}
