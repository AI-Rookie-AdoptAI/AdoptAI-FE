"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PlatformPicker from "@/components/announcement/PlatformPicker";
import ExportFormatPicker from "@/components/announcement/ExportFormatPicker";
import { CheckCircleIcon, DownloadIcon, GlobeIcon } from "@/components/ui/Icons";
import type { PlatformId, AnnouncementDraft, CustomPlatformConfig } from "@/lib/types";
import { PLATFORMS } from "@/lib/constants";
import { fetchAnnouncement } from "@/lib/chatApi";

function PublishContent() {
  const params = useSearchParams();
  const petName = params.get("petName") ?? "";
  const announcementId = params.get("announcementId") ?? "";
  const timeTaken = params.get("timeTaken") ?? "";

  const [draft, setDraft] = useState<AnnouncementDraft | null>(null);
  const [loading, setLoading] = useState(!!announcementId);

  const [platformPickerOpen, setPlatformPickerOpen] = useState(false);
  const [exportPickerOpen, setExportPickerOpen] = useState(false);
  const [platformId, setPlatformId] = useState<PlatformId | undefined>();
  const [customConfig, setCustomConfig] = useState<CustomPlatformConfig | undefined>();

  useEffect(() => {
    if (!announcementId) { setLoading(false); return; }
    fetchAnnouncement(announcementId)
      .then((res) => {
        if (res.draft) setDraft(res.draft);
        if (res.platformId) setPlatformId(res.platformId as PlatformId);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [announcementId]);

  const platform = PLATFORMS.find((p) => p.id === platformId);

  function handlePlatformSelect(id: PlatformId, custom?: CustomPlatformConfig) {
    setPlatformId(id);
    setCustomConfig(custom);
  }

  const petDisplay = draft
    ? `${draft.petInfo.breed ?? draft.petInfo.species}, ${draft.petName}`
    : petName;

  const genderLabel =
    draft?.petInfo.gender === "male" ? "수컷"
    : draft?.petInfo.gender === "female" ? "암컷"
    : "";

  const ageLabel = draft?.petInfo.estimatedAge
    ? `${draft.petInfo.estimatedAge.value}${draft.petInfo.estimatedAge.unit}`
    : "";

  const weightLabel = draft?.petInfo.weightKg != null
    ? `${draft.petInfo.weightKg}kg`
    : "";

  const subLabel = [genderLabel, ageLabel, weightLabel].filter(Boolean).join(" · ");

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">

        <div className="mb-5 flex flex-col items-center" style={{ marginBottom: 22 }}>
          <div className="w-[84px] h-[84px] bg-green-100 rounded-[42px] flex items-center justify-center">
            <CheckCircleIcon size={48} color="#6f8a5f" />
          </div>
        </div>

        <h1 className="text-[22px] font-extrabold text-brand-800 text-center tracking-tight">
          공고가 게시됐어요
        </h1>
        {timeTaken && (
          <p className="text-[13.5px] text-brand-400 text-center mt-1.5">
            작성 시간 {timeTaken}
          </p>
        )}

        {!loading && (
          <div className="w-full mt-7 bg-surface-50 border border-brand-75 rounded-[20px] p-[15px] flex items-center gap-3.5">
            <div className="w-[58px] h-[58px] rounded-[14px] bg-gradient-to-br from-[#e7d6c0] to-[#cbae89] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-extrabold text-brand-800 truncate">{petDisplay}</p>
              {subLabel && <p className="text-[12px] text-brand-400 mt-0.5">{subLabel}</p>}
            </div>
            <div className="bg-green-100 rounded-[10px] px-2.5 py-1.5 shrink-0">
              <span className="text-[11px] font-bold text-green-700">게시중</span>
            </div>
          </div>
        )}

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

        <div className="w-full mt-5 flex flex-col gap-2.5">
          {draft && (
            <button
              onClick={() => setExportPickerOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[16px] bg-brand-500 hover:bg-brand-600 transition-colors"
            >
              <DownloadIcon size={18} color="white" />
              <span className="text-[15px] font-bold text-white">저장 형식으로 내보내기</span>
            </button>
          )}

          {announcementId && (
            <Link
              href={`/announcements/${announcementId}`}
              className="w-full flex items-center justify-center py-3.5 rounded-[16px] bg-brand-500 hover:bg-brand-600 transition-colors"
            >
              <span className="text-[15px] font-bold text-white">공고 보기</span>
            </Link>
          )}

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

      {draft && (
        <ExportFormatPicker
          open={exportPickerOpen}
          onClose={() => setExportPickerOpen(false)}
          draft={draft}
          platformId={platformId}
        />
      )}
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
