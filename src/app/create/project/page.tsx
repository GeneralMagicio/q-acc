"use client";

import { useCreateContext } from "@/components/Create/CreateContext";
import CreateProjectForm from "@/components/Create/CreateProjectForm";
import TempNav from "../../../components/Create/CreateNavbar";
import { useRouter } from "next/navigation";
export default function CreateProjectPage() {
  return (
    <div className="container">
      <CreateProjectForm />
    </div>
  );
}
