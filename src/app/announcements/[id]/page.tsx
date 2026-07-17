"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, EditIcon, GlobeIcon, TargetIcon } from "@/components/ui/Icons";
import Badge from "@/components/ui/Badge";
import PlatformPicker from "@/components/announcement/PlatformPicker";
import ExportFormatPicker from "@/components/announcement/ExportFormatPicker";
import { ANNOUNCEMENT_STATUS_LABEL, ANNOUNCEMENT_STATUS_COLOR, PLATFORMS } from "@/lib/constants";
import type { PlatformId, AnnouncementDraft, CustomPlatformConfig, AnnouncementStatus } from "@/lib/types";
import { fetchAnnouncement, type AnnouncementDetail } from "@/lib/chatApi";

export default function AnnouncementDetailPage() {
  const params = useParams();
  const id = String(params.id ?? "");

  const [data, setData] = useState<AnnouncementDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [platformPickerOpen, setPlatformPickerOpen] = useState(false);
  const [exportPickerOpen, setExportPickerOpen] = useState(false);
  const [platformId, setPlatformId] = useState<PlatformId | undefined>();
  const [customConfig, setCustomConfig] = useState<CustomPlatformConfig | undefined>();

  useEffect(() => {
    if (!id) return;
    fetchAnnouncement(id)
      .then((res) => {
        setData(res);
        if (res.platformId) setPlatformId(res.platformId as PlatformId);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "공고를 불러오지 못했어요."))
      .finally(() => setLoading(false));
  }, [id]);

  function handlePlatformSelect(id: PlatformId, custom?: CustomPlatformConfig) {
    setPlatformId(id);
    setCustomConfig(custom);
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-surface-50 items-center justify-center">
        <p className="text-[13px] text-brand-300">불러오는 중…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col min-h-screen bg-surface-50">
        <header className="flex items-center px-[18px] pt-[52px] pb-3 bg-surface-50 border-b border-brand-75">
          <Link href="/announcements" className="text-brand-450">
            <ChevronLeftIcon size={24} color="currentColor" />
          </Link>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-8">
          <p className="text-[15px] font-bold text-brand-800">공고를 불러오지 못했어요</p>
          <p className="text-[13px] text-brand-400">{error}</p>
          <Link href="/announcements" className="text-[13px] font-semibold text-brand-500 underline">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const { status, sessionId, draft } = data;

  if (status === "draft") {
    return (
      <div className="flex flex-col min-h-screen bg-surface-50">
        <PageHeader
          title={data.petInfo.name ?? "작성 중"}
          status={status}
          onExport={() => setExportPickerOpen(true)}
          sessionId={sessionId}
        />
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-4 pb-20">
          <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center text-brand-300">
            <EditIcon size={26} color="currentColor" />
          </div>
          <p className="text-[16px] font-extrabold text-brand-800 text-center">아직 작성 중이에요</p>
          <p className="text-[13.5px] text-brand-400 text-center leading-relaxed">
            AI 도우미와 대화를 이어서 공고를 완성해 주세요
          </p>
          <Link
            href={`/chat${sessionId ? `?session=${sessionId}` : ""}`}
            className="mt-2 w-full max-w-xs py-3.5 rounded-[16px] bg-brand-500 hover:bg-brand-600 text-[15px] font-bold text-white text-center transition-colors"
          >
            이어서 작성하기
          </Link>
        </div>
      </div>
    );
  }

  const petName = draft?.petName ?? data.petInfo.name ?? "";
  const title = draft?.title ?? data.title ?? "";
  const description = draft?.description ?? data.description ?? "";
  const petInfo = draft?.petInfo ?? data.petInfo;

  const infoRows = [
    { label: "종류",      value: petInfo.breed ?? petInfo.species },
    { label: "성별",      value: petInfo.gender === "male" ? "수컷" : petInfo.gender === "female" ? "암컷" : "미상" },
    { label: "중성화",    value: petInfo.neutered === true ? "완료" : petInfo.neutered === false ? "안 함" : "미상" },
    { label: "추정 나이", value: petInfo.estimatedAge ? `${petInfo.estimatedAge.value}${petInfo.estimatedAge.unit}` : "미상" },
    { label: "체중",      value: petInfo.weightKg != null ? `${petInfo.weightKg} kg` : "미상" },
    petInfo.appearance       ? { label: "외형",     value: petInfo.appearance }                           : null,
    petInfo.healthConditions?.length
                             ? { label: "건강",     value: petInfo.healthConditions.join(", ") }          : null,
    petInfo.personalityNotes ? { label: "성격",     value: petInfo.personalityNotes }                     : null,
    petInfo.rescueRegion     ? { label: "구조 지역", value: petInfo.rescueRegion }                        : null,
    petInfo.rescueDate       ? { label: "구조 일자", value: petInfo.rescueDate }                          : null,
    petInfo.shelterContact   ? { label: "연락처",   value: petInfo.shelterContact }                       : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="flex flex-col min-h-screen bg-surface-50">
      <PageHeader
        title={petName}
        status={status}
        onExport={() => setExportPickerOpen(true)}
        sessionId={sessionId}
      />

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="w-full h-[200px] bg-gradient-to-br from-[#e7d6c0] to-[#cbae89] relative">
          <div className="absolute bottom-3 left-3">
            <span className="bg-brand-800/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-[9px]">
              대표 사진
            </span>
          </div>
        </div>

        <div className="px-[18px] pt-4 pb-10 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[19px] font-extrabold text-brand-800 leading-snug tracking-tight">{title}</h1>
            {description && (
              <p className="text-[13.5px] text-brand-450 leading-relaxed">{description}</p>
            )}
          </div>

          <div>
            <p className="text-[11px] font-bold text-brand-300 uppercase tracking-wide mb-2">기본 정보</p>
            <div className="bg-surface-50 border border-brand-75 rounded-[18px] overflow-hidden">
              {infoRows.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`flex items-start justify-between gap-4 px-4 py-3 ${
                    i < infoRows.length - 1 ? "border-b border-brand-25" : ""
                  }`}
                >
                  <span className="text-[13px] text-brand-300 shrink-0 w-20">{label}</span>
                  <span className="text-[13px] font-semibold text-brand-700 text-right flex-1">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-brand-300 uppercase tracking-wide mb-2">게시 플랫폼</p>
            <button
              onClick={() => setPlatformPickerOpen(true)}
              className="w-full flex items-center justify-between p-3.5 rounded-[18px] border border-brand-100 bg-surface-50 hover:bg-brand-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="text-brand-400">
                  {platformId ? <TargetIcon size={18} color="currentColor" /> : <GlobeIcon size={18} color="currentColor" />}
                </div>
                <div className="text-left">
                  <p className="text-[14px] font-semibold text-brand-600">
                    {platformId ? (PLATFORMS.find((p) => p.id === platformId)?.name ?? "직접 설정") : "플랫폼 선택"}
                  </p>
                  {platformId === "custom" && customConfig && (
                    <p className="text-[11px] text-brand-400 mt-0.5">
                      {customConfig.imageRatio} · {customConfig.toneDescription}
                    </p>
                  )}
                </div>
              </div>
              <span className="flex items-center gap-0.5 text-[12px] text-brand-300">
                변경
                <ChevronRightIcon size={14} color="currentColor" />
              </span>
            </button>
          </div>

          <button
            onClick={() => setExportPickerOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[16px] border border-brand-150 hover:bg-brand-50 transition-colors"
          >
            <DownloadIcon size={18} color="#8a5a2b" />
            <span className="text-[14px] font-bold text-brand-500">저장 형식으로 내보내기</span>
          </button>
        </div>
      </div>

      {draft && (
        <>
          <PlatformPicker
            open={platformPickerOpen}
            onClose={() => setPlatformPickerOpen(false)}
            selected={platformId}
            onSelect={handlePlatformSelect}
          />
          <ExportFormatPicker
            open={exportPickerOpen}
            onClose={() => setExportPickerOpen(false)}
            draft={draft}
            platformId={platformId}
          />
        </>
      )}
    </div>
  );
}

function PageHeader({
  title,
  status,
  onExport,
  sessionId,
}: {
  title: string;
  status: AnnouncementStatus;
  onExport: () => void;
  sessionId?: string;
}) {
  return (
    <header className="flex items-center gap-3 px-[18px] pt-[52px] pb-3 bg-surface-50 border-b border-brand-75 shrink-0">
      <Link href="/announcements" className="text-brand-500 hover:text-brand-600 transition-colors">
        <ChevronLeftIcon size={24} color="currentColor" />
      </Link>
      <div className="flex-1 min-w-0">
        <p className="text-[16px] font-extrabold text-brand-800 truncate">{title}</p>
        <Badge
          label={ANNOUNCEMENT_STATUS_LABEL[status]}
          className={ANNOUNCEMENT_STATUS_COLOR[status]}
        />
      </div>
      {status !== "draft" && (
        <button
          onClick={onExport}
          className="w-9 h-9 flex items-center justify-center rounded-[12px] bg-surface-100 hover:bg-brand-100 transition-colors text-brand-500"
          aria-label="내보내기"
        >
          <DownloadIcon size={20} color="currentColor" />
        </button>
      )}
      <Link
        href={status === "draft" && sessionId ? `/chat?session=${sessionId}` : "/chat"}
        className="w-9 h-9 flex items-center justify-center rounded-[12px] bg-surface-100 hover:bg-brand-100 transition-colors text-brand-500"
        aria-label="수정"
      >
        <EditIcon size={20} color="currentColor" />
      </Link>
    </header>
  );
}
