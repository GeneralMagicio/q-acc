"use client";

import { useForm, FormProvider } from "react-hook-form";
import { type FC } from "react";
import { useRouter } from "next/navigation";
import { TeamForm } from "./TeamForm";
import { Button, ButtonColor } from "@/components/Button";
import { useCreateContext } from "../CreateContext";
import Routes from "@/lib/constants/Routes";
import CreateNavbar from "../CreateNavbar";

export interface TeamMember {
  fullName: string;
  avatar?: { file: File; ipfsHash: string } | null;
  twitter?: string;
  linkedin?: string;
  farcaster?: string;
}

export interface TeamFormData {
  team: TeamMember[]; // Array to store team member data
}

const CreateTeamForm: FC = () => {
  const { formData, setFormData } = useCreateContext();
  const methods = useForm<TeamFormData>({
    defaultValues: {
      team: formData.team.length
        ? formData.team
        : [{ fullName: "", avatar: null }],
    }, // Initialize with existing team members or one empty member
    mode: "onChange", // This enables validation on change
  });
  const router = useRouter();

  const { handleSubmit, setValue, watch } = methods;

  const teamMembers = watch("team"); // Watch the team members array

  const addTeamMember = () => {
    setValue("team", [...teamMembers, { fullName: "", avatar: null }]); // Add a new team member
  };

  const onSubmit = (data: TeamFormData) => {
    // Handle form submission
    setFormData({ team: data.team });
    console.log("Form data:", data);
    router.push(Routes.CreateProject);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-6">
        <CreateNavbar
          title="Add your team"
          onBack={() => router.push(Routes.CreateProject)}
          submitLabel="Save"
        />
        {teamMembers?.map((_, index) => <TeamForm key={index} index={index} />)}
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
