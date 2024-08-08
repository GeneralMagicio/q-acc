"use client";

import { useForm, FormProvider } from "react-hook-form";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import { Dropzone } from "@/components/DropZone";
import { isAddress } from "viem";
import { type FC } from "react";
import Textarea from "../TextArea";

interface FormData {
  tokenName: string;
  tokenTicker: string;
  tokenIcon: { file: File; ipfsHash: string } | null;
  projectAddress: string;
  addressConfirmed: boolean;
}

const CreateProjectForm: FC<{
  onNext: () => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const methods = useForm<FormData>({
    // defaultValues: formData,
    mode: "onChange", // This enables validation on change
  });
  const { handleSubmit, setValue, formState } = methods;

  const handleDrop = (file: File, ipfsHash: string) => {
    if (file) {
      setValue("tokenIcon", { file, ipfsHash });
    }
  };

  const onSubmit = (data: FormData) => {
    // setFormData(data);
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col gap-16 pt-20 w-full mt-10 rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-7">
          Create Your Project
        </h1>
        <Input
          name="projectName"
          label="Project Name"
          placeholder="My First Project"
          rules={{ required: "Project Name is required" }}
        />

        <Textarea
          name="projectTeaser"
          label="Project Teaser"
          placeholder="Enter project teaser"
          rules={{ required: "Project Teaser is required" }}
        />

        <section className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl">Tell us about your project...</h2>
            <p className="text-sm mt-2">
              <span className="text-gray-900">Aim for 200-500 words.</span>
              <span className="text-pink-500">
                How to write a good project description.{" "}
              </span>
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl">Social Media Links</h2>
            <p className="text-sm mt-2">
              <span className="text-gray-900">
                Add your project’s social media links (optional)
              </span>
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-6 w-2/4 mx-auto">
          <label className="text-4xl font-bold text-gray-800 text-center mb-7">
            Upload Token icon
          </label>
          <Dropzone name="icon" onDrop={handleDrop} />
        </section>

        <section className="flex flex-col gap-4 w-2/4 mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-7">
            Enter Project Address
          </h1>
          <Input
            name="projectAddress"
            label="Project Address"
            placeholder="Enter project address"
            rules={{
              required: "Project Address is required",
              validate: (value) => {
                return isAddress(value) ? true : "Address in not valid"; // Add your validation logic here
              },
            }}
          />

          <Checkbox
            name="addressConfirmed"
            label="I confirm I have access to this address."
            rules={{
              required: "You must confirm you have access to this address.",
            }}
          />
        </section>
      </form>
    </FormProvider>
  );
};

export default CreateProjectForm;
