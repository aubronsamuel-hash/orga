import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "sm" | "md";
};

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "default",
  size = "md",
  ...props
}) => {
  const base = "inline-flex items-center justify-center rounded-2xl font-medium transition";
  const sizes = size === "sm" ? "h-8 px-3 text-sm" : "h-10 px-4";
  const variants =
    variant === "outline"
      ? "border border-gray-300 bg-white hover:bg-gray-50"
      : "bg-gray-900 text-white hover:bg-black";
  return <button className={`${base} ${sizes} ${variants} ${className ?? ""}`} {...props} />;
};
