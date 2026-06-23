"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "홈", icon: HomeIcon },
  { href: "/chat", label: "새 공고", icon: PlusIcon },
  { href: "/announcements", label: "내 공고", icon: ListIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-50/90 backdrop-blur-sm border-t border-brand-100 flex justify-around items-center h-[72px] px-4 pb-safe">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
              active ? "text-brand-500" : "text-brand-300"
            }`}
          >
            <Icon active={active} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
        fill={active ? "#8a5a2b" : "none"}
        stroke={active ? "#8a5a2b" : "#9a8b7c"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="6"
        fill={active ? "#8a5a2b" : "none"}
        stroke={active ? "#8a5a2b" : "#9a8b7c"}
        strokeWidth="1.8"
      />
      <path
        d="M12 8V16M8 12H16"
        stroke={active ? "white" : "#9a8b7c"}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01"
        stroke={active ? "#8a5a2b" : "#9a8b7c"}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
