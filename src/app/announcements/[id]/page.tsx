"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, EditIcon, GlobeIcon, TargetIcon } from "@/components/ui/Icons";
import Badge from "@/components/ui/Badge";
import PlatformPicker from "@/components/announcement/PlatformPicker";
import ExportFormatPicker from "@/components/announcement/ExportFormatPicker";
import { ANNOUNCEMENT_STATUS_LABEL, ANNOUNCEMENT_STATUS_COLOR, PLATFORMS } from "@/lib/constants";
import type { PlatformId, AnnouncementDraft, CustomPlatformConfig, AnnouncementStatus, Announcement } from "@/lib/types";

// ─── Mock 데이터 (실제 구현 시 API 호출로 교체) ────────────────────────────────

const MOCK_ANNOUNCEMENTS: Record<string, Announcement & { draft?: AnnouncementDraft }> = {
  "1": {
    id: "1", status: "draft", sessionId: "sess_mock_1",
    title: "보리", description: "사람을 무척 좋아하고 잘 따르는 3살 남아예요.",
    petInfo: { name: "보리", species: "dog", breed: "믹스견", gender: "male", estimatedAge: { value: 3, unit: "년" }, weightKg: 5, appearance: "갈색 단모", healthConditions: ["슬개골 탈구 2기", "심장사상충 음성"], personalityNotes: "사람을 잘 따름", neutered: false, rescueRegion: "OO동", rescueDate: "2026-05-18", shelterContact: "010-0000-0000" },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    draft: { petName: "보리", title: "사람을 잘 따르는 갈색 믹스견, 보리", description: "사람을 무척 좋아하고 잘 따르는 3살 남아예요. OO동에서 구조되었고, 건강하게 새 가족을 기다리고 있어요.", petInfo: { name: "보리", species: "dog", breed: "믹스견", gender: "male", estimatedAge: { value: 3, unit: "년" }, weightKg: 5, appearance: "갈색 단모", healthConditions: ["슬개골 탈구 2기", "심장사상충 음성"], personalityNotes: "사람을 잘 따름", neutered: false, rescueRegion: "OO동", rescueDate: "2026-05-18", shelterContact: "010-0000-0000" } },
  },
  "2": {
    id: "2", status: "in_review",
    title: "나비", description: "소심하지만 익숙해지면 곁에 붙어있는 코숏 암컷이에요.",
    petInfo: { name: "나비", species: "cat", breed: "코리안 숏헤어", gender: "female", estimatedAge: { value: 2, unit: "년" }, weightKg: 3.2, healthConditions: ["FIV 음성", "FELV 음성"], neutered: true, rescueRegion: "마포구", rescueDate: "2026-06-01", shelterContact: "010-0000-0000" },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    draft: { petName: "나비", title: "소심하지만 사랑스러운 코숏 나비", description: "소심하지만 익숙해지면 곁에 붙어있는 코숏 암컷이에요.", petInfo: { name: "나비", species: "cat", breed: "코리안 숏헤어", gender: "female", estimatedAge: { value: 2, unit: "년" }, weightKg: 3.2, healthConditions: ["FIV 음성", "FELV 음성"], neutered: true, rescueRegion: "마포구", rescueDate: "2026-06-01", shelterContact: "010-0000-0000" } },
  },
  "3": {
    id: "3", status: "published",
    title: "단비",
    petInfo: { name: "단비", species: "dog", breed: "말티즈", gender: "female", estimatedAge: { value: 1, unit: "년" }, weightKg: 2.5, neutered: true, rescueRegion: "은평구", rescueDate: "2026-04-10" },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    draft: { petName: "단비", title: "활발하고 명랑한 말티즈 단비", description: "어디서나 씩씩하고 밝은 성격의 1살 말티즈예요.", petInfo: { name: "단비", species: "dog", breed: "말티즈", gender: "female", estimatedAge: { value: 1, unit: "년" }, weightKg: 2.5, neutered: true, rescueRegion: "은평구", rescueDate: "2026-04-10" } },
  },
  "4": {
    id: "4", status: "published",
    title: "콩이",
    petInfo: { name: "콩이", species: "cat", breed: "스코티시폴드", gender: "unknown", estimatedAge: { value: 3, unit: "개월" }, healthConditions: ["기생충 음성"], neutered: false, rescueRegion: "강남구" },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    draft: { petName: "콩이", title: "동글동글 귀여운 스코티시폴드 콩이", description: "귀 접힌 아가 고양이예요.", petInfo: { name: "콩이", species: "cat", breed: "스코티시폴드", gender: "unknown", estimatedAge: { value: 3, unit: "개월" }, healthConditions: ["기생충 음성"], neutered: false, rescueRegion: "강남구" } },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnnouncementDetailPage() {
  const params = useParams();
  const id = String(params.id ?? "1");

  const data = MOCK_ANNOUNCEMENTS[id] ?? MOCK_ANNOUNCEMENTS["3"];
  const { status, sessionId, draft } = data;

  const [platformPickerOpen, setPlatformPickerOpen] = useState(false);
  const [exportPickerOpen, setExportPickerOpen] = useState(false);
  const [platformId, setPlatformId] = useState<PlatformId | undefined>();
  const [customConfig, setCustomConfig] = useState<CustomPlatformConfig | undefined>();

  function handlePlatformSelect(id: PlatformId, custom?: CustomPlatformConfig) {
    setPlatformId(id);
    setCustomConfig(custom);
  }

  // draft 상태는 채팅으로 연결 (이 페이지에 직접 접근 시 안내)
  if (status === "draft") {
    return (
      <div className="flex flex-col min-h-screen bg-surface-50">
        <PageHeader title={data.petInfo.name ?? "작성 중"} status={status} onExport={() => setExportPickerOpen(true)} sessionId={sessionId} />
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

  // in_review / published / closed → 표 형식
  const { petName, title, description, petInfo } = draft ?? {
    petName: data.petInfo.name ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    petInfo: data.petInfo,
  };

  const infoRows = [
    { label: "종류",     value: petInfo.breed ?? petInfo.species },
    { label: "성별",     value: petInfo.gender === "male" ? "수컷" : petInfo.gender === "female" ? "암컷" : "미상" },
    { label: "중성화",   value: petInfo.neutered === true ? "완료" : petInfo.neutered === false ? "안 함" : "미상" },
    { label: "추정 나이", value: petInfo.estimatedAge ? `${petInfo.estimatedAge.value}${petInfo.estimatedAge.unit}` : "미상" },
    { label: "체중",     value: petInfo.weightKg != null ? `${petInfo.weightKg} kg` : "미상" },
    petInfo.appearance       ? { label: "외형",    value: petInfo.appearance }                            : null,
    petInfo.healthConditions?.length
                             ? { label: "건강",    value: petInfo.healthConditions.join(", ") }           : null,
    petInfo.personalityNotes ? { label: "성격",    value: petInfo.personalityNotes }                      : null,
    petInfo.rescueRegion     ? { label: "구조 지역", value: petInfo.rescueRegion }                        : null,
    petInfo.rescueDate       ? { label: "구조 일자", value: petInfo.rescueDate }                          : null,
    petInfo.shelterContact   ? { label: "연락처",  value: petInfo.shelterContact }                        : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="flex flex-col min-h-screen bg-surface-50">
      <PageHeader title={petName} status={status} onExport={() => setExportPickerOpen(true)} sessionId={sessionId} />

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Hero image */}
        <div className="w-full h-[200px] bg-gradient-to-br from-[#e7d6c0] to-[#cbae89] relative">
          <div className="absolute bottom-3 left-3">
            <span className="bg-brand-800/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-[9px]">
              대표 사진
            </span>
          </div>
        </div>

        <div className="px-[18px] pt-4 pb-10 flex flex-col gap-5">
          {/* 제목 + 설명 */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[19px] font-extrabold text-brand-800 leading-snug tracking-tight">{title}</h1>
            {description && (
              <p className="text-[13.5px] text-brand-450 leading-relaxed">{description}</p>
            )}
          </div>

          {/* 정보 표 */}
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

          {/* 플랫폼 */}
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

          {/* 내보내기 */}
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

// ─── 공용 헤더 ─────────────────────────────────────────────────────────────────

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
