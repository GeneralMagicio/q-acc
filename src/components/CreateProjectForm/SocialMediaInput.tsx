import Image from "next/image";
import { FC } from "react";
import { type RegisterOptions } from "react-hook-form";
import Input from "../Input";

interface SocialMediaInputProps {
  name: string;
  label: string;
  iconName: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export const SocialMediaInput: FC<SocialMediaInputProps> = ({
  name,
  label,
  iconName,
  placeholder,
  rules,
}) => {
  return (
    <div className="flex gap-12 items-center ">
      <div className="flex gap-2 items-center mb-2 w-36">
        <Image
          src={`/images/icons/social/${iconName}`}
          alt={`${label} icon`}
          width={24}
          height={24}
        />
        <label>{label}</label>
      </div>
      <div className="w-full">
        <Input name={name} placeholder={placeholder} rules={rules} />
      </div>
    </div>
  );
};
