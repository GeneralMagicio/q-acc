"use client";

import { useForm, FormProvider } from "react-hook-form";
import { type FC, useState } from "react";
import { TeamForm } from "./TeamForm";
import { Button, ButtonColor } from "@/components/Button";
import { useCreateContext } from "../CreateContext";
import { useRouter } from "next/navigation";
import Routes from "@/lib/constants/Routes";
import CreateNavbar from "../CreateNavbar";

export interface TeamMember {
  fullName: string;
}

export interface TeamFormData {
  team: { fullName: string }[]; // Array to store team member data
}

const CreateTeamForm: FC = () => {
  const { formData, setFormData } = useCreateContext();
  const methods = useForm<TeamFormData>({
    defaultValues: formData.team, // Initialize with one team member
    mode: "onChange", // This enables validation on change
  });
  const router = useRouter();

  const { handleSubmit, setValue, formState, watch } = methods;

  const teamMembers = watch("team"); // Watch the team members array

  const addTeamMember = () => {
    setValue("team", [...teamMembers, { fullName: "" }]); // Add a new team member
  };

  const onSubmit = (data: TeamFormData) => {
    // Handle form submission
    setFormData({ team: data.team });
    console.log("Form data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-6">
        <CreateNavbar onBack={() => router.push(Routes.CreateProject)} />
        {teamMembers.map((_, index) => (
          <TeamForm key={index} index={index} />
        ))}
        <div className="bg-white p-6 rounded-xl flex justify-between mt-6 items-center">
          <b>More team members?</b>
          <Button color={ButtonColor.Giv} onClick={addTeamMember}>
            Add a new team member
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateTeamForm;
