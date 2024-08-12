import Input from "@/components/Input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface TeamFormProps {
  index: number;
}

export const TeamForm: React.FC<TeamFormProps> = ({ index }) => {
  const { register } = useFormContext(); // Get register from context

  return (
    <section className="bg-white p-8 flex flex-col gap-8 rounded-2xl">
      <h1 className="text-2xl mb-8">Add Your Team</h1>
      <Input
        name={`team[${index}].fullName`} // Use dynamic name based on index
        label="Full Name"
        placeholder="James Smith"
        rules={{ required: "Full Name is required" }}
        showCounter
        maxLength={55}
      />
    </section>
  );
};
