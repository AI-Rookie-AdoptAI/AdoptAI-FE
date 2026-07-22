"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface SignupFormProps {
  onSwitchTab?: () => void;
}

export default function SignupForm({ onSwitchTab }: SignupFormProps) {
  const { signup, loading, error, clearError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirm?: string;
  }>({});

  function validate() {
    const errs: typeof fieldErrors = {};
    if (!name.trim()) errs.name = "이름을 입력해 주세요";
    if (!email) errs.email = "이메일을 입력해 주세요";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "올바른 이메일 형식이 아니에요";
    if (!password) errs.password = "비밀번호를 입력해 주세요";
    else if (password.length < 8) errs.password = "8자 이상 입력해 주세요";
    if (!confirm) errs.confirm = "비밀번호를 다시 입력해 주세요";
    else if (confirm !== password) errs.confirm = "비밀번호가 일치하지 않아요";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    if (!validate()) return;
    await signup({ name, email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="이름"
        id="name"
        type="text"
        placeholder="홍길동"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={fieldErrors.name}
        autoComplete="name"
        disabled={loading}
      />
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
        placeholder="8자 이상"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
        autoComplete="new-password"
        disabled={loading}
      />
      <Input
        label="비밀번호 확인"
        id="confirm"
        type="password"
        placeholder="비밀번호 재입력"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={fieldErrors.confirm}
        autoComplete="new-password"
        disabled={loading}
      />

      {error && (
        <p className="text-[13px] text-destructive-500 bg-destructive-100 rounded-xl px-4 py-2.5">{error}</p>
      )}

      <Button type="submit" size="lg" className="w-full mt-1" disabled={loading}>
        {loading ? "가입 중…" : "시작하기"}
      </Button>

      <p className="text-center text-[13px] text-brand-400">
        이미 계정이 있으신가요?{" "}
        <button type="button" onClick={onSwitchTab} className="text-brand-500 font-semibold hover:underline">
          로그인
        </button>
      </p>
    </form>
  );
}
