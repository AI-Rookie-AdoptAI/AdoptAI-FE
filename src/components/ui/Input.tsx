import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, id, className = "", ...props }: InputProps) {
  const inputId = id ?? label;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-[13px] font-semibold text-brand-800">
        {label}
      </label>
      <input
        id={inputId}
        className={`h-12 px-4 rounded-xl border text-[14px] text-brand-800 placeholder:text-brand-300 bg-surface-50 outline-none transition-colors
          ${error ? "border-destructive-400 focus:border-destructive-600 focus-visible:ring-2 focus-visible:ring-destructive-300" : "border-brand-150 focus:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-300"}
          disabled:opacity-40 ${className}`}
        {...props}
      />
      {error && <p className="text-[12px] text-destructive-500">{error}</p>}
    </div>
  );
}
