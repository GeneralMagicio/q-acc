"use client";

import { useCreateContext } from "@/components/Create/CreateContext";
import CreateProfileForm from "@/components/Create/CreateProfileForm";
import { useRef, type FC } from "react";
import TempNav from "../TempNav";
import { useRouter } from "next/navigation";

export default function CreateProfilePage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const onBack = () => {
    router.push("/");
  };
  const onNext = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };
  const { formData } = useCreateContext();

  return (
    <div className="container">
      <TempNav onNext={onNext} onBack={onBack} nextLabel="profile" />
      <CreateProfileForm onBack={onBack} formRef={formRef} />
    </div>
  );
}
