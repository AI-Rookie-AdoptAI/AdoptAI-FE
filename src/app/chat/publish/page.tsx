"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import PlatformPicker from "@/components/announcement/PlatformPicker";
import ExportFormatPicker from "@/components/announcement/ExportFormatPicker";
import { CheckCircleIcon, DownloadIcon, GlobeIcon } from "@/components/ui/Icons";
import type { PlatformId, AnnouncementDraft, CustomPlatformConfig } from "@/lib/types";
import { PLATFORMS } from "@/lib/constants";

const MOCK_DRAFT: AnnouncementDraft = {
  petName: "보리",
  title: "사람을 잘 따르는 갈색 믹스견, 보리",
  description:
    "사람을 무척 좋아하고 잘 따르는 3살 남아예요. OO동에서 구조되었고, 건강하게 새 가족을 기다리고 있어요.",
  petInfo: {
    name: "보리",
    species: "dog",
    breed: "믹스견",
    gender: "male",
    estimatedAge: { value: 3, unit: "년" },
    weightKg: 5,
    appearance: "갈색 단모, 중형견",
    healthConditions: ["슬개골 탈구 2기", "심장사상충 음성"],
    neutered: false,
    rescueRegion: "OO동",
    rescueDate: "2026-05-18",
    shelterContact: "010-0000-0000",
  },
};

function PublishContent() {
  const params = useSearchParams();
  const router = useRouter();
  const petName = params.get("petName") ?? "보리";

  const [platformPickerOpen, setPlatformPickerOpen] = useState(false);
  const [exportPickerOpen, setExportPickerOpen] = useState(false);
  const [platformId, setPlatformId] = useState<PlatformId | undefined>();
  const [customConfig, setCustomConfig] = useState<CustomPlatformConfig | undefined>();

  const platform = PLATFORMS.find((p) => p.id === platformId);

  function handlePlatformSelect(id: PlatformId, custom?: CustomPlatformConfig) {
    setPlatformId(id);
    setCustomConfig(custom);
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">

        {/* Success icon */}
        <div className="mb-5 flex flex-col items-center" style={{ marginBottom: 22 }}>
          <div className="w-[84px] h-[84px] bg-green-100 rounded-[42px] flex items-center justify-center">
            <CheckCircleIcon size={48} color="#6f8a5f" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[22px] font-extrabold text-brand-800 text-center tracking-tight">
          공고가 게시됐어요
        </h1>
        <p className="text-[13.5px] text-brand-400 text-center mt-1.5">
          OO 보호소 · 방금 전 · 작성 시간 1분 42초
        </p>

        {/* Pet card */}
        <div className="w-full mt-7 bg-surface-50 border border-brand-75 rounded-[20px] p-[15px] flex items-center gap-3.5">
          <div className="w-[58px] h-[58px] rounded-[14px] bg-gradient-to-br from-[#e7d6c0] to-[#cbae89] shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-extrabold text-brand-800 truncate">
              {MOCK_DRAFT.petInfo.breed ?? MOCK_DRAFT.petInfo.species}, {petName}
            </p>
            <p className="text-[12px] text-brand-400 mt-0.5">
              {MOCK_DRAFT.petInfo.gender === "male" ? "수컷" : MOCK_DRAFT.petInfo.gender === "female" ? "암컷" : "미상"}
              {MOCK_DRAFT.petInfo.estimatedAge ? ` · ${MOCK_DRAFT.petInfo.estimatedAge.value}${MOCK_DRAFT.petInfo.estimatedAge.unit}` : ""}
              {MOCK_DRAFT.petInfo.weightKg != null ? ` · ${MOCK_DRAFT.petInfo.weightKg}kg` : ""}
            </p>
          </div>
          <div className="bg-green-100 rounded-[10px] px-2.5 py-1.5 shrink-0">
            <span className="text-[11px] font-bold text-green-700">게시중</span>
          </div>
        </div>

        {/* Platform selection */}
        <div className="w-full mt-5">
          <button
            onClick={() => setPlatformPickerOpen(true)}
            className="w-full flex items-center justify-between p-3.5 rounded-[18px] border border-brand-100 bg-surface-50 hover:bg-brand-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="text-brand-400">
                {platform
                  ? <platform.icon size={20} color="currentColor" />
                  : <GlobeIcon size={20} color="currentColor" />}
              </div>
              <div className="text-left">
                <p className="text-[13px] font-bold text-brand-700">
                  {platform ? platform.name : "플랫폼 선택"}
                </p>
                {platform && platformId !== "custom" && (
                  <p className="text-[11px] text-brand-400">{platform.toneLabel} · {platform.imageSize.label}</p>
                )}
                {platformId === "custom" && customConfig && (
                  <p className="text-[11px] text-brand-400">
                    {customConfig.imageRatio} · {customConfig.toneDescription}
                  </p>
                )}
              </div>
            </div>
            <span className="text-[12px] text-brand-400 font-medium">변경 →</span>
          </button>
        </div>

        {/* Actions */}
        <div className="w-full mt-5 flex flex-col gap-2.5">
          <button
            onClick={() => setExportPickerOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[16px] bg-brand-500 hover:bg-brand-600 transition-colors"
          >
            <DownloadIcon size={18} color="white" />
            <span className="text-[15px] font-bold text-white">저장 형식으로 내보내기</span>
          </button>

          <Link
            href={`/announcements/1`}
            className="w-full flex items-center justify-center py-3.5 rounded-[16px] bg-brand-500 hover:bg-brand-600 transition-colors"
          >
            <span className="text-[15px] font-bold text-white">공고 보기</span>
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center py-3.5 rounded-[16px] border border-brand-150 hover:bg-brand-50 transition-colors"
          >
            <span className="text-[14px] font-bold text-brand-600">홈으로</span>
          </Link>
        </div>
      </div>

      <PlatformPicker
        open={platformPickerOpen}
        onClose={() => setPlatformPickerOpen(false)}
        selected={platformId}
        onSelect={handlePlatformSelect}
      />

      <ExportFormatPicker
        open={exportPickerOpen}
        onClose={() => setExportPickerOpen(false)}
        draft={MOCK_DRAFT}
        platformId={platformId}
      />
    </div>
  );
}

export default function PublishPage() {
  return (
    <Suspense>
      <PublishContent />
    </Suspense>
  );
}
