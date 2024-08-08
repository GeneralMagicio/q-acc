import { useFormContext, RegisterOptions } from "react-hook-form";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  rules?: RegisterOptions;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  rules,
  rows = 4,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        {...register(name, rules)}
        rows={rows}
        className={`px-4 py-4 mt-1 block w-full rounded-lg border-2 ${
          errors[name]
            ? "border-red-500 focus:border-red-500"
            : "border-gray-200 focus:border-gray-300"
        } focus:outline-none focus:ring-0 text-base sm:text-sm mb-4`}
        {...props}
      />
      {errors[name] && (
        <p className="absolute text-red-500 text-xs mt-1 -bottom-1">
          {(errors[name]?.message as string) || "Error"}
        </p>
      )}
    </div>
  );
};

export default Textarea;
