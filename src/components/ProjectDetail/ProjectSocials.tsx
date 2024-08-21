import React from "react";
import { IconFacebook } from "../Icons/IconFacebook";
import { IconLinkedin } from "../Icons/IconLinkedin";
import { IconXSocial } from "../Icons/IconXSocial";
import Link from "next/link";
import { IconDiscord } from "../Icons/IconDiscord";
import { IconInstagram } from "../Icons/IconInstagram";
import { IconYoutube } from "../Icons/IconYoutube";
import { IconReddit } from "../Icons/IconReddit";
import { IconWebsite } from "../Icons/IconWebsite";
import { IconTelegram } from "../Icons/IconTelegram";
import { IconGithub } from "../Icons/IconGithub";

const iconMap: { [key: string]: React.ReactNode } = {
  facebook: <IconFacebook color="#4267B2" size={16} />,
  x: <IconXSocial color={"#26A7DE"} size={16} />,
  instagram: <IconInstagram color={"#8668FC"} size={16} />,
  youtube: <IconYoutube color={"#C4302B"} size={16} />,
  linkedin: <IconLinkedin color={"#165FFA"} size={16} />,
  reddit: <IconReddit color={"#FF5700"} size={16} />,
  discord: <IconDiscord color={"#7289DA"} size={16} />,
  website: <IconWebsite color={"#2EA096"} size={16} />,
  telegram: <IconTelegram color={"#229ED9"} size={16} />,
  github: <IconGithub color={"#1D1E1F"} size={16} />,
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
const ProjectSocials = () => {
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
      link: "https://genukraine.com.ua/1",
    },
    {
      type: "x",
      link: "https://genukraine.com.ua/2",
    },
    {
      type: "Reddit",
      link: "https://genukraine.com.ua/3",
    },
    {
      type: "Discord",
      link: "https://genukraine.com.ua/4",
    },
    {
      type: "Github",
      link: "https://genukraine.com.ua/5",
    },
  ];

  const removeHttpsAndWwwFromUrl = (socialMediaUrl: string) => {
    return socialMediaUrl.replace("https://", "").replace("www.", "");
  };

  return (
    <div>
      <h1 className="text-2xl font-redHatText text-[#82899A]">
        Find Us On our Social Media
      </h1>
      <br />
      <div className="flex flex-wrap gap-6">
        {/* {projectData?.socialMedia?.map((social: IProjectSocialMedia) => ( */}
        {socialdata?.map((social) => {
          const color = socialMediaColor[social.type.toLowerCase()];
          const icon = iconMap[social.type.toLowerCase()];
          return (
            <div
              key={social.link}
              className={`flex p-[16px_24px]  items-center gap-2 rounded-2xl border font-redHatText font-medium `}
              style={{ color: color }}
            >
              {icon}
              <Link href={social.link} target="_blank">
                {removeHttpsAndWwwFromUrl(social.link)}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSocials;
