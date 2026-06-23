import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import type { Announcement } from "@/lib/types";

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    status: "draft",
    petInfo: { species: "dog", breed: "믹스견", gender: "male", estimatedAge: "약 3살", weight: "5kg" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    status: "in_review",
    petInfo: { species: "dog", breed: "푸들", gender: "female", estimatedAge: "약 2살" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen pb-[88px]">
      <AppHeader />

      <main className="flex-1 px-5 pt-6 flex flex-col gap-6">
        {/* Hero CTA */}
        <section className="bg-surface-50 rounded-3xl p-5 flex flex-col gap-3 border border-brand-100">
          <p className="text-[17px] font-bold text-brand-800 leading-snug">
            구조한 아이를 새 가족과<br />이어줄 시간이에요
          </p>
          <p className="text-[13px] text-brand-400">
            사진과 음성이면 1분이면 충분해요
          </p>
          <Link href="/chat">
            <Button size="md" className="w-full mt-1">
              새 공고 작성하기
            </Button>
          </Link>
        </section>

        {/* Announcement list */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[13px] font-bold text-brand-300 tracking-wide uppercase">
            작성한 공고
          </h2>
          {mockAnnouncements.length === 0 ? (
            <p className="text-[14px] text-brand-300 text-center py-10">
              아직 작성한 공고가 없어요
            </p>
          ) : (
            mockAnnouncements.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} />
            ))
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
