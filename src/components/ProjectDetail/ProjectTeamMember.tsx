import React from "react";
import { IconFacebook } from "../Icons/IconFacebook";
import { IconXSocial } from "../Icons/IconXSocial";
import { IconFarcaster } from "../Icons/IconFarcaster";
import { IconLinkedin } from "../Icons/IconLinkedin";

const iconMap: { [key: string]: React.ReactNode } = {
  facebook: <IconFacebook color="#4267B2" size={24} />,
  x: <IconXSocial color={"#26A7DE"} size={24} />,
  farcaster: <IconFarcaster size={24} />,
  linkedin: <IconLinkedin size={24} />,
};
const socialMediaColor: { [key: string]: string } = {
  facebook: "#4267B2",
  x: "#26A7DE",
  instagram: "#8668FC",
  youtube: "#C4302B",
  linkedin: "#165FFA",
  reddit: "#FF5700",
  discord: "#7289DA",
  website: "#2EA096",
  telegram: "#229ED9",
  github: "#1D1E1F",
};
const ProjectTeamMembers = (teamMembers: any) => {
  const memebers = [
    {
      name: "Test Name",
      image: "https://staging.giveth.io/images/placeholders/profile.svg",
      social: [
        {
          type: "x",
          link: "https://www.facebook.com/globalecovillagenetwork.ua",
        },
        {
          type: "FACEBOOK",
          link: "https://www.instagram.com/gen_ukraine/",
        },
        {
          type: "FARCASTER",
          link: "https://www.instagram.com/gen_ukraine/1",
        },
      ],
    },
    {
      name: "Lovel George",
      image: "https://staging.giveth.io/images/placeholders/profile.svg",
      social: [
        {
          type: "x",
          link: "https://www.facebook.com/globalecovillagenetwork.ua/1",
        },
        {
          type: "LINKEDIN",
          link: "https://www.instagram.com/lovel_george/2",
        },
        {
          type: "FARCASTER",
          link: "https://www.instagram.com/gen_ukraine/3",
        },
      ],
    },
    {
      name: "PG",
      image: "https://staging.giveth.io/images/placeholders/profile.svg",
      social: [
        {
          type: "x",
          link: "https://www.facebook.com/globalecovillagenetwork.ua,4",
        },
        {
          type: "FACEBOOK",
          link: "https://www.instagram.com/gen_ukraine/5",
        },
        {
          type: "FARCASTER",
          link: "https://www.instagram.com/gen_ukraine/6",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap  gap-10 justify-center  my-10">
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
                  const color = socialMediaColor[socialItem.type.toLowerCase()];
                  const icon = iconMap[socialItem.type.toLowerCase()];
                  if (icon) {
                    return (
                      <a
                        key={socialItem.link}
                        href={socialItem.link}
                        target="_blank"
                      >
                        <div className="flex gap-2">{icon}</div>
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

export default ProjectTeamMembers;
