"use client";

import { useMemo, useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import SearchBar from "@/components/ui/SearchBar";
import Tabs from "@/components/ui/Tabs";
import Link from "next/link";
import { SparkleIcon, SearchIcon } from "@/components/ui/Icons";
import type { Announcement, AnnouncementStatus } from "@/lib/types";

const mockAll: Announcement[] = [
  {
    id: "1",
    status: "draft",
    title: "보리",
    petInfo: { name: "보리", species: "dog", breed: "믹스견", gender: "male", estimatedAge: { value: 3, unit: "년" }, weight: "5kg" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    status: "in_review",
    title: "초코",
    petInfo: { name: "초코", species: "dog", breed: "푸들", gender: "female", estimatedAge: { value: 2, unit: "년" } },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
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
    title: "호두",
    petInfo: { name: "호두", species: "dog", breed: "시츄", gender: "male", estimatedAge: { value: 4, unit: "년" } },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    status: "closed",
    title: "콩이",
    petInfo: { name: "콩이", species: "cat", breed: "코숏", gender: "female", estimatedAge: { value: 1, unit: "년" } },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

type FilterValue = "all" | AnnouncementStatus;

const TABS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "draft", label: "작성 중" },
  { value: "published", label: "게시중" },
  { value: "closed", label: "마감" },
];

export default function AnnouncementsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered = useMemo(() => {
    return mockAll
      .filter((a) => filter === "all" || a.status === filter || (filter === "published" && a.status === "in_review"))
      .filter((a) => {
        const name = a.title ?? a.petInfo.name ?? a.petInfo.breed ?? "";
        return name.toLowerCase().includes(query.trim().toLowerCase());
      });
  }, [query, filter]);

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <AppHeader userName="민정" />

      <main className="flex-1 overflow-y-auto scrollbar-hide pb-[88px]">
        <div className="px-[22px] pt-1 pb-4">
          <h1 className="text-[20px] font-extrabold text-brand-800 tracking-tight">내 공고</h1>
          <p className="text-[13px] text-brand-400 mt-0.5">총 {mockAll.length}건</p>
        </div>

        {/* New announcement CTA */}
        <div className="mx-[22px] mb-4">
          <Link
            href="/chat"
            className="flex items-center gap-2.5 bg-surface-100 border border-brand-100 rounded-2xl px-4 py-3 hover:bg-brand-50 transition-colors"
          >
            <SparkleIcon size={18} color="#8a5a2b" />
            <span className="text-[14px] font-bold text-brand-500">새 공고 작성하기</span>
          </Link>
        </div>

        <div className="px-[22px] mb-1">
          <SearchBar value={query} onChange={setQuery} placeholder="반려동물 이름으로 검색" />
        </div>

        <div className="px-[14px] mb-2">
          <Tabs tabs={TABS} value={filter} onChange={setFilter} />
        </div>

        {filtered.length === 0 ? (
          <div className="px-[22px] py-16 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center text-brand-300">
              <SearchIcon size={24} color="currentColor" />
            </div>
            <p className="text-[14px] font-bold text-brand-700">조건에 맞는 공고가 없어요</p>
            <p className="text-[12.5px] text-brand-400">검색어나 필터를 바꿔서 다시 찾아보세요</p>
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
