"use client";

import Link from "next/link";
import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import { useAuth } from "@/lib/AuthContext";
import { ChevronRightIcon, UserIcon, GlobeIcon, BellIcon, HelpCircleIcon } from "@/components/ui/Icons";
import type { ComponentType } from "react";

type IconComp = ComponentType<{ size?: number; color?: string }>;

const MENU: { href: string; label: string; desc: string; Icon: IconComp }[] = [
  { href: "/settings/profile",       label: "프로필 수정",  desc: "이름, 이메일, 비밀번호",    Icon: UserIcon },
  { href: "/settings/shelter",       label: "보호소 정보",  desc: "보호소 이름, 지역, 연락처", Icon: GlobeIcon },
  { href: "/settings/notifications", label: "알림 설정",    desc: "공고 업데이트, 입양 문의",  Icon: BellIcon },
  { href: "/settings/help",          label: "도움말",       desc: "사용 방법, 자주 묻는 질문", Icon: HelpCircleIcon },
];

export default function SettingsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-surface-50">
      <AppHeader userName={user?.name} />

      <main className="flex-1 overflow-y-auto scrollbar-hide pb-[88px] px-[22px] pt-2">
        {/* 프로필 요약 카드 */}
        <Link href="/settings/profile" className="flex items-center gap-3.5 bg-surface-50 border border-brand-75 rounded-[20px] p-4 mb-5 hover:bg-brand-50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-surface-100 flex items-center justify-center shrink-0">
            <span className="text-[20px] font-bold text-brand-500">
              {user?.name?.slice(0, 1) ?? "민"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-extrabold text-brand-800 truncate">
              {user?.name ?? "민정"}
            </p>
            <p className="text-[12px] text-brand-400 truncate">{user?.email ?? "test@test.com"}</p>
          </div>
          <ChevronRightIcon size={20} color="#cbb9a3" />
        </Link>

        {/* 메뉴 목록 */}
        <div className="flex flex-col gap-2">
          {MENU.map(({ href, label, desc, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3.5 bg-surface-50 border border-brand-75 rounded-[18px] px-4 py-3.5 hover:bg-brand-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-[12px] bg-surface-100 flex items-center justify-center shrink-0 text-brand-500">
                <Icon size={18} color="currentColor" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-brand-800">{label}</p>
                <p className="text-[12px] text-brand-400 mt-0.5">{desc}</p>
              </div>
              <ChevronRightIcon size={20} color="#cbb9a3" />
            </Link>
          ))}
        </div>

        {/* 로그아웃 */}
        <button
          onClick={() => logout()}
          className="w-full mt-5 py-3.5 rounded-[18px] border border-brand-100 text-[14px] font-bold text-brand-400 hover:bg-brand-50 transition-colors"
        >
          로그아웃
        </button>
        <p className="text-center text-[11px] text-brand-200 mt-4">AdoptAI v0.1.0</p>
      </main>

      <BottomNav />
    </div>
  );
}
