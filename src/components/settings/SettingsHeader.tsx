"use client";

import Link from "next/link";
import { ChevronLeftIcon } from "@/components/ui/Icons";

interface SettingsHeaderProps {
  title: string;
  backHref?: string;
}

export default function SettingsHeader({ title, backHref = "/settings" }: SettingsHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-4 pt-14 pb-3 bg-surface-50 border-b border-brand-75 shrink-0">
      <Link href={backHref} className="text-brand-500 hover:text-brand-600 transition-colors">
        <ChevronLeftIcon size={24} color="currentColor" />
      </Link>
      <h1 className="text-[17px] font-extrabold text-brand-800">{title}</h1>
    </header>
  );
}
