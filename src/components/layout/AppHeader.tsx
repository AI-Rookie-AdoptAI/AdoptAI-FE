import Link from "next/link";
import { AppIcon } from "@/components/ui/Icons";

interface AppHeaderProps {
  userName?: string;
}

export default function AppHeader({ userName }: AppHeaderProps) {
  const initial = userName ? userName.slice(0, 1) : "민";

  return (
    <header className="flex items-center justify-between px-[22px] pt-4 pb-3.5 bg-surface-50">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-[10px] overflow-hidden shrink-0">
          <AppIcon size={32} />
        </div>
        <span className="text-[19px] font-extrabold text-brand-800 tracking-tight leading-none">
          AdoptAI
        </span>
      </Link>
      <div className="w-9 h-9 rounded-[18px] bg-surface-100 flex items-center justify-center">
        <span className="text-[14px] font-bold text-brand-500">{initial}</span>
      </div>
    </header>
  );
}
