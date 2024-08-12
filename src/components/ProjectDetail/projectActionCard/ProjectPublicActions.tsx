import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ButtonLink,
  mediaQueries,
  semanticColors,
  IconDonation16,
  SublineBold,
  Flex,
  IconBookmarkFilled16,
  IconBookmark16,
  brandColors,
} from "@giveth/ui-design-system";
import { useIntl } from "react-intl";
import Link from "next/link";
import { useWeb3Modal } from "@web3modal/wagmi/react";
// import ShareModal from '@/components/modals/ShareModal';
// import ShareLikeBadge from '@/components/badges/ShareLikeBadge';
// import { EContentType } from '@/lib/constants/shareContent';
import { useProjectContext } from "@/context/project.context";
// import { useAppSelector } from '@/features/hooks';
// import { isSSRMode, showToastError } from '@/lib/helpers';
// import { useModalCallback } from '@/hooks/useModalCallback';

// import { bookmarkProject, unBookmarkProject } from '@/lib/reaction';
import { FETCH_PROJECT_REACTION_BY_ID } from "@/apollo/gql/gqlProjects";
// import { client } from '@/apollo/apolloClient';
// import { slugToProjectDonate } from '@/lib/routeCreators';
// import { useAlreadyDonatedToProject } from '@/hooks/useAlreadyDonatedToProject';
// import { BadgeButton } from '@/components/project-card/ProjectCardBadgeButtons';
import useMediaQuery from "@/hooks/useMediaQuery";
import { device } from "@/lib/constants/constants";

export const ProjectPublicActions = () => {
  const [showModal, setShowShareModal] = useState<boolean>(false);
  const { projectData, isActive } = useProjectContext();
  const project = projectData!;
  // const { slug, id: projectId } = project;
  // const [reaction, setReaction] = useState(project.reaction);
  const isMobile = !useMediaQuery(device.tablet);
  const [likeLoading, setLikeLoading] = useState(false);
  // const {
  // 	isSignedIn,
  // 	userData: user,
  // 	isEnabled,
  // } = useAppSelector((state:any) => state.user);
  // const { formatMessage } = useIntl();
  const { open: openConnectModal } = useWeb3Modal();
  // const alreadyDonated = useAlreadyDonatedToProject(projectData);

  // useEffect(() => {
  // 	const fetchProjectReaction = async () => {
  // 		if (user?.id && project.id) {
  // 			try {
  // 				const { data } = await client.query({
  // 					query: FETCH_PROJECT_REACTION_BY_ID,
  // 					variables: {
  // 						id: Number(project.id),
  // 						connectedWalletUserId: Number(user?.id),
  // 					},
  // 					fetchPolicy: 'no-cache',
  // 				});
  // 				const _reaction = data?.projectById?.reaction;
  // 				setReaction(_reaction);
  // 			} catch (e) {
  // 				showToastError(e);

  // 			}
  // 		} else {
  // 			setReaction(undefined);
  // 		}
  // 	};
  // 	fetchProjectReaction();
  // }, [project.id, user?.id]);

  // const likeUnlikeProject = async () => {
  // 	if (projectId) {
  // 		setLikeLoading(true);

  // 		try {
  // 			if (!reaction) {
  // 				const newReaction = await bookmarkProject(projectId);
  // 				setReaction(newReaction);
  // 			} else if (reaction?.userId === user?.id) {
  // 				const successful = await unBookmarkProject(reaction.id);
  // 				if (successful) {
  // 					setReaction(undefined);
  // 				}
  // 			}
  // 		} catch (e) {
  // 			showToastError(e);
  // 		} finally {
  // 			setLikeLoading(false);
  // 		}
  // 	}
  // };

  // const { modalCallback: signInThenLike } =
  // 	useModalCallback(likeUnlikeProject);

  // const checkSignInThenLike = () => {
  // 	if (isSSRMode) return;
  // 	if (!isEnabled) {
  // 		openConnectModal?.();
  // 	} else if (!isSignedIn) {
  // 		signInThenLike();
  // 	} else {
  // 		likeUnlikeProject();
  // 	}
  // };
  const alreadyDonated = false;

  return (
    <ProjectPublicActionsWrapper gap="16px">
      {alreadyDonated && (
        <AlreadyDonatedWrapper>
          <IconDonation16 />
          <SublineBold>
            {/* {formatMessage({
							id: 'component.already_donated.once_more',
						})} */}
            Already Donated Once
          </SublineBold>
        </AlreadyDonatedWrapper>
      )}

      <Link id="Donate_Project" href={"/donate"}>
        <DonateButton
          // label={formatMessage({ id: 'label.donate' })}
          label="Donate"
          linkType="primary"
          className={`opacity-75`}
        />
      </Link>
    </ProjectPublicActionsWrapper>
  );
};

const ProjectPublicActionsWrapper = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  ${mediaQueries.tablet} {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  ${mediaQueries.laptopS} {
    flex-direction: column;
  }
`;

const AlreadyDonatedWrapper = styled(Flex)`
  margin: 4px 0;
  gap: 8px;
  color: ${semanticColors.jade[500]};
`;

const DonateButton = styled(ButtonLink)`
  min-width: 220px;
`;

const BadgeWrapper = styled(Flex)`
  justify-content: space-between;
`;

// const StyledBadgeButton = styled(BadgeButton)`
// 	box-shadow: 0px 3px 20px rgba(212, 218, 238, 0.4);
// 	width: 48px;
// 	border-radius: 24px;
// 	padding: 0 16px;
// 	&::after {
// 		border-radius: 24px;
// 	}
// `;
