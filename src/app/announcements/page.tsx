"use client";

import { useEffect, useMemo, useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import SearchBar from "@/components/ui/SearchBar";
import Tabs from "@/components/ui/Tabs";
import Link from "next/link";
import { SparkleIcon, SearchIcon } from "@/components/ui/Icons";
import { useAuth } from "@/lib/AuthContext";
import { fetchAnnouncements, type AnnouncementListItem } from "@/lib/chatApi";
import type { Announcement, AnnouncementStatus } from "@/lib/types";

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

type FilterValue = "all" | AnnouncementStatus;

const TABS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "draft", label: "작성 중" },
  { value: "published", label: "게시중" },
  { value: "closed", label: "마감" },
];

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<Announcement[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");

  useEffect(() => {
    fetchAnnouncements()
      .then((res) => {
        setItems(res.items.map(toAnnouncement));
        setTotal(res.total);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "공고 목록을 불러오지 못했어요."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return items
      .filter((a) => filter === "all" || a.status === filter || (filter === "published" && a.status === "in_review"))
      .filter((a) => {
        const name = a.title ?? a.petInfo.name ?? a.petInfo.breed ?? "";
        return name.toLowerCase().includes(query.trim().toLowerCase());
      });
  }, [items, query, filter]);

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <AppHeader userName={user?.name ?? ""} />

      <main className="flex-1 overflow-y-auto scrollbar-hide pb-[88px]">
        <div className="px-[22px] pt-1 pb-4">
          <h1 className="text-[20px] font-extrabold text-brand-800 tracking-tight">내 공고</h1>
          <p className="text-[13px] text-brand-400 mt-0.5">총 {total}건</p>
        </div>

        <div className="mx-[22px] mb-4">
          <Link
            href="/chat"
            className="flex items-center gap-2.5 bg-surface-100 border border-brand-100 rounded-2xl px-4 py-3 hover:bg-brand-50 transition-colors"
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

        <div className="px-[22px] mb-1">
          <SearchBar value={query} onChange={setQuery} placeholder="반려동물 이름으로 검색" />
        </div>

        <div className="px-[14px] mb-2">
          <Tabs tabs={TABS} value={filter} onChange={setFilter} />
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <p className="text-[13px] text-brand-300">불러오는 중…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-[22px] py-16 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center text-brand-300">
              <SearchIcon size={24} color="currentColor" />
            </div>
            <p className="text-[14px] font-bold text-brand-700">
              {items.length === 0 ? "아직 공고가 없어요" : "조건에 맞는 공고가 없어요"}
            </p>
            <p className="text-[12.5px] text-brand-400">
              {items.length === 0 ? "위 버튼을 눌러 첫 공고를 만들어 보세요" : "검색어나 필터를 바꿔서 다시 찾아보세요"}
            </p>
          </div>
        ) : (
          <div className="px-[22px] flex flex-col gap-2.5">
            {filtered.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
