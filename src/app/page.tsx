"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import ActionSheet from "@/components/ui/ActionSheet";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ExportFilesSheet from "@/components/ui/ExportFilesSheet";
import Toast from "@/components/ui/Toast";
import Link from "next/link";
import { SparkleIcon, CameraIcon, MicIcon, EditIcon, TrashIcon, CopyIcon, PetsIcon } from "@/components/ui/Icons";
import { useAuth } from "@/lib/AuthContext";
import { fetchAnnouncements, type AnnouncementListItem } from "@/lib/chatApi";
import type { Announcement } from "@/lib/types";
import { PET_PHOTO_GRADIENTS } from "@/lib/constants";
import { hashIndex } from "@/lib/utils";

function toAnnouncement(item: AnnouncementListItem): Announcement {
  return {
    id: item.id,
    status: item.status,
    title: item.title,
    petInfo: item.petInfo,
    sessionId: item.sessionId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

const quickStart = [
  { label: "사진으로", Icon: CameraIcon, href: "/chat?mode=photo" },
  { label: "음성으로", Icon: MicIcon, href: "/chat?mode=voice" },
  { label: "직접 입력", Icon: EditIcon, href: "/chat?mode=text" },
];

export default function HomePage() {
  const { user } = useAuth();
  const [drafts, setDrafts] = useState<Announcement[]>([]);
  const [published, setPublished] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const [actionSheetTarget, setActionSheetTarget] = useState<Announcement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);
  const [exportTarget, setExportTarget] = useState<Announcement | null>(null);
  const [toast, setToast] = useState("");

  function showToast(message: string) {
    setToast(message);
  }

  useEffect(() => {
    Promise.all([
      fetchAnnouncements({ status: "draft", perPage: 5 }),
      fetchAnnouncements({ status: "published", perPage: 4 }),
    ])
      .then(([draftRes, pubRes]) => {
        setDrafts(draftRes.items.map(toAnnouncement));
        setPublished(pubRes.items.map(toAnnouncement));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <AppHeader userName={user?.name ?? ""} />

      <main className="flex-1 overflow-y-auto scrollbar-hide pb-[88px]">
        <div className="px-[22px] pt-1 pb-4 flex flex-col gap-1">
          <h1 className="text-[23px] font-extrabold text-brand-800 tracking-tight leading-tight">
            {user?.name ? `${user.name}님, 안녕하세요` : "안녕하세요"}
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

        {loading ? (
          <div className="flex justify-center py-10">
            <p className="text-[13px] text-brand-300">불러오는 중…</p>
          </div>
        ) : drafts.length === 0 && published.length === 0 ? (
          <section className="px-[22px] py-8 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center text-brand-200">
              <PetsIcon size={28} color="currentColor" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-brand-700">아직 공고가 없어요</p>
              <p className="text-[12.5px] text-brand-400 mt-1">위 버튼을 눌러 첫 공고를 만들어 보세요</p>
            </div>
          </section>
        ) : (
          <>
            {drafts.length > 0 && (
              <section className="px-[22px] mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-[13px] font-bold text-brand-600">작성 중</h2>
                  <span className="text-[12px] text-brand-300">{drafts.length}건</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {drafts.map((a) => (
                    <AnnouncementCard key={a.id} announcement={a} onMore={setActionSheetTarget} />
                  ))}
                </div>
              </section>
            )}

            {published.length > 0 && (
              <section className="px-[22px]">
                <h2 className="text-[13px] font-bold text-brand-600 mb-2.5">최근 게시</h2>
                <div className="grid grid-cols-2 gap-3">
                  {published.map((a) => (
                    <AnnouncementGridCard key={a.id} announcement={a} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <BottomNav />

      <ActionSheet
        open={actionSheetTarget !== null}
        onClose={() => setActionSheetTarget(null)}
        subtitle={actionSheetTarget?.petInfo.name ?? actionSheetTarget?.title}
        items={[
          {
            label: "이름 변경 (준비 중)",
            icon: <EditIcon size={22} color="currentColor" />,
            onClick: () => setActionSheetTarget(null),
          },
          {
            label: "복제 (준비 중)",
            icon: <CopyIcon size={22} color="currentColor" />,
            onClick: () => setActionSheetTarget(null),
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
          if (deleteTarget) {
            setDrafts((prev) => prev.filter((a) => a.id !== deleteTarget.id));
            setPublished((prev) => prev.filter((a) => a.id !== deleteTarget.id));
            showToast(`${deleteTarget.petInfo.name ?? "공고"} 초안을 삭제했어요`);
          }
          setDeleteTarget(null);
        }}
        title="초안을 삭제할까요?"
        description={`${deleteTarget?.petInfo.name ?? "이"} 초안과 생성한 파일이 모두 사라져요. 되돌릴 수 없어요.`}
      />

      {exportTarget && (
        <ExportFilesSheet
          open
          onClose={() => setExportTarget(null)}
          subtitle={`${exportTarget.petInfo.name ?? exportTarget.title ?? "공고"} · 저장할 파일을 선택하세요`}
          files={[]}
          onCopy={() => setExportTarget(null)}
          onSave={() => { showToast("파일을 저장했어요"); setExportTarget(null); }}
        />
      )}

      <Toast open={toast !== ""} message={toast} onClose={() => setToast("")} />
    </div>
  );
}

function AnnouncementGridCard({ announcement }: { announcement: Announcement }) {
  const gradient = PET_PHOTO_GRADIENTS[hashIndex(announcement.id, PET_PHOTO_GRADIENTS.length)];

  return (
    <Link href={`/announcements/${announcement.id}`} className="flex flex-col gap-1.5">
      <div className={`aspect-square rounded-[16px] bg-gradient-to-br ${gradient}`} />
      <p className="text-[13px] font-bold text-brand-800">
        {announcement.petInfo.name ?? announcement.petInfo.breed}
      </p>
    </Link>
  );
}
