import React, { Fragment } from "react";
import Image from "next/image";
import config from "@/config/configuration";
import { IconArrowRight } from "../Icons/IconArrowRight";
import { getIpfsAddress } from "@/helpers/image";

interface InfoItemProps {
  label: string;
  value: string;
  type: InfoType;
}

export enum InfoType {
  IMAGE = "image",
  IPFS_IMAGE = "ipfs_image",
  TEXT = "text",
  LINK = "link",
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, type }) => {
  return (
    <Fragment>
      <p className="text-lg text-gray-600">{label}</p>
      <div className="flex items-center justify-center">
        <IconArrowRight size={24} />
      </div>
      {type === InfoType.IMAGE ? (
        <div className="flex items-center gap-4">
          <Image src={value} alt="token icon" width={32} height={32} />
        </div>
      ) : type === InfoType.IPFS_IMAGE ? (
        <div className="flex items-center gap-4">
          <Image
            src={getIpfsAddress(value)}
            alt="token icon"
            width={32}
            height={32}
          />
        </div>
      ) : type === InfoType.LINK ? (
        <a
          href={`${config.SCAN_URL}address/${value}`}
          target="_blank"
          rel="noreferrer"
          className="flex gap-2 items-center text-lg text-giv-blue text-pink-500"
        >
          <span>Open in a new tab</span>
          <Image
            src="/images/icons/external-link.svg"
            alt="external link"
            width={16}
            height={16}
          />
        </a>
      ) : (
        <p className="text-lg text-gray-600 overflow-hidden text-ellipsis">
          {value}
        </p>
      )}
    </Fragment>
  );
};

export default InfoItem;
