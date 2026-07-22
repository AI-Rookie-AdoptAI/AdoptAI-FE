"use client";

import { useState } from "react";
import Link from "next/link";
import { AppIcon } from "@/components/ui/Icons";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

type Tab = "login" | "signup";

interface AuthUnifiedPageProps {
  initialTab?: Tab;
}

export default function AuthUnifiedPage({ initialTab = "login" }: AuthUnifiedPageProps) {
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Back to intro */}
      <div className="px-6 pt-5">
        <Link href="/intro" className="text-[13px] text-brand-400 hover:text-brand-600 transition-colors">
          ← 소개 보기
        </Link>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-6 pb-10">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-[0_6px_16px_-4px_rgba(138,90,43,0.3)]">
            <AppIcon size={56} />
          </div>
          <div className="text-center">
            <p className="text-[22px] font-extrabold text-brand-800 tracking-tight">AdoptAI</p>
            <p className="text-[13px] text-brand-400 mt-0.5">대화형 입양 공고 도우미</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-surface-100 rounded-2xl p-1 mb-6">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2.5 rounded-xl text-[13.5px] font-bold transition-colors ${
              tab === "login"
                ? "bg-surface-50 text-brand-800 shadow-sm"
                : "text-brand-400 hover:text-brand-600"
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2.5 rounded-xl text-[13.5px] font-bold transition-colors ${
              tab === "signup"
                ? "bg-surface-50 text-brand-800 shadow-sm"
                : "text-brand-400 hover:text-brand-600"
            }`}
          >
            회원가입
          </button>
        </div>

        {/* Title */}
        <div className="mb-5">
          <h1 className="text-[22px] font-extrabold text-brand-800 tracking-tight">
            {tab === "login" ? "다시 오셨군요!" : "처음 오셨나요?"}
          </h1>
          <p className="text-[13.5px] text-brand-400 mt-1">
            {tab === "login"
              ? "이메일과 비밀번호로 로그인해 주세요"
              : "계정을 만들고 입양 공고 작성을 시작하세요"}
          </p>
        </div>

        {/* Form */}
        {tab === "login" ? (
          <LoginForm onSwitchTab={() => setTab("signup")} />
        ) : (
          <SignupForm onSwitchTab={() => setTab("login")} />
        )}
      </div>
    </div>
  );
}
