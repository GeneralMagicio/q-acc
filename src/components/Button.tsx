import { FC, ButtonHTMLAttributes } from "react";
import { Spinner } from "./Loading/Spinner";

export enum ButtonColor {
  Pink = "pink",
  Gray = "gray",
  Giv = "giv",
}

export enum ButtonStyle {
  Solid = "solid",
  Outline = "outline",
  Text = "text",
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  color?: ButtonColor;
  styleType?: ButtonStyle;
}

const variantClasses = {
  [ButtonColor.Pink]: {
    [ButtonStyle.Solid]: "text-white bg-pink-500",
    [ButtonStyle.Outline]:
      "text-pink-500 border border-pink-500 bg-transparent",
    [ButtonStyle.Text]: "text-pink-500 bg-transparent",
  },
  [ButtonColor.Gray]: {
    [ButtonStyle.Solid]: "text-white bg-gray-500",
    [ButtonStyle.Outline]:
      "text-gray-500 border border-gray-500 bg-transparent",
    [ButtonStyle.Text]: "text-gray-500 bg-transparent",
  },
  [ButtonColor.Giv]: {
    [ButtonStyle.Solid]: "text-white bg-giv-500",
    [ButtonStyle.Outline]: "text-giv-500 border border-giv-500 bg-transparent",
    [ButtonStyle.Text]: "text-giv-500 bg-transparent",
  },
};

const disabledClass = "opacity-50 cursor-not-allowed";

export const Button: FC<IButtonProps> = ({
  children,
  loading,
  color = ButtonColor.Pink,
  styleType = ButtonStyle.Solid,
  ...props
}) => {
  const variantClass = variantClasses[color][styleType];
  const isDisabled = loading || props.disabled;

  return (
    <button
      {...props}
      className={`font-bold text-xs border-none rounded-full py-4 px-10 flex gap-2 ${variantClass} ${
        isDisabled ? disabledClass : ""
      }`}
      disabled={isDisabled}
    >
      {loading && <Spinner size={16} />}
      {children}
    </button>
  );
};
