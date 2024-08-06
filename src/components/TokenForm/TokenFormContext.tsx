import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
  tokenName: string;
  tokenTicker: string;
  tokenIcon: { file: File; ipfsHash: string } | null;
  projectAddress: string;
  agreedToTerms: boolean;
  agreedToPolicy: boolean;
  addressConfirmed: boolean;
}

interface TokenFormContextType {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
}

const TokenFormContext = createContext<TokenFormContextType | undefined>(
  undefined
);

export const TokenFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormDataState] = useState<FormData>({
    tokenName: "",
    tokenTicker: "",
    tokenIcon: null,
    projectAddress: "",
    agreedToTerms: false,
    agreedToPolicy: false,
    addressConfirmed: false,
  });

  const setFormData = (data: Partial<FormData>) => {
    setFormDataState((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <TokenFormContext.Provider value={{ formData, setFormData }}>
      {children}
    </TokenFormContext.Provider>
  );
};

export const useTokenFormContext = () => {
  const context = useContext(TokenFormContext);
  if (!context) {
    throw new Error(
      "useTokenFormContext must be used within a TokenFormProvider"
    );
  }
  return context;
};
