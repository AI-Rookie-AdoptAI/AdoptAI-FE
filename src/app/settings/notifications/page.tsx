"use client";

import { useState } from "react";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Toggle from "@/components/ui/Toggle";
import Button from "@/components/ui/Button";

interface NotifSettings {
  adoptionInquiry: boolean;
  draftReminder: boolean;
  publishSuccess: boolean;
  weeklyReport: boolean;
  appPush: boolean;
  emailNotif: boolean;
}

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotifSettings>({
    adoptionInquiry: true,
    draftReminder: true,
    publishSuccess: true,
    weeklyReport: false,
    appPush: true,
    emailNotif: false,
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggle(key: keyof NotifSettings) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleSave() {
    setLoading(true);
    // TODO: PATCH /users/me/notification-settings
    await new Promise((r) => setTimeout(r, 500));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-50">
      <SettingsHeader title="알림 설정" />

      <main className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-6 pb-10 flex flex-col gap-5">
        <Section title="공고 알림">
          <ToggleRow
            label="입양 문의"
            desc="새로운 입양 문의가 들어오면 알려드려요"
            checked={settings.adoptionInquiry}
            onChange={() => toggle("adoptionInquiry")}
          />
          <ToggleRow
            label="작성 중 공고 리마인더"
            desc="3일 이상 미완성인 공고가 있으면 알려드려요"
            checked={settings.draftReminder}
            onChange={() => toggle("draftReminder")}
          />
          <ToggleRow
            label="게시 완료"
            desc="공고가 성공적으로 게시되면 알려드려요"
            checked={settings.publishSuccess}
            onChange={() => toggle("publishSuccess")}
          />
        </Section>

        <Section title="리포트">
          <ToggleRow
            label="주간 리포트"
            desc="매주 월요일, 공고 조회수·문의 수 요약을 보내드려요"
            checked={settings.weeklyReport}
            onChange={() => toggle("weeklyReport")}
          />
        </Section>

        <Section title="알림 수단">
          <ToggleRow
            label="앱 푸시 알림"
            desc="기기 푸시 알림으로 받아요"
            checked={settings.appPush}
            onChange={() => toggle("appPush")}
          />
          <ToggleRow
            label="이메일 알림"
            desc="가입한 이메일로 받아요"
            checked={settings.emailNotif}
            onChange={() => toggle("emailNotif")}
          />
        </Section>

        <Button size="lg" className="w-full" onClick={handleSave} disabled={loading}>
          {saved ? "저장됐어요 ✓" : loading ? "저장 중…" : "저장하기"}
        </Button>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0 bg-surface-50 border border-brand-75 rounded-[18px] overflow-hidden">
      <p className="text-[12px] font-bold text-brand-300 uppercase tracking-wide px-4 pt-4 pb-2">
        {title}
      </p>
      <div className="divide-y divide-brand-25">{children}</div>
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3.5">
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-brand-800">{label}</p>
        <p className="text-[12px] text-brand-400 mt-0.5">{desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}
