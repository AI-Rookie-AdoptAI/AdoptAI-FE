import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center px-5 py-12">
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <div className="w-14 h-14 bg-brand-500 rounded-[18px] flex items-center justify-center">
          <PawIcon />
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold text-brand-800 tracking-tight">AdoptAI</p>
          <p className="text-[13px] text-brand-400 mt-0.5">대화형 입양 공고 도우미</p>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-surface-50 rounded-3xl border border-brand-100 p-6 flex flex-col gap-6">
        <div>
          <h1 className="text-[20px] font-bold text-brand-800">{title}</h1>
          <p className="text-[14px] text-brand-400 mt-1">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function PawIcon() {
  return (
    <svg width="28" height="25" viewBox="0 0 24 21" fill="none">
      <rect x="5.5" y="9" width="13" height="12" rx="6.25" ry="5.75" fill="white" />
      <rect x="0.5" y="0" width="5.5" height="7" rx="3.13" fill="white" />
      <rect x="7.5" y="-2" width="5.5" height="7" rx="3.13" fill="white" />
      <rect x="13" y="-2" width="5.5" height="7" rx="3.13" fill="white" />
      <rect x="18.5" y="0" width="5.5" height="7" rx="3.13" fill="white" />
    </svg>
  );
}
