"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import Link from "next/link";
import { SparkleIcon } from "@/components/ui/Icons";
import { useAuth } from "@/lib/AuthContext";
import { fetchAnnouncements, type AnnouncementListItem } from "@/lib/chatApi";
import type { Announcement } from "@/lib/types";

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

export default function HomePage() {
  const { user } = useAuth();
  const [drafts, setDrafts] = useState<Announcement[]>([]);
  const [published, setPublished] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

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
        <div className="mx-[22px] mb-5">
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
            <div className="w-[46px] h-[46px] bg-white/18 rounded-[14px] flex items-center justify-center shrink-0">
              <SparkleIcon size={22} color="white" />
            </div>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <p className="text-[13px] text-brand-300">불러오는 중…</p>
          </div>
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
                    <AnnouncementCard key={a.id} announcement={a} />
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
    </div>
  );
}

function AnnouncementGridCard({ announcement }: { announcement: Announcement }) {
  const gradients = [
    "from-[#eadccb] to-[#d6c1a6]",
    "from-[#e8e0d0] to-[#cfbe9e]",
    "from-[#e7d6c0] to-[#cbae89]",
    "from-[#e6dcc8] to-[#d2b891]",
  ];
  const idx = parseInt(announcement.id) % gradients.length;

  return (
    <Link href={`/announcements/${announcement.id}`} className="flex flex-col gap-1.5">
      <div className={`aspect-square rounded-[16px] bg-gradient-to-br ${gradients[idx]}`} />
      <p className="text-[13px] font-bold text-brand-800">
        {announcement.petInfo.name ?? announcement.petInfo.breed}
      </p>
    </Link>
  );
}
