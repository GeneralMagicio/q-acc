import React from "react";
import styled from "styled-components";
import {
  Subline,
  brandColors,
  P,
  neutralColors,
  mediaQueries,
  Flex,
} from "@giveth/ui-design-system";
import Link from "next/link";
import Routes from "@/lib/constants/Routes";
import { useProjectContext } from "@/context/project.context";
interface IProjectTabs {
  activeTab: number;
  slug: string;
}
export enum EProjectPageTabs {
  DONATIONS = "donations",
  MEMEBERS = "members",
}
const ProjectTabs = (props: IProjectTabs) => {
  const { activeTab, slug } = props;
  const { projectData, totalDonationsCount } = useProjectContext();
  const badgeCount = (count?: number) => {
    return count || null;
  };
  const tabsArray = [
    { title: "About" },
    {
      title: "Donations",
      badge: totalDonationsCount,
      query: EProjectPageTabs.DONATIONS,
    },
    {
      title: "Team Members",
      query: EProjectPageTabs.MEMEBERS,
    },
  ];
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          {tabsArray.map((i, index) => (
            <Link
              key={i.title}
              href={`${Routes.Project}/${slug}${
                i.query ? `?tab=${i.query}` : ""
              }`}
              scroll={false}
            >
              <Tab className={activeTab === index ? "active" : ""}>
                {i.title}
                {badgeCount(i.badge) && (
                  <Badge className={activeTab === index ? "active" : ""}>
                    {i.badge}
                  </Badge>
                )}
              </Tab>
            </Link>
          ))}
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

const InnerWrapper = styled(Flex)`
  margin: 0 auto;
  max-width: 1200px;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  ${mediaQueries.desktop} {
    padding: 0;
  }
`;
const Badge = styled(Subline)`
  background: ${neutralColors.gray[800]};
  color: white;
  border-radius: 40px;
  height: 22px;
  padding: 0 9px;
  display: flex;
  align-items: center;
  margin-left: 6px;
  &.active {
    background: ${brandColors.pinky[500]};
  }
`;

const Tab = styled(P)`
  display: flex;
  padding: 9px 24px;
  border-radius: 48px;
  cursor: pointer;
  &.active {
    font-weight: 500;
    color: ${brandColors.pinky[500]};
    background: ${neutralColors.gray[200]};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 16px 0;
  color: ${neutralColors.gray[800]};
  height: min-content;
  margin-top: 24px;
  position: relative;
  background-color: white;
  overflow-x: auto;
  box-shadow: 0 3px 20px rgba(212, 218, 238, 0.4);
`;
export default ProjectTabs;
