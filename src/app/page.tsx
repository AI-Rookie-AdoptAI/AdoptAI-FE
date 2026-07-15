"use client";

import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import ActionSheet from "@/components/ui/ActionSheet";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ExportFilesSheet from "@/components/ui/ExportFilesSheet";
import Toast from "@/components/ui/Toast";
import Link from "next/link";
import { SparkleIcon, CameraIcon, MicIcon, EditIcon, TrashIcon, CopyIcon } from "@/components/ui/Icons";
import { PET_PHOTO_GRADIENTS } from "@/lib/constants";
import { hashIndex } from "@/lib/utils";
import type { Announcement } from "@/lib/types";

const mockDraft: Announcement[] = [
  {
    id: "1",
    status: "draft",
    title: "보리",
    petInfo: { name: "보리", species: "dog", breed: "믹스견", gender: "male", estimatedAge: { value: 3, unit: "년" }, weightKg: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    status: "in_review",
    title: "나비",
    petInfo: { name: "나비", species: "cat", breed: "코리안 숏헤어", gender: "female", estimatedAge: { value: 2, unit: "년" } },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockPublished: Announcement[] = [
  {
    id: "3",
    status: "published",
    title: "단비",
    petInfo: { name: "단비", species: "dog", breed: "말티즈", gender: "female", estimatedAge: { value: 1, unit: "년" } },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    status: "published",
    title: "콩이",
    petInfo: { name: "콩이", species: "cat", breed: "스코티시폴드", gender: "unknown", estimatedAge: { value: 3, unit: "개월" } },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const quickStart = [
  { label: "사진으로", Icon: CameraIcon, href: "/chat" },
  { label: "음성으로", Icon: MicIcon, href: "/chat" },
  { label: "직접 입력", Icon: EditIcon, href: "/chat" },
];

export default function HomePage() {
  const [actionSheetTarget, setActionSheetTarget] = useState<Announcement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);
  const [exportTarget, setExportTarget] = useState<Announcement | null>(null);
  const [toast, setToast] = useState("");

  function showToast(message: string) {
    setToast(message);
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <AppHeader userName="민정" />

      <main className="flex-1 overflow-y-auto scrollbar-hide pb-[88px]">
        {/* Greeting */}
        <div className="px-[22px] pt-1 pb-4 flex flex-col gap-1">
          <h1 className="text-[23px] font-extrabold text-brand-800 tracking-tight leading-tight">
            민정님, 안녕하세요
          </h1>
          <p className="text-[13.5px] text-brand-400">
            구조한 아이를 새 가족과 이어줄 시간이에요
          </p>
        </div>

        {/* CTA card */}
        <div className="mx-[22px] mb-4">
          <Link
            href="/chat"
            className="flex items-center justify-between bg-brand-500 rounded-[22px] p-5 shadow-[0_12px_24px_-8px_rgba(138,90,43,0.5)] hover:bg-brand-600 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <p className="text-[17px] font-extrabold text-white tracking-tight">
                새 공고 작성하기
              </p>
              <p className="text-[12px] text-white/78">
                사진과 음성이면 1분이면 충분해요
              </p>
            </div>
            <div className="w-[46px] h-[46px] bg-white/18 rounded-xl flex items-center justify-center shrink-0">
              <SparkleIcon size={22} color="white" />
            </div>
          </Link>
        </div>

        {/* Quick start */}
        <section className="px-[22px] mb-5">
          <h2 className="text-[13px] font-bold text-brand-600 mb-2.5">빠른 시작</h2>
          <div className="grid grid-cols-3 gap-2.5">
            {quickStart.map(({ label, Icon, href }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-2 py-4 rounded-2xl border border-brand-75 bg-surface-50 hover:bg-brand-50 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-75 text-brand-500 flex items-center justify-center">
                  <Icon size={20} color="currentColor" />
                </div>
                <span className="text-[12px] font-bold text-brand-700">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Draft section */}
        <section className="px-[22px] mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[13px] font-bold text-brand-600">작성 중</h2>
            <span className="text-[12px] text-brand-300">{mockDraft.length}건</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {mockDraft.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} onMore={setActionSheetTarget} />
            ))}
          </div>
        </section>

        {/* Published section */}
        <section className="px-[22px]">
          <h2 className="text-[13px] font-bold text-brand-600 mb-2.5">최근 게시</h2>
          <div className="grid grid-cols-2 gap-3">
            {mockPublished.map((a) => (
              <AnnouncementGridCard key={a.id} announcement={a} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />

      <ActionSheet
        open={actionSheetTarget !== null}
        onClose={() => setActionSheetTarget(null)}
        subtitle={actionSheetTarget?.petInfo.name ?? actionSheetTarget?.title}
        items={[
          {
            label: "이름 변경",
            icon: <EditIcon size={22} color="currentColor" />,
            onClick: () => {
              setActionSheetTarget(null);
              showToast("이름을 변경했어요");
            },
          },
          {
            label: "복제",
            icon: <CopyIcon size={22} color="currentColor" />,
            onClick: () => {
              setActionSheetTarget(null);
              showToast("공고를 복제했어요");
            },
          },
          {
            label: "파일 다시 내보내기",
            icon: <SparkleIcon size={22} color="currentColor" />,
            onClick: () => {
              setExportTarget(actionSheetTarget);
              setActionSheetTarget(null);
            },
          },
          {
            label: "삭제",
            icon: <TrashIcon size={22} color="currentColor" />,
            destructive: true,
            onClick: () => {
              setDeleteTarget(actionSheetTarget);
              setActionSheetTarget(null);
            },
          },
        ]}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          showToast(`${deleteTarget?.petInfo.name ?? "공고"} 초안을 삭제했어요`);
          setDeleteTarget(null);
        }}
        title="초안을 삭제할까요?"
        description={`${deleteTarget?.petInfo.name ?? "이"} 초안과 생성한 파일이 모두 사라져요. 되돌릴 수 없어요.`}
        confirmLabel="삭제"
        destructive
        icon={<TrashIcon size={28} color="currentColor" />}
      />

      {exportTarget && (
        <ExportFilesSheet
          open={exportTarget !== null}
          onClose={() => setExportTarget(null)}
          subtitle={`${exportTarget.petInfo.name ?? exportTarget.title} · 저장할 파일을 선택하세요`}
          files={[
            { id: "md", name: `${exportTarget.petInfo.name}_공고.md`, meta: "Markdown · 0.4 KB" },
            { id: "txt", name: `${exportTarget.petInfo.name}_공고.txt`, meta: "텍스트 · 0.3 KB" },
          ]}
          onCopy={() => {
            showToast("클립보드에 복사했어요");
            setExportTarget(null);
          }}
          onSave={(ids) => {
            showToast(`파일 ${ids.length}개를 저장했어요`);
            setExportTarget(null);
          }}
        />
      )}

      <Toast open={toast !== ""} message={toast} onClose={() => setToast("")} />
    </div>
  );
}

function AnnouncementGridCard({ announcement }: { announcement: Announcement }) {
  const idx = hashIndex(announcement.id, PET_PHOTO_GRADIENTS.length);

  return (
    <Link href={`/announcements/${announcement.id}`} className="flex flex-col gap-1.5">
      <div className={`aspect-square rounded-[16px] bg-gradient-to-br ${PET_PHOTO_GRADIENTS[idx]}`} />
      <p className="text-[13px] font-bold text-brand-800">
        {announcement.petInfo.name ?? announcement.petInfo.breed}
      </p>
    </Link>
  );
}
