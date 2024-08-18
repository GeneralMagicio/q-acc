import { type FC } from "react";
import Modal, { BaseModalProps } from "./Modal";
import { Button } from "./Button";
import { useWeb3Modal } from "@web3modal/wagmi/react";

interface HoldModalProps extends BaseModalProps {}

export const HoldModal: FC<HoldModalProps> = (props) => {
  return (
    <Modal {...props} title="Hold On">
      <div className=" ">
        <h1 className="font-bold text-2xl">Sorry!</h1>
        <p className="mt-4">
          The connected address is not on the allow list for any project. Double
          check you are connected with the right address. If you believe this is
          in error, reach out the the Quadratic Accelerator team..
        </p>
      </div>
    </Modal>
  );
};
