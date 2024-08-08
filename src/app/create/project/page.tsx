"use client";

import CreateProjectForm from "@/components/Create/CreateProjectForm";

export default function CreateProjectPage() {
  const onBack = () => {};
  const onNext = () => {};
  return (
    <div className="container">
      <CreateProjectForm onNext={onNext} onBack={onBack} />
    </div>
  );
}
