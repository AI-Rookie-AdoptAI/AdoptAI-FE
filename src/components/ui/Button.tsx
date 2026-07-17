import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClass: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700",
  secondary:
    "bg-surface-50 text-brand-800 border border-brand-150 hover:bg-brand-50",
  ghost:
    "text-brand-500 hover:bg-brand-50",
};

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] rounded-xl",
  md: "h-11 px-5 text-[13.5px] rounded-xl",
  lg: "h-[52px] px-6 text-[14px] rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold tracking-[0.1px] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
