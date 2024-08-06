import { type FC } from "react";
import Modal, { BaseModalProps } from "./Modal";
import { Button } from "./Button";
import { useWeb3Modal } from "@web3modal/wagmi/react";

interface HoldModalProps extends BaseModalProps {}

export const HoldModal: FC<HoldModalProps> = (props) => {
  return (
    <Modal {...props} title="Hold On!">
      <div className="flex flex-col gap-10 ">
        <p>That address is not on the allowlist.</p>
      </div>
    </Modal>
  );
};
