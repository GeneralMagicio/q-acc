import { B, Flex, neutralColors } from "@giveth/ui-design-system";
import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { useProjectContext } from "@/context/project.context";
import ProjectSocialItem from "./ProjectSocialItem";
import { IProjectSocialMedia } from "@/apollo/types/types";

const ProjectSocials = () => {
  //   const { formatMessage } = useIntl();
  const { projectData } = useProjectContext();
  const socialdata = [
    {
      type: "FACEBOOK",
      link: "https://www.facebook.com/globalecovillagenetwork.ua",
    },
    {
      type: "INSTAGRAM",
      link: "https://www.instagram.com/gen_ukraine/",
    },
    {
      type: "YOUTUBE",
      link: "https://www.youtube.com/channel/UCwxI6So5TBExWxsHFmNjtDg",
    },
    {
      type: "LINKEDIN",
      link: "https://www.linkedin.com/company/genukraine/mycompany/",
    },
    {
      type: "TELEGRAM",
      link: "https://t.me/gen_ukraine",
    },
    {
      type: "WEBSITE",
      link: "https://genukraine.com.ua/",
    },
  ];

  return (
    <div>
      <B>
        {/* {formatMessage({
          id: "label.social_find_us_on",
        })} */}
        Find Us On our Social Media
      </B>
      <br />
      <Flex gap="24px" $flexWrap>
        {/* {projectData?.socialMedia?.map((social: IProjectSocialMedia) => ( */}
        {socialdata?.map((social: any) => (
          <>
            <ProjectSocialItem key={social.link} socialMedia={social} />
          </>
        ))}
      </Flex>
      <SocialWarning>
        {/* {formatMessage({
          id: "label.social_warning",
        })} */}
        Giveth does NOT verify social media links published by projects, click
        at your own discretion!
      </SocialWarning>
    </div>
  );
};

export default ProjectSocials;

const SocialWarning = styled.div`
  margin-top: 16px;
  color: ${neutralColors.gray[800]};
  font-size: 0.9rem;
  font-style: italic;
`;
