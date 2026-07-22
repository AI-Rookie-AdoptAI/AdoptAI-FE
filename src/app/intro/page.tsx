"use client";

import Link from "next/link";
import { AppIcon, SparkleIcon, CameraIcon, MicIcon, VerifiedIcon, ChevronRightIcon } from "@/components/ui/Icons";

const features = [
  {
    Icon: CameraIcon,
    title: "사진 한 장으로 시작",
    desc: "구조한 아이 사진을 올리면 AI가 외모·특징을 자동으로 분석해요.",
  },
  {
    Icon: MicIcon,
    title: "음성 메모면 충분해요",
    desc: "기억나는 대로 말하면 AI가 공고에 필요한 정보를 알아서 정리해 줘요.",
  },
  {
    Icon: VerifiedIcon,
    title: "사실만 담는 공고",
    desc: "추측하지 않아요. 확인된 정보만 공고에 넣어 신뢰를 지켜요.",
  },
  {
    Icon: SparkleIcon,
    title: "플랫폼별 자동 최적화",
    desc: "인스타그램, 당근, 네이버 카페 — 각 채널에 맞는 글과 이미지를 한 번에.",
  },
];

export default function IntroPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-50">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-16 pb-10 text-center gap-5">
        <div className="w-[72px] h-[72px] rounded-[20px] overflow-hidden shadow-[0_8px_24px_-6px_rgba(138,90,43,0.35)]">
          <AppIcon size={72} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[13px] font-bold text-brand-400 tracking-widest uppercase">AdoptAI</p>
          <h1 className="text-[28px] font-extrabold text-brand-800 tracking-tight leading-tight">
            입양 공고,<br />1분이면 충분해요
          </h1>
          <p className="text-[14px] text-brand-450 leading-relaxed mt-1">
            사진과 음성 메모만 있으면<br />
            AI가 완성된 공고를 만들어 드려요
          </p>
        </div>

        <div className="w-full flex flex-col gap-3 mt-2">
          <Link
            href="/login"
            className="w-full h-[52px] flex items-center justify-center rounded-xl bg-brand-500 text-white text-[14px] font-extrabold hover:bg-brand-600 transition-colors shadow-[0_8px_20px_-6px_rgba(138,90,43,0.45)]"
          >
            시작하기
          </Link>
          <Link
            href="/login?tab=login"
            className="w-full h-[52px] flex items-center justify-center rounded-xl border border-brand-150 bg-surface-50 text-brand-700 text-[14px] font-bold hover:bg-brand-50 transition-colors"
          >
            이미 계정이 있어요
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-6 h-px bg-brand-75" />

      {/* Feature list */}
      <section className="px-6 py-8 flex flex-col gap-5">
        <p className="text-[12px] font-bold text-brand-300 tracking-widest uppercase">주요 기능</p>
        {features.map(({ Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-75 flex items-center justify-center shrink-0">
              <Icon size={18} color="#8a5a2b" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-brand-800">{title}</p>
              <p className="text-[12.5px] text-brand-400 mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Divider */}
      <div className="mx-6 h-px bg-brand-75" />

      {/* Social proof / tagline */}
      <section className="px-6 py-8 flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-accent-500" />
          ))}
        </div>
        <p className="text-[13.5px] text-brand-600 font-semibold leading-snug">
          보호소 담당자가 가장 힘들어하는 건<br />
          공고 작성 시간이에요. AdoptAI가 줄여드려요.
        </p>
      </section>

      {/* Footer CTA */}
      <div className="mt-auto px-6 pb-10 pt-4">
        <Link
          href="/login"
          className="flex items-center justify-between bg-brand-800 rounded-2xl px-5 py-4 hover:bg-brand-900 transition-colors"
        >
          <div>
            <p className="text-[14px] font-extrabold text-white">무료로 시작하기</p>
            <p className="text-[12px] text-white/60 mt-0.5">계정을 만들고 바로 써보세요</p>
          </div>
          <ChevronRightIcon size={20} color="rgba(255,255,255,0.7)" />
        </Link>
      </div>
    </div>
  );
}
