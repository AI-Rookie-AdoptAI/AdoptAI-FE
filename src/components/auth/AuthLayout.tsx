import type { ReactNode } from "react";
import { AppIcon } from "@/components/ui/Icons";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden">
            <AppIcon size={56} />
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-brand-800 tracking-tight">AdoptAI</p>
            <p className="text-[13px] text-brand-400 mt-0.5">대화형 입양 공고 도우미</p>
          </div>
        </div>

        {/* Form — 별도 카드 없이 배경 위에 바로 */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-[24px] font-extrabold text-brand-800 tracking-[0.1px]">{title}</h1>
            <p className="text-[14px] text-brand-400 mt-1.5">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
