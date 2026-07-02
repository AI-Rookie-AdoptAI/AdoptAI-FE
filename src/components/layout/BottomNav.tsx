"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeFillIcon, HomeIcon, PetsIcon, BellIcon, SettingsIcon } from "@/components/ui/Icons";

const navItems = [
  { href: "/", label: "홈", ActiveIcon: HomeFillIcon, Icon: HomeIcon },
  { href: "/announcements", label: "공고", ActiveIcon: PetsIcon, Icon: PetsIcon },
  { href: "/notifications", label: "알림", ActiveIcon: BellIcon, Icon: BellIcon },
  { href: "/settings", label: "설정", ActiveIcon: SettingsIcon, Icon: SettingsIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-50 border-t border-brand-75 flex justify-around items-center pb-6 pt-3 z-40">
      {navItems.map(({ href, label, ActiveIcon, Icon }) => {
        const active = pathname === href;
        const IconComp = active ? ActiveIcon : Icon;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              active ? "text-brand-500" : "text-brand-200"
            }`}
          >
            <IconComp size={25} color="currentColor" />
            <span className={`text-[10px] ${active ? "font-bold" : "font-medium"}`}>
              {label}
            </span>
          </Link>
        );
      })}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-[5px] bg-brand-800 opacity-25 rounded-full" />
    </nav>
  );
}
