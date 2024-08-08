"use client";

import { useCreateContext } from "@/components/Create/CreateContext";
import CreateProjectForm from "@/components/Create/CreateProjectForm";
import TempNav from "../TempNav";
import { useRouter } from "next/navigation";
export default function CreateProjectPage() {
  const router = useRouter();
  const onBack = () => {
    router.push("/create/profile");
  };
  const onNext = () => {};
  const { formData } = useCreateContext();

  console.log("formData", formData);
  return (
    <div className="container">
      <TempNav onNext={onNext} onBack={onBack} nextLabel="project" />
      <CreateProjectForm onNext={onNext} onBack={onBack} />
    </div>
  );
}
