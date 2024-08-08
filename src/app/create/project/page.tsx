"use client";

import { useCreateContext } from "@/components/Create/CreateContext";
import CreateProjectForm from "@/components/Create/CreateProjectForm";

export default function CreateProjectPage() {
  const onBack = () => {};
  const onNext = () => {};
  const { formData } = useCreateContext();

  console.log("formData", formData);
  return (
    <div className="container">
      <CreateProjectForm onNext={onNext} onBack={onBack} />
    </div>
  );
}
