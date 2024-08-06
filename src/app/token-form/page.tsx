"use client";

import { ConnectModal } from "@/components/ConnectModal";
import { HoldModal } from "@/components/HoldModal";
import ConfirmStep from "@/components/TokenForm/ConfirmStep";
import PolicyStep from "@/components/TokenForm/PolicyStep";
import SuccessStep from "@/components/TokenForm/SuccessStep";
import TermsStep from "@/components/TokenForm/TermStep";
import { TokenFormProvider } from "@/components/TokenForm/TokenFormContext";
import TokenInfoStep from "@/components/TokenForm/TokenInfoStep";
import { checkWhiteList } from "@/services/check-white-list";
import React, { use, useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

enum FormSteps {
  TokenInfo = 1,
  Terms,
  Policy,
  Confirm,
  Success,
}

export default function TokenFormPage() {
  const [step, setStep] = useState(FormSteps.TokenInfo);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);

  const { address } = useAccount();

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted");
    handleNext();
  };

  useEffect(() => {
    async function checkAddress(address: Address) {
      const isWhiteListed = await checkWhiteList(address);
      if (isWhiteListed) {
        setShowHoldModal(false);
      } else {
        setShowHoldModal(true);
      }
    }
    if (!address) {
      setShowConnectModal(true);
      setShowHoldModal(false);
    } else {
      setShowConnectModal(false);
      checkAddress(address);
    }
  }, [address]);

  return (
    <>
      <TokenFormProvider>
        <main className="container">
          <div className="my-20 bg-white rounded-2xl flex flex-col items-center gap-24 max-w-3xl mx-auto">
            {step === FormSteps.TokenInfo && (
              <TokenInfoStep onNext={handleNext} onBack={handleBack} />
            )}
            {step === FormSteps.Terms && (
              <TermsStep onNext={handleNext} onBack={handleBack} />
            )}
            {step === FormSteps.Policy && (
              <PolicyStep onNext={handleNext} onBack={handleBack} />
            )}
            {step === FormSteps.Confirm && (
              <ConfirmStep onNext={handleSubmit} onBack={handleBack} />
            )}
            {step === FormSteps.Success && <SuccessStep />}
          </div>
        </main>
      </TokenFormProvider>
      {showConnectModal && (
        <ConnectModal
          isOpen={showConnectModal}
          onClose={() => setShowConnectModal(false)}
        />
      )}
      {showHoldModal && (
        <HoldModal
          isOpen={showHoldModal}
          onClose={() => setShowHoldModal(false)}
        />
      )}
    </>
  );
}
