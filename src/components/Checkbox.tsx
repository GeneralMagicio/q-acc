import React from "react";
import { useFormContext } from "react-hook-form";

interface CheckboxProps {
  name: string;
  label: string;
  rules?: object;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label, rules }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          {...register(name, rules)}
          className="form-checkbox"
        />
        <span className="ml-2">{label}</span>
      </label>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
