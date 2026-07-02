"use client";

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

export default function Toggle({ checked, onChange, disabled }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative w-[46px] h-[26px] rounded-full transition-colors shrink-0 ${
        checked ? "bg-brand-500" : "bg-brand-150"
      } disabled:opacity-40`}
    >
      <span
        className={`absolute top-[3px] w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
          checked ? "translate-x-[23px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}
