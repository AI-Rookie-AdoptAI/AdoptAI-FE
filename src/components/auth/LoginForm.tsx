"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Banner from "@/components/ui/Banner";

export default function LoginForm() {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const errs: typeof fieldErrors = {};
    if (!email) errs.email = "이메일을 입력해 주세요";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "올바른 이메일 형식이 아니에요";
    if (!password) errs.password = "비밀번호를 입력해 주세요";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    if (!validate()) return;
    await login({ email, password });
  }

  const isMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {isMock && (
        <Banner
          tone="neutral"
          title="개발 모드"
          description="아무 이메일/비밀번호나 입력하면 로그인됩니다"
        />
      )}
      <Input
        label="이메일"
        id="email"
        type="email"
        placeholder="hello@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
        autoComplete="email"
        disabled={loading}
      />
      <Input
        label="비밀번호"
        id="password"
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
        autoComplete="current-password"
        disabled={loading}
      />

      {error && (
        <p className="text-[13px] text-red-500 bg-red-50 rounded-xl px-4 py-2.5">{error}</p>
      )}

      <Button type="submit" size="lg" className="w-full mt-1" disabled={loading}>
        {loading ? "로그인 중…" : "로그인"}
      </Button>

      <p className="text-center text-[13px] text-brand-400">
        아직 계정이 없으신가요?{" "}
        <Link href="/signup" className="text-brand-500 font-semibold hover:underline">
          회원가입
        </Link>
      </p>
    </form>
  );
}
