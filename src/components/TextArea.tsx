import { useFormContext, RegisterOptions } from "react-hook-form";
import type { TextareaHTMLAttributes } from "react";
import { useState } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  rules?: RegisterOptions;
  maxLength?: number;
  showCounter?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  rules,
  rows = 4,
  maxLength,
  showCounter = false,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1 mb-4">
        <textarea
          {...register(name, rules)}
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          className={`px-4 py-4 block w-full rounded-lg border-2 pb-12 ${
            errors[name]
              ? "border-red-500 focus:border-red-500"
              : "border-gray-200 focus:border-gray-300"
          } focus:outline-none focus:ring-0 text-base sm:text-sm`}
          {...props}
        />
        {errors[name] && (
          <p className="absolute text-red-500 text-xs mt-1 -bottom-4">
            {(errors[name]?.message as string) || "Error"}
          </p>
        )}
        {showCounter && maxLength && (
          <div className="absolute right-2 bottom-2 flex items-center justify-center w-8 h-8 bg-gray-100 border rounded-full text-xs text-gray-500">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
};

export default Textarea;
