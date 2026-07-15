"use client";

import { SearchIcon } from "@/components/ui/Icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ value, onChange, placeholder = "검색", className = "" }: SearchBarProps) {
  return (
    <div className={`flex items-center gap-2.5 bg-surface-100 rounded-full px-4 py-3 ${className}`}>
      <span className="text-brand-400 shrink-0">
        <SearchIcon size={16} color="currentColor" />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent text-[14px] text-brand-800 placeholder:text-brand-300 outline-none"
      />
    </div>
  );
}
