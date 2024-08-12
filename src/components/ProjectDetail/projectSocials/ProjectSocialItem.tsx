import React from "react";
import styled from "styled-components";
import {
  B,
  Flex,
  neutralColors,
  IconDiscord18,
  IconFacebook18,
  IconTelegram,
  IconFaracaster,
  IconInstagram18,
  IconLens,
  IconLinkedin18,
  IconRedit,
  IconWorld16,
  IconXSocial18,
  IconYoutube,
  P,
  IconGithub,
} from "@giveth/ui-design-system";
import { IProjectSocialMedia } from "@/apollo/types/types";
import { validators } from "@/lib/constants/regex";
export enum EInputs {
  name = "name",
  description = "description",
  categories = "categories",
  impactLocation = "impactLocation",
  image = "image",
  draft = "draft",
  addresses = "addresses",
  alloProtocolRegistry = "alloProtocolRegistry",
  facebook = "facebook",
  x = "x",
  instagram = "instagram",
  youtube = "youtube",
  linkedin = "linkedin",
  reddit = "reddit",
  discord = "discord",
  farcaster = "farcaster",
  lens = "lens",
  website = "website",
  telegram = "telegram",
  github = "github",
}
export const socialMediasArray = [
  {
    name: "Facebook",
    type: EInputs.facebook,
    icon: IconFacebook18,
    validator: validators.facebook,
  },
  {
    name: "Twitter",
    type: EInputs.x,
    icon: IconXSocial18,
    validator: validators.twitter,
  },
  {
    name: "LinkedIn",
    type: EInputs.linkedin,
    icon: IconLinkedin18,
    validator: validators.linkedin,
  },
  {
    name: "Discord",
    type: EInputs.discord,
    icon: IconDiscord18,
    validator: validators.discord,
  },
  {
    name: "Telegram",
    type: EInputs.telegram,
    icon: IconTelegram,
    validator: validators.telegram,
  },
  {
    name: "Instagram",
    type: EInputs.instagram,
    icon: IconInstagram18,
    validator: validators.instagram,
  },
  {
    name: "Reddit",
    type: EInputs.reddit,
    icon: IconRedit,
    validator: validators.reddit,
  },
  {
    name: "YouTube",
    type: EInputs.youtube,
    icon: IconYoutube,
    validator: validators.youtube,
  },
  {
    name: "Farcaster",
    type: EInputs.farcaster,
    icon: IconFaracaster,
    validator: validators.farcaster,
  },
  {
    name: "Lens",
    type: EInputs.lens,
    icon: IconLens,
    validator: validators.lens,
  },
  {
    name: "Github",
    type: EInputs.github,
    icon: IconGithub,
    validator: validators.github,
  },
  {
    name: "Website",
    type: EInputs.website,
    icon: IconWorld16,
    validator: validators.website,
  },
];

interface IProjectSocialMediaItem {
  socialMedia: IProjectSocialMedia;
}

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

const removeHttpsAndWwwFromUrl = (socialMediaUrl: string) => {
  return socialMediaUrl.replace("https://", "").replace("www.", "");
};

/**
 * Ensures that a given URL uses the https:// protocol.
 * If the URL starts with http://, it will be replaced with https://.
 * If the URL does not start with any protocol, https:// will be added.
 * If the URL already starts with https://, it will remain unchanged.
 *
 * @param {string} url - The URL to be checked and possibly modified.
 * @returns {string} - The modified URL with https://.
 */
function ensureHttps(url: string): string {
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

const ProjectSocialItem = ({ socialMedia }: IProjectSocialMediaItem) => {
  const item = socialMediasArray.find((item: any) => {
    return item.type.toLocaleLowerCase() === socialMedia.type.toLowerCase();
  });

  const IconComponent = item?.icon;

  return (
    <a href={ensureHttps(socialMedia.link)} target="_blank">
      <SocialItemContainer>
        <Flex gap="8px" $alignItems="center">
          {IconComponent && (
            <IconComponent
              color={
                socialMediaColor[item.name.toLocaleLowerCase() || "website"]
              }
            />
          )}

          <B
            style={{
              color:
                socialMediaColor[item?.name.toLocaleLowerCase() || "website"],
            }}
          >
            {removeHttpsAndWwwFromUrl(socialMedia.link)}
          </B>
        </Flex>
      </SocialItemContainer>
    </a>
  );
};

const SocialItemContainer = styled.div`
  padding: 16px 24px;
  border-radius: 48px;
  background-color: ${neutralColors.gray[100]};
  box-shadow: 0 3px 20px rgba(83, 38, 236, 0.13);
`;

export default ProjectSocialItem;
