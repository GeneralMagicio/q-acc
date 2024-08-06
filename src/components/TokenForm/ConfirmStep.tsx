import React, { Fragment, useState } from "react";
import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";
import Checkbox from "../Checkbox";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import config from "@/config/configuration";
import InfoItem, { InfoType } from "./InfoItem";
import { IconArrowRight } from "../Icons/IconArrowRight";
import { addProject } from "@/app/actions/add-project";

const ConfirmStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  const [loading, setLoading] = useState(false);
  const { formData } = useTokenFormContext();
  const methods = useForm<FormData>();
  const { handleSubmit, formState } = methods;

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await addProject(
        formData.tokenName,
        formData.tokenTicker,
        formData.tokenIcon?.ipfsHash || "",
        formData.projectAddress
      );
      setLoading(false);
      if (res.insertedId) {
        onNext();
      }
    } catch (error: any) {
      console.log("error", error.message);
      setLoading(false);
    }
  };

  const info = [
    {
      label: "Token Full Name",
      value: formData.tokenName,
      type: InfoType.TEXT,
    },
    {
      label: "Token Ticker",
      value: formData.tokenTicker,
      type: InfoType.TEXT,
    },
    {
      label: "Token Icon",
      value: formData.tokenIcon?.ipfsHash || "",
      type: InfoType.IPFS_IMAGE,
    },
    {
      label: "Project Address",
      value: formData.projectAddress,
      type: InfoType.LINK,
    },
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 pt-20 w-full"
      >
        <section className="flex flex-col gap-4 w-3/4 mx-auto ">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-7">
            Final Confirmation
          </h1>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-light text-center">
              Please review everything before Launch
            </h2>
            <div className="grid grid-cols-[auto_24px_auto] gap-y-4 gap-x-6 px-5 py-4 border-t-[1px] border-b-[1px]">
              <p className="text-lg text-gray-600">Grant size</p>
              <IconArrowRight size={24} />
              <div className="border-2 rounded-md border-success-600 bg-success-100 text-success-700 flex items-start gap-4 px-4 py-1">
                <p className="text-lg  font-bold">65,000 MATIC</p>
                <p className="text-xs">$50,000</p>
              </div>
              {info.map((item) => (
                <InfoItem
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  type={item.type}
                />
              ))}
            </div>
            <Checkbox
              name="acceptTerms"
              label="I reviewed all parameters and I accept them."
              rules={{
                required:
                  "You must review and accept the parameters to continue",
              }}
            />
          </div>
        </section>
        <StepNavigation
          currentStep={4}
          totalSteps={4}
          onBack={onBack}
          nextLabel="Launch my token"
          isFormValid={formState.isValid}
          isNextLoading={loading}
        />
      </form>
    </FormProvider>
  );
};

export default ConfirmStep;
