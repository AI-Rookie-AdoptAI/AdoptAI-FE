import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import Link from "next/link";
import { SparkleIcon } from "@/components/ui/Icons";
import type { Announcement } from "@/lib/types";

const mockAll: Announcement[] = [
  {
    id: "1",
    status: "draft",
    title: "보리",
    petInfo: { name: "보리", species: "dog", breed: "믹스견", gender: "male", estimatedAge: "약 3살", weight: "5kg" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    status: "in_review",
    title: "초코",
    petInfo: { name: "초코", species: "dog", breed: "푸들", gender: "female", estimatedAge: "약 2살" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    status: "published",
    title: "단비",
    petInfo: { name: "단비", species: "dog", breed: "말티즈", gender: "female", estimatedAge: "약 1살" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    status: "published",
    title: "호두",
    petInfo: { name: "호두", species: "dog", breed: "시츄", gender: "male", estimatedAge: "약 4살" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    status: "closed",
    title: "콩이",
    petInfo: { name: "콩이", species: "cat", breed: "코숏", gender: "female", estimatedAge: "약 1살" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function AnnouncementsPage() {
  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <AppHeader userName="민정" />

      <main className="flex-1 overflow-y-auto scrollbar-hide pb-[88px]">
        <div className="px-[22px] pt-1 pb-4">
          <h1 className="text-[20px] font-extrabold text-brand-800 tracking-tight">내 공고</h1>
          <p className="text-[13px] text-brand-400 mt-0.5">총 {mockAll.length}건</p>
        </div>

        {/* New announcement CTA */}
        <div className="mx-[22px] mb-5">
          <Link
            href="/chat"
            className="flex items-center gap-2.5 bg-surface-100 border border-brand-100 rounded-[18px] px-4 py-3 hover:bg-brand-50 transition-colors"
          >
            <SparkleIcon size={18} color="#8a5a2b" />
            <span className="text-[14px] font-bold text-brand-500">새 공고 작성하기</span>
          </Link>
        </div>

        <div className="px-[22px] flex flex-col gap-2.5">
          {mockAll.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
