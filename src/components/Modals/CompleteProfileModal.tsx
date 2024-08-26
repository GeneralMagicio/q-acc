import { type FC } from "react";
import Modal, { BaseModalProps } from "../Modal";
import { Button, ButtonColor, ButtonStyle } from "../Button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import links from "@/lib/constants/links";
import Link from "next/link";

interface CompleteProfileModalProps extends BaseModalProps {}

export const CompleteProfileModal: FC<CompleteProfileModalProps> = (props) => {
  return (
    <Modal {...props}>
      <div className=" ">
        <h1 className="font-bold text-2xl">Sorry!</h1>
        <p className="mt-4 mb-10">
          The connected address is not on the allow list for any project. Double
          check you are connected with the right address. If you believe this is
          in error, reach out the the Quadratic Accelerator team..
        </p>
        <div className="flex justify-center">
          <a
            href={links.FARCASTER}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <Button styleType={ButtonStyle.Text} color={ButtonColor.Gray}>
              <div className="flex items-center gap-1">
                <Image
                  src="/images/icons/social/farcaster.svg"
                  alt="discord"
                  width={24}
                  height={24}
                />
                <span>Qacc on Farcaster</span>
              </div>
            </Button>
          </a>
          <a href={links.TWITTER} target="_blank" referrerPolicy="no-referrer">
            <Button styleType={ButtonStyle.Text} color={ButtonColor.Gray}>
              <div className="flex items-center gap-1">
                <Image
                  src="/images/icons/social/twitter.svg"
                  alt="x"
                  width={24}
                  height={24}
                />
                <span>q/acc on X</span>
              </div>
            </Button>
          </a>
        </div>
      </div>
    </Modal>
  );
};