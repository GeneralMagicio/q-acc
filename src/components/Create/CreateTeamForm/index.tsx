"use client";

import { useForm, FormProvider } from "react-hook-form";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import { Dropzone } from "@/components/DropZone";
import { isAddress } from "viem";
import { type FC, useState } from "react";
import Textarea from "../../TextArea";
import { SocialMediaInput } from "../../SocialMediaInput";
import { validators } from "../../SocialMediaInput/vaildators";
import { RichTextEditor } from "@/components/RichTextEditor";
import Image from "next/image";
import { IconAlertCircleOutline } from "@/components/Icons/IconAlertCircleOutline";
import { TeamForm } from "./TeamForm";
import { Button, ButtonColor } from "@/components/Button";

export interface TeamMember {
  fullName: string;
}

export interface FormData {
  team: { fullName: string }[]; // Array to store team member data
}

const CreateTeamForm: FC = () => {
  const methods = useForm<FormData>({
    defaultValues: { team: [{ fullName: "" }] }, // Initialize with one team member
    mode: "onChange", // This enables validation on change
  });
  const { handleSubmit, setValue, formState, watch } = methods;

  const teamMembers = watch("team"); // Watch the team members array

  const addTeamMember = () => {
    setValue("team", [...teamMembers, { fullName: "" }]); // Add a new team member
  };

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log("Form data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-6">
        {teamMembers.map((_, index) => (
          <TeamForm key={index} index={index} />
        ))}
        <div className="bg-white p-6 rounded-xl flex justify-between mt-6 items-center">
          <b>More team members?</b>
          <Button color={ButtonColor.Giv} onClick={addTeamMember}>
            Add a new team member
          </Button>
        </div>
        <Button color={ButtonColor.Giv} type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateTeamForm;
