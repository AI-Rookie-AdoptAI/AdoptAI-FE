"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon, DownloadIcon, EditIcon } from "@/components/ui/Icons";
import Badge from "@/components/ui/Badge";
import PlatformPicker from "@/components/announcement/PlatformPicker";
import ExportFormatPicker from "@/components/announcement/ExportFormatPicker";
import { ANNOUNCEMENT_STATUS_LABEL, ANNOUNCEMENT_STATUS_COLOR } from "@/lib/constants";
import type { PlatformId, AnnouncementDraft } from "@/lib/types";

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
    estimatedAge: "약 3살",
    weight: "5kg",
    color: "갈색",
    healthConditions: ["슬개골 탈구 2기", "심장사상충 음성"],
    neutered: false,
    rescueLocation: "OO동",
    rescueDate: "5/18",
  },
};

export default function AnnouncementDetailPage() {
  const [platformPickerOpen, setPlatformPickerOpen] = useState(false);
  const [exportPickerOpen, setExportPickerOpen] = useState(false);
  const [platformId, setPlatformId] = useState<PlatformId | undefined>();

  const { petName, title, description, petInfo } = MOCK_DRAFT;

  const infoRows = [
    { label: "종류", value: petInfo.breed ?? petInfo.species },
    { label: "성별", value: petInfo.gender === "male" ? "수컷" : "암컷" },
    { label: "중성화", value: petInfo.neutered ? "완료" : "안 함" },
    { label: "추정 나이", value: petInfo.estimatedAge ?? "미상" },
    { label: "체중", value: petInfo.weight ?? "미상" },
    { label: "건강", value: petInfo.healthConditions?.join(", ") ?? "특이사항 없음" },
    { label: "구조 장소", value: petInfo.rescueLocation ?? "미상" },
    { label: "구조 일자", value: petInfo.rescueDate ?? "미상" },
  ];

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      {/* Header */}
      <header className="flex items-center gap-3 px-[18px] pt-[52px] pb-3 bg-surface-50 border-b border-brand-75 shrink-0">
        <Link href="/announcements" className="text-brand-450 hover:text-brand-600 transition-colors">
          <ChevronLeftIcon size={24} color="currentColor" />
        </Link>
        <div className="flex-1">
          <p className="text-[16px] font-extrabold text-brand-800">{petName}</p>
          <Badge label={ANNOUNCEMENT_STATUS_LABEL["published"]} className={ANNOUNCEMENT_STATUS_COLOR["published"]} />
        </div>
        <button
          onClick={() => setExportPickerOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-[12px] bg-surface-100 hover:bg-brand-100 transition-colors text-brand-500"
          aria-label="내보내기"
        >
          <DownloadIcon size={20} color="currentColor" />
        </button>
        <Link
          href="/chat"
          className="w-9 h-9 flex items-center justify-center rounded-[12px] bg-surface-100 hover:bg-brand-100 transition-colors text-brand-500"
          aria-label="수정"
        >
          <EditIcon size={20} color="currentColor" />
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Hero image */}
        <div className="w-full h-[220px] bg-gradient-to-br from-[#e7d6c0] to-[#cbae89] relative">
          <div className="absolute bottom-3 left-3">
            <span className="bg-brand-800/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-[9px]">
              대표 사진
            </span>
          </div>
        </div>

        <div className="px-[18px] pt-4 pb-10 flex flex-col gap-5">
          {/* Title + description */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[20px] font-extrabold text-brand-800 leading-snug tracking-tight">{title}</h1>
            <p className="text-[14px] text-brand-450 leading-relaxed">{description}</p>
          </div>

          {/* Info table */}
          <div className="bg-surface-50 border border-brand-75 rounded-[18px] overflow-hidden">
            {infoRows.map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex items-start justify-between gap-3 px-4 py-3 ${
                  i < infoRows.length - 1 ? "border-b border-brand-25" : ""
                }`}
              >
                <span className="text-[13px] text-brand-300 shrink-0">{label}</span>
                <span className="text-[13px] font-semibold text-brand-700 text-right">{value}</span>
              </div>
            ))}
          </div>

          {/* Platform */}
          <div>
            <p className="text-[12px] font-bold text-brand-300 uppercase tracking-wide mb-2">게시 플랫폼</p>
            <button
              onClick={() => setPlatformPickerOpen(true)}
              className="w-full flex items-center justify-between p-3.5 rounded-[18px] border border-brand-100 bg-surface-50 hover:bg-brand-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{platformId ? "🎯" : "🌐"}</span>
                <span className="text-[14px] font-semibold text-brand-600">
                  {platformId ?? "플랫폼 선택"}
                </span>
              </div>
              <span className="text-[12px] text-brand-300">변경 →</span>
            </button>
          </div>

          {/* Export CTA */}
          <button
            onClick={() => setExportPickerOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[16px] border border-brand-150 hover:bg-brand-50 transition-colors"
          >
            <DownloadIcon size={18} color="#8a5a2b" />
            <span className="text-[14px] font-bold text-brand-500">저장 형식으로 내보내기</span>
          </button>
        </div>
      </div>

      <PlatformPicker
        open={platformPickerOpen}
        onClose={() => setPlatformPickerOpen(false)}
        selected={platformId}
        onSelect={setPlatformId}
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
