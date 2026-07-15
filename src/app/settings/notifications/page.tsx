"use client";

import { useState } from "react";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Section from "@/components/ui/Section";
import ListItem from "@/components/ui/ListItem";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

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
          <ListItem
            title="입양 문의"
            description="새로운 입양 문의가 들어오면 알려드려요"
            control={{ type: "toggle", checked: settings.adoptionInquiry, onChange: () => toggle("adoptionInquiry") }}
          />
          <ListItem
            title="작성 중 공고 리마인더"
            description="3일 이상 미완성인 공고가 있으면 알려드려요"
            control={{ type: "toggle", checked: settings.draftReminder, onChange: () => toggle("draftReminder") }}
          />
          <ListItem
            title="게시 완료"
            description="공고가 성공적으로 게시되면 알려드려요"
            control={{ type: "toggle", checked: settings.publishSuccess, onChange: () => toggle("publishSuccess") }}
          />
        </Section>

        <Section title="리포트">
          <ListItem
            title="주간 리포트"
            description="매주 월요일, 공고 조회수·문의 수 요약을 보내드려요"
            control={{ type: "toggle", checked: settings.weeklyReport, onChange: () => toggle("weeklyReport") }}
          />
        </Section>

        <Section title="알림 수단">
          <ListItem
            title="앱 푸시 알림"
            description="기기 푸시 알림으로 받아요"
            control={{ type: "toggle", checked: settings.appPush, onChange: () => toggle("appPush") }}
          />
          <ListItem
            title="이메일 알림"
            description="가입한 이메일로 받아요"
            control={{ type: "toggle", checked: settings.emailNotif, onChange: () => toggle("emailNotif") }}
          />
        </Section>

        <Button size="lg" className="w-full" onClick={handleSave} disabled={loading}>
          {saved ? (
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon size={16} color="currentColor" />
              저장됐어요
            </span>
          ) : loading ? "저장 중…" : "저장하기"}
        </Button>
      </main>
    </div>
  );
}
