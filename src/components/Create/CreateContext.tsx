import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
  profile: any;
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
    profile: {},
    project: {},
    team: {},
  });

  const setFormData = (data: Partial<FormData>) => {
    setFormDataState((prevData) => ({ ...prevData, ...data }));
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
