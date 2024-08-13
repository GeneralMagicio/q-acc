"use client";

import { useCreateContext } from "@/components/Create/CreateContext";
import CreateProfileForm from "@/components/Create/CreateProfileForm";
import { useRef, type FC } from "react";
import TempNav from "../../../components/Create/CreateNavbar";
import { useRouter } from "next/navigation";

export default function CreateProfilePage() {
  return (
    <div className="container">
      <CreateProfileForm />
    </div>
  );
}
