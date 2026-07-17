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

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<Announcement[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncements()
      .then((res) => {
        setItems(res.items.map(toAnnouncement));
        setTotal(res.total);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "공고 목록을 불러오지 못했어요."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <AppHeader userName={user?.name ?? ""} />

      <main className="flex-1 overflow-y-auto scrollbar-hide pb-[88px]">
        <div className="px-[22px] pt-1 pb-4">
          <h1 className="text-[20px] font-extrabold text-brand-800 tracking-tight">내 공고</h1>
          <p className="text-[13px] text-brand-400 mt-0.5">총 {total}건</p>
        </div>

        <div className="mx-[22px] mb-5">
          <Link
            href="/chat"
            className="flex items-center gap-2.5 bg-surface-100 border border-brand-100 rounded-[18px] px-4 py-3 hover:bg-brand-50 transition-colors"
          >
            <SparkleIcon size={18} color="#8a5a2b" />
            <span className="text-[14px] font-bold text-brand-500">새 공고 작성하기</span>
          </Link>
        </div>

        {error && (
          <div className="mx-[22px] mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-[14px]">
            <p className="text-[13px] text-red-600">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <p className="text-[13px] text-brand-300">불러오는 중…</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <p className="text-[15px] font-bold text-brand-800">아직 공고가 없어요</p>
            <p className="text-[13px] text-brand-400">위 버튼을 눌러 첫 공고를 만들어 보세요</p>
          </div>
        ) : (
          <div className="px-[22px] flex flex-col gap-2.5">
            {items.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
