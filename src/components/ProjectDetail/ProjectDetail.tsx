"use client";
import { IProject } from "@/apollo/types/types";
import React, { useEffect, useState } from "react";
import ProjectTabs from "./ProjectTabs";
import {
  Caption,
  Container,
  neutralColors,
  semanticColors,
  Button,
  Col,
  Row,
  Flex,
  deviceSize,
} from "@giveth/ui-design-system";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectDonations from "./ProjectDonations";
import ProjectMembers from "./ProjectMembers";
import styled from "styled-components";
import ProjectHeader from "./ProjectHeader";
import ProjectDonationCard from "./ProjectDonationCard";
import { useProjectContext } from "@/context/project.context";
import { ProjectActionCard } from "./projectActionCard/ProjectActionCard";
import { DonateSection } from "./projectActionCard/DonationSection";
import { device } from "@/lib/constants/constants";
import useMediaQuery from "@/hooks/useMediaQuery";
import RichTextViewer from "../rich-text/RichTextViewer";
import ProjectSocials from "./projectSocials/ProjectSocials";
export enum EProjectPageTabs {
  DONATIONS = "donations",
  MEMEBERS = "members",
}

const ProjectDetail = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { projectData, isActive, isDraft, isCancelled, isAdmin, isLoading } =
    useProjectContext();
  const { description = "", title, id = "" } = projectData || {};

  const searchParams = useSearchParams();
  const categories = projectData?.categories;

  useEffect(() => {
    switch (searchParams.get("tab")) {
      case EProjectPageTabs.DONATIONS:
        setActiveTab(1);
        break;
      case EProjectPageTabs.MEMEBERS:
        setActiveTab(2);
        break;
      default:
        setActiveTab(0);
        break;
    }
  }, [searchParams.get("tab")]);

  const isMobile = !useMediaQuery(device.tablet);

  return (
    <Wrapper>
      <HeadContainer>
        <Row>
          <Col xs={12} md={8} lg={8.5}>
            <ProjectHeader />
            {isMobile && (
              <MobileContainer>
                <DonateSection projectData={projectData} />
              </MobileContainer>
            )}
          </Col>
          <Col xs={12} md={4} lg={3.5}>
            <ProjectActionCard />
          </Col>
        </Row>
      </HeadContainer>

      <ProjectTabs activeTab={activeTab} slug={"slug"} />
      <BodyWrapper>
        <ContainerStyled>
          {activeTab === 0 && (
            <>
              <RichTextViewer content={description} />
              {/* {projectData?.socialMedia?.length !== 0 && (
                <>
                  <Separator />
                  <ProjectSocials />
                </>
              )} */}
              <ProjectSocials />
            </>
          )}
          {activeTab === 1 && <ProjectDonations />}
          {activeTab === 2 && <ProjectMembers />}
        </ContainerStyled>
      </BodyWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const HeadContainer = styled(Container)`
  margin-top: 24px;
`;
const BodyWrapper = styled.div`
  min-height: calc(100vh - 312px);
  background-color: ${neutralColors.gray[100]};
  padding: 40px 0;
`;
const MobileContainer = styled.div<{}>`
  padding: 0 26px;
  background-color: white;
  border-radius: 16px;
  jutify-items: center;
`;
const ContainerStyled = styled(Container)`
  @media (min-width: ${deviceSize.laptopL}px) and (max-width: ${deviceSize.desktop}px) {
    padding-left: 0;
    padding-right: 0;
    width: 1250px;
  }
`;
const Separator = styled.hr`
  border: 1px solid ${neutralColors.gray[400]};
  margin: 40px 0;
`;
const MobileActionsContainer = styled(Flex)`
  background-color: ${neutralColors.gray[100]};
  border-radius: 16px;
  padding: 16px 24px;
  margin-bottom: 8px;
`;
export default ProjectDetail;
