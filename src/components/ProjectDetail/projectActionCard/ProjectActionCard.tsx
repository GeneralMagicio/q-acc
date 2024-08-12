import { useProjectContext } from "@/context/project.context";
import { Flex, mediaQueries, neutralColors } from "@giveth/ui-design-system";
import React from "react";
import styled from "styled-components";
import { DonateSection } from "./DonationSection";
import useMediaQuery from "@/hooks/useMediaQuery";
import { device } from "@/lib/constants/constants";
import { ProjectPublicActions } from "./ProjectPublicActions";
import MobileDonateFooter from "./MobileDonateFooter";

export const ProjectActionCard = () => {
  const isMobile = !useMediaQuery(device.tablet);
  const { isAdmin } = useProjectContext();

  if (isMobile) {
    if (!isAdmin) {
      return <MobileDonateFooter />;
    }
    return null;
  }

  return (
    <ProjectActionCardWrapper
      $flexDirection="column"
      $justifyContent="space-between"
    >
      <ProjectActionInnerCard />
    </ProjectActionCardWrapper>
  );
};

const ProjectActionInnerCard = () => {
  const { isAdmin, isDraft, projectData } = useProjectContext();
  const isMobile = !useMediaQuery(device.tablet);
  // const { formatMessage } = useIntl();

  return (
    <>
      {/* {isAdmin && !isDraft && <AdminActions />} */}
      {!isMobile && <DonateSection projectData={projectData} />}
      {!isMobile && !isAdmin && <ProjectPublicActions />}
      {/* {isAdmin && <ProjectStats />} */}
    </>
  );
};
const ProjectActionCardWrapper = styled(Flex)`
  background-color: ${neutralColors.gray[100]};
  border-radius: 16px;
  height: 100%;
  padding-top: 12px;
  ${mediaQueries.tablet} {
    padding: 16px 24px;
  }
`;
