"use client";

import { useForm, FormProvider } from "react-hook-form";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import { Dropzone } from "@/components/DropZone";
import { isAddress } from "viem";
import { type FC } from "react";
import Textarea from "../../TextArea";
import { SocialMediaInput } from "./SocialMediaInput";
import { validators } from "./vaildators";

export interface FormData {
  tokenName: string;
  tokenTicker: string;
  logo: { file: File; ipfsHash: string } | null;
  banner: { file: File; ipfsHash: string } | null;
  projectAddress: string;
  addressConfirmed: boolean;
}

const socialMediaLinks = [
  {
    name: "website",
    label: "Website",
    iconName: "web.svg",
    rules: validators.website,
  },
  {
    name: "facebook",
    label: "Facebook",
    iconName: "facebook.svg",
    rules: validators.facebook,
  },
  {
    name: "twitter",
    label: "Twitter",
    iconName: "twitter.svg",
    rules: validators.twitter,
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    iconName: "linkedin.svg",
    rules: validators.linkedin,
  },
  {
    name: "discord",
    label: "Discord",
    iconName: "discord.svg",
    rules: validators.discord,
  },
  {
    name: "telegram",
    label: "Telegram",
    iconName: "telegram.svg",
    rules: validators.telegram,
  },
  {
    name: "instagram",
    label: "Instagram",
    iconName: "instagram.svg",
    rules: validators.instagram,
  },
  {
    name: "reddit",
    label: "Reddit",
    iconName: "reddit.svg",
    rules: validators.reddit,
  },
  {
    name: "youtube",
    label: "YouTube",
    iconName: "youtube.svg",
    rules: validators.youtube,
  },
  {
    name: "farcaster",
    label: "Farcaster",
    iconName: "farcaster.svg",
    rules: validators.farcaster,
  },
  {
    name: "lens",
    label: "Lens",
    iconName: "lens.svg",
    rules: validators.lens,
  },
  {
    name: "github",
    label: "GitHub",
    iconName: "github.svg",
    rules: validators.github,
  },
];

const CreateProjectForm: FC<{
  onNext: () => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const methods = useForm<FormData>({
    // defaultValues: formData,
    mode: "onChange", // This enables validation on change
  });
  const { handleSubmit, setValue, formState } = methods;

  const handleDrop = (name: string, file: File, ipfsHash: string) => {
    if (file) {
      setValue(name as keyof FormData, { file, ipfsHash });
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
          showCounter
          maxLength={55}
        />

        <Textarea
          name="projectTeaser"
          label="Project Teaser"
          placeholder="Enter project teaser"
          rules={{ required: "Project Teaser is required" }}
          showCounter
          maxLength={100}
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
          <div className="flex flex-col gap-6">
            {socialMediaLinks.map((socialMedia) => (
              <SocialMediaInput key={socialMedia.name} {...socialMedia} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 w-full mx-auto">
          <h1 className="text-4xl font-bold text-gray-800">
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

        <section className="flex flex-col gap-6 w-full mx-auto">
          <label className="text-4xl font-bold text-gray-800">
            Upload Logo
          </label>
          <p>Displayed in the header of the project page.</p>
          <Dropzone name="logo" onDrop={handleDrop} />
        </section>

        <section className="flex flex-col gap-6 w-full mx-auto">
          <label className="text-4xl font-bold text-gray-800">
            Add an image to your project
          </label>
          <p>Displayed in the header of the project page.</p>
          <Dropzone name="banner" onDrop={handleDrop} />
        </section>
      </form>
    </FormProvider>
  );
};

export default CreateProjectForm;
