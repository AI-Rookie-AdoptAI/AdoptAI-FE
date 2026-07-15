"use client";

import { useState } from "react";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { useAuth } from "@/lib/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [email] = useState(user?.email ?? "");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "이름을 입력해 주세요";
    if (newPw && newPw.length < 8) e.newPw = "비밀번호는 8자 이상이어야 해요";
    if (newPw && newPw !== confirmPw) e.confirmPw = "비밀번호가 일치하지 않아요";
    if (newPw && !currentPw) e.currentPw = "현재 비밀번호를 입력해 주세요";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // TODO: PATCH /users/me
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setLoading(false);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-50">
      <SettingsHeader title="프로필 수정" />

      <main className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-6 pb-10">
        {/* 아바타 */}
        <div className="flex flex-col items-center mb-7">
          <div className="w-20 h-20 rounded-full bg-surface-100 border border-brand-100 flex items-center justify-center mb-3">
            <span className="text-[32px] font-bold text-brand-500">
              {name.slice(0, 1) || "?"}
            </span>
          </div>
          <button className="text-[13px] font-semibold text-brand-500 hover:underline">
            사진 변경
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-5">
          {/* 기본 정보 */}
          <Section title="기본 정보">
            <Input
              label="이름"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              placeholder="홍길동"
            />
            <Input
              label="이메일"
              id="email"
              value={email}
              disabled
              placeholder="이메일"
            />
          </Section>

          {/* 비밀번호 변경 */}
          <Section title="비밀번호 변경">
            <Input
              label="현재 비밀번호"
              id="currentPw"
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              error={errors.currentPw}
              placeholder="현재 비밀번호"
              autoComplete="current-password"
            />
            <Input
              label="새 비밀번호"
              id="newPw"
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              error={errors.newPw}
              placeholder="8자 이상"
              autoComplete="new-password"
            />
            <Input
              label="새 비밀번호 확인"
              id="confirmPw"
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              error={errors.confirmPw}
              placeholder="비밀번호 재입력"
              autoComplete="new-password"
            />
          </Section>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {saved ? (
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon size={16} color="currentColor" />
                저장됐어요
              </span>
            ) : loading ? "저장 중…" : "저장하기"}
          </Button>
        </form>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] font-bold text-brand-300 uppercase tracking-wide">{title}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
