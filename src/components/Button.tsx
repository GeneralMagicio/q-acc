import { FC, ButtonHTMLAttributes } from "react";
import { Spinner } from "./Loading/Spinner";

export enum ButtonColor {
  Pink = "pink",
  Gray = "gray",
  Giv = "giv",
  Base = "base",
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
  [ButtonColor.Base]: {
    [ButtonStyle.Solid]: "text-giv-500 bg-white",
    [ButtonStyle.Outline]: "text-giv-500 border border-giv-500 bg-transparent",
    [ButtonStyle.Text]: "text-giv-500 bg-transparent",
  },
};

const disabledClass = "opacity-50 cursor-not-allowed";

export const Button: FC<IButtonProps> = ({
  children,
  loading,
  color = ButtonColor.Base,
  styleType = ButtonStyle.Solid,
  className = "",
  ...props
}) => {
  const variantClass = variantClasses[color][styleType];
  const isDisabled = loading || props.disabled;

  return (
    <button
      {...props}
      className={`px-6 py-4 rounded-full text-base font-bold items-center flex ${variantClass} ${
        isDisabled ? disabledClass : ""
      } ${className}`} // Combine the variant class with any additional classes
      disabled={isDisabled}
    >
      {loading && <Spinner size={16} />}
      {children}
    </button>
  );
};
