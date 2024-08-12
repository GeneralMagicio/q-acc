import { useProjectContext } from "@/context/project.context";
import { Flex, mediaQueries, neutralColors } from "@giveth/ui-design-system";
import React from "react";
import styled from "styled-components";

import { ensureHttps } from "@/helpers/helpers";
import { socialMediasArray } from "./projectSocials/ProjectSocialItem";

const ProjectMembers = () => {
  const { projectData } = useProjectContext();
  const memebers = [
    {
      name: "Test Name",
      image: "https://staging.giveth.io/images/placeholders/profile.svg",
      social: [
        {
          type: "FACEBOOK",
          link: "https://www.facebook.com/globalecovillagenetwork.ua",
        },
        {
          type: "INSTAGRAM",
          link: "https://www.instagram.com/gen_ukraine/",
        },
      ],
    },
    {
      name: "Lovel George",
      image: "https://staging.giveth.io/images/placeholders/profile.svg",
      social: [
        {
          type: "FACEBOOK",
          link: "https://www.facebook.com/globalecovillagenetwork.ua",
        },
        {
          type: "INSTAGRAM",
          link: "https://www.instagram.com/lovel_george/",
        },
      ],
    },
    {
      name: "PG",
      image: "https://staging.giveth.io/images/placeholders/profile.svg",
      social: [
        {
          type: "FACEBOOK",
          link: "https://www.facebook.com/globalecovillagenetwork.ua",
        },
        {
          type: "INSTAGRAM",
          link: "https://www.instagram.com/gen_ukraine/",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap  gap-10 justify-center ">
        {memebers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col p-6 border rounded-xl items-center min-w-[240px] gap-6 shadow-xl"
          >
            <div className="w-[128px] h-[128px]">
              <img src={member.image} />
            </div>
            <div className="flex flex-col gap-4 items-center mt-2">
              <h1 className="text-[#1D1E1F] font-bold text-lg">
                {member.name}
              </h1>

              <div className="flex flex-wrap gap-6">
                {member.social.map((socialItem) => {
                  const match = socialMediasArray.find(
                    (item: any) =>
                      item.type.toLowerCase() === socialItem.type.toLowerCase()
                  );
                  const IconComponent = match?.icon;

                  if (match) {
                    return (
                      <a
                        key={socialItem.link}
                        href={ensureHttps(socialItem.link)}
                        target="_blank"
                      >
                        <Flex gap="8px" $alignItems="center">
                          {IconComponent && <IconComponent color={"#043066"} />}
                        </Flex>
                      </a>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectActionCardWrapper = styled(Flex)`
  background-color: ${neutralColors.gray[100]};
  border-radius: 16px;
  height: 100%;
  padding-top: 12px;
  border: 1px;
  ${mediaQueries.tablet} {
    padding: 16px 24px;
  }
`;

export default ProjectMembers;
