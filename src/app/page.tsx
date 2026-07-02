import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import Link from "next/link";
import { SparkleIcon } from "@/components/ui/Icons";
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

export default function HomePage() {
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

        {/* Draft section */}
        <section className="px-[22px] mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[13px] font-bold text-brand-600">작성 중</h2>
            <span className="text-[12px] text-brand-300">{mockDraft.length}건</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {mockDraft.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} />
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
