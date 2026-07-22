"use client";

interface TabsProps<T extends string> {
  tabs: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  ariaLabel?: string;
}

export default function Tabs<T extends string>({ tabs, value, onChange, className = "", ariaLabel = "탭 목록" }: TabsProps<T>) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={`flex ${className}`}>
      {tabs.map((tab) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.value)}
            className="flex-1 flex flex-col items-center gap-1.5 py-2"
          >
            <span className={`text-[14px] ${selected ? "font-bold text-brand-800" : "font-medium text-brand-450"}`}>
              {tab.label}
            </span>
            <span className={`h-1 w-6 rounded-full ${selected ? "bg-accent-500" : "bg-transparent"}`} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
