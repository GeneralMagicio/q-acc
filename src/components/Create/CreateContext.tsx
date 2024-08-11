import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProfileData {
  fullName: string;
  emailAddress: string;
  emailVerified: boolean;
  profilePhoto: { file: File; ipfsHash: string } | null;
}

interface FormData {
  profile: ProfileData;
  project: any;
  team: any;
}

interface CreateContextType {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
}

const CreateContext = createContext<CreateContextType | undefined>(undefined);

export const CreateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormDataState] = useState<FormData>({
    profile: {
      fullName: "",
      emailAddress: "",
      emailVerified: false,
      profilePhoto: null,
    },
    project: {},
    team: {},
  });

  const setFormData = (data: Partial<FormData>) => {
    console.log("UP", data);
    setFormDataState((prevData) => ({ ...prevData, ...data }));
    console.log("inside", formData);
  };

  return (
    <CreateContext.Provider value={{ formData, setFormData }}>
      {children}
    </CreateContext.Provider>
  );
};

export const useCreateContext = () => {
  const context = useContext(CreateContext);
  if (!context) {
    throw new Error("useCreateContext must be used within a CreateProvider");
  }
  return context;
};
