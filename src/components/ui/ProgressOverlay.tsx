"use client";

import { AppIcon } from "@/components/ui/Icons";

interface ProgressOverlayProps {
  open: boolean;
  title: string;
  description?: string;
  /** 0~100 */
  progress: number;
  /** 예: "3개 플랫폼 중 2개 완료" */
  subtext?: string;
}

export default function ProgressOverlay({ open, title, description, progress, subtext }: ProgressOverlayProps) {
  if (!open) return null;
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-brand-900/85 backdrop-blur-md px-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-[88px] h-[88px] rounded-full border-4 border-accent-500 flex items-center justify-center shrink-0">
        <div className="w-[52px] h-[52px] rounded-2xl overflow-hidden shadow-lg">
          <AppIcon size={52} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-1.5 text-center">
        <h2 className="text-[18px] font-extrabold text-white tracking-tight">{title}</h2>
        {description && <p className="text-[12px] text-white/75 leading-[1.7]">{description}</p>}
      </div>

      <div className="flex flex-col items-center gap-2.5 w-full max-w-[200px]">
        <div className="w-full h-[7px] rounded-full bg-white/22 overflow-hidden">
          <div
            className="h-full rounded-full bg-accent-500 transition-[width] duration-300"
            style={{ width: `${clamped}%` }}
          />
        </div>
        {subtext && <p className="text-[11px] font-semibold text-white/70">{subtext}</p>}
      </div>
    </div>
  );
}
