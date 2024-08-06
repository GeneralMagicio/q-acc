import React from "react";
import StepNavigation from "./StepNavigation";
import { useForm, FormProvider } from "react-hook-form";
import Checkbox from "../Checkbox";
import { useTokenFormContext } from "./TokenFormContext";

interface FormData {
  agreedToPolicy: boolean;
}

const PolicyStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  const { formData, setFormData } = useTokenFormContext();
  const methods = useForm<FormData>({
    defaultValues: formData,
    mode: "onChange", // This enables validation on change
  });
  const { handleSubmit, formState } = methods;

  const onSubmit = (data: FormData) => {
    setFormData(data);
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 pt-20 w-full"
      >
        <section className="flex flex-col gap-4 w-3/4 mx-auto ">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-7">
            Review Privacy Policy
          </h1>
          <p className="max-h-64 overflow-x-hidden overflow-y-auto text-justify">
            The Quadratic Accelerator takes personal privacy very seriously. As
            a general rule, this website does not collect your personal
            information unless you choose to provide that information to us.
            When you choose to provide us with your personal information, you
            are giving Quadratic Accelerator your permission to use that
            information for the stated purposes listed in this privacy policy.
            If you choose not to provide us with that information, it might
            limit the features and services that you can use on this website.
            permission to use that information for the stated purposes listed in
            this privacy policy. If you choose not to provide us with that
            information, it might limit the features and services that you can
            use on this website.
          </p>
          <Checkbox
            name="agreedToPolicy"
            label="I have read and agree to the Privacy Policy."
            rules={{
              required: "You must agree to the Privacy Policy to continue",
            }}
          />
        </section>
        <StepNavigation
          currentStep={3}
          totalSteps={4}
          onBack={onBack}
          isFormValid={formState.isValid}
        />
      </form>
    </FormProvider>
  );
};

export default PolicyStep;
