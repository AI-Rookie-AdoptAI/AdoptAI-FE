import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="flex items-center gap-3 px-5 pt-12 pb-4">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-11 h-11 bg-brand-500 rounded-[14px] flex items-center justify-center shrink-0">
          <PawIcon />
        </div>
        <div className="flex flex-col gap-[1px]">
          <span className="text-2xl font-extrabold text-brand-800 tracking-tight leading-none">
            AdoptAI
          </span>
          <span className="text-[13px] text-brand-400 leading-none">
            대화형 입양 공고 도우미
          </span>
        </div>
      </Link>
    </header>
  );
}

function PawIcon() {
  return (
    <svg width="24" height="21" viewBox="0 0 24 21" fill="none">
      <rect x="5.5" y="9" width="13" height="12" rx="6.25" ry="5.75" fill="white" />
      <rect x="0.5" y="0" width="5.5" height="7" rx="3.13" fill="white" />
      <rect x="7.5" y="-2" width="5.5" height="7" rx="3.13" fill="white" />
      <rect x="13" y="-2" width="5.5" height="7" rx="3.13" fill="white" />
      <rect x="18.5" y="0" width="5.5" height="7" rx="3.13" fill="white" />
    </svg>
  );
}
