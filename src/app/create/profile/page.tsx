"use client";

import { useCreateContext } from "@/components/Create/CreateContext";

export default function CreateProfilePage() {
  const { formData, setFormData } = useCreateContext();

  console.log("formData", formData);
  return (
    <div className="container">
      Hello there :D
      <button
        onClick={() => {
          setFormData({
            profile: {
              name: "John Doe",
              email: "",
            },
          });
        }}
      >
        Set Data
      </button>
    </div>
  );
}
