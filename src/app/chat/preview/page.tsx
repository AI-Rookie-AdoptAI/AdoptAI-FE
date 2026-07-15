"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Banner from "@/components/ui/Banner";
import Tag from "@/components/ui/Tag";
import { ChevronLeftIcon, SparkleIcon } from "@/components/ui/Icons";
import { PLATFORMS } from "@/lib/constants";
import { MOCK_DRAFT, getPlatformCaption } from "@/lib/mockDraft";
import type { PlatformId } from "@/lib/types";

function parsePlatforms(raw: string | null): PlatformId[] {
  if (!raw) return ["instagram", "danggeun", "naver_cafe"];
  return raw.split(",").filter(Boolean) as PlatformId[];
}

function PreviewContent() {
  const params = useSearchParams();
  const router = useRouter();
  const petName = params.get("petName") ?? MOCK_DRAFT.petName;
  const platformIds = parsePlatforms(params.get("platforms"));
  const platforms = PLATFORMS.filter((p) => platformIds.includes(p.id));

  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleConfirmSave() {
    setConfirmOpen(false);
    router.push(
      `/chat/complete?petName=${encodeURIComponent(petName)}&platforms=${platformIds.join(",")}`
    );
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <header className="flex items-center gap-2.5 px-[18px] pt-[52px] pb-3 bg-surface-50 border-b border-brand-75 shrink-0">
        <Link
          href="/chat/platform"
          className="w-6 h-6 flex items-center justify-center text-brand-500 hover:text-brand-600 transition-colors"
          aria-label="뒤로 가기"
        >
          <ChevronLeftIcon size={24} color="currentColor" />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-extrabold text-brand-800 leading-tight">플랫폼별 결과</p>
          <p className="text-[10.5px] text-brand-300 mt-0.5">
            {petName} · {platforms.length}개 버전
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto scrollbar-hide px-[18px] pt-3.5 pb-6 flex flex-col gap-3">
        <Banner
          description="플랫폼에 맞춰 사진 비율과 어투를 바꿨어요"
          icon={<SparkleIcon size={16} color="currentColor" />}
        />

        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="bg-white border border-brand-75 rounded-2xl p-[13px] flex flex-col gap-2.5"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-[22px] h-[22px] rounded-[7px] bg-accent-100 text-accent-600 flex items-center justify-center shrink-0">
                <platform.icon size={14} color="currentColor" />
              </div>
              <p className="text-[12.3px] font-extrabold text-brand-800 flex-1 min-w-0 truncate">
                {platform.name}
              </p>
              <Tag label={platform.imageSize.ratio} className="shrink-0" />
              <Tag label={platform.toneLabel.split(" · ")[0]} tone="neutral" className="shrink-0" />
            </div>
            <div className="flex gap-2.5 items-start">
              <div className="w-[82px] h-[82px] rounded-xl bg-gradient-to-br from-[#eadccb] to-[#cbab82] shrink-0" />
              <p className="text-[11.8px] text-[#3a2e22] leading-[1.55] whitespace-pre-line">
                {getPlatformCaption(MOCK_DRAFT, platform.id)}
              </p>
            </div>
          </div>
        ))}
      </main>

      <div className="bg-white border-t border-brand-75 px-[18px] pt-3.5 pb-7 shrink-0">
        <button
          onClick={() => setConfirmOpen(true)}
          className="w-full py-[15px] rounded-2xl bg-accent-500 text-[14.9px] font-extrabold text-brand-800 hover:bg-accent-600 transition-colors"
        >
          파일로 저장하기
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmSave}
        title="파일로 저장할까요?"
        description="AdoptAI는 공고 파일만 만들어요. 실제 등록은 각 플랫폼에서 진행해 주세요."
        confirmLabel="저장"
      />
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense>
      <PreviewContent />
    </Suspense>
  );
}
