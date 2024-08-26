import { type FC } from "react";
import Modal, { BaseModalProps } from "../Modal";
import { Button, ButtonColor, ButtonStyle } from "../Button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import links from "@/lib/constants/links";
import Link from "next/link";
import { IconArrowRight } from "../Icons/IconArrowRight";
import Routes from "@/lib/constants/Routes";

interface CompleteProfileModalProps extends BaseModalProps {}

export const CompleteProfileModal: FC<CompleteProfileModalProps> = (props) => {
  return (
    <Modal {...props}>
      <div className=" ">
        <h1 className="font-bold text-xl">Before you donate</h1>
        <p className="mt-4 mb-10">Set up your public profile to get started.</p>
        <Link href={Routes.CreateProfile}>
          <Button styleType={ButtonStyle.Solid} color={ButtonColor.Pink}>
            <div className="flex items-center gap-1">
              <span>Complete Profile</span>
              <IconArrowRight size={16} />
            </div>
          </Button>
        </Link>
      </div>
    </Modal>
  );
};
