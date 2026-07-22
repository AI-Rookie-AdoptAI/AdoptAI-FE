"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/ui/Toast";
import { CheckCircleIcon, DownloadIcon, FileTextIcon, FileIcon } from "@/components/ui/Icons";
import { PLATFORMS } from "@/lib/constants";
import { getStoredDraft } from "@/lib/mockDraft";
import { buildExportContent, downloadFile } from "@/lib/export";
import type { ExportFormat, PlatformId } from "@/lib/types";

const SHORT_LABEL: Partial<Record<PlatformId, string>> = {
  instagram: "인스타그램",
  danggeun: "당근",
  naver_cafe: "네이버카페",
};

const FORMAT_BY_PLATFORM: Partial<Record<PlatformId, ExportFormat>> = {
  instagram: "markdown",
  danggeun: "text",
  naver_cafe: "markdown",
  stray_animal: "text",
};

function parsePlatforms(raw: string | null): PlatformId[] {
  if (!raw) return ["instagram", "danggeun", "naver_cafe"];
  return raw.split(",").filter(Boolean) as PlatformId[];
}

function kb(content: string): string {
  return `${(new Blob([content]).size / 1024).toFixed(1)} KB`;
}

function CompleteContent() {
  const params = useSearchParams();
  const storedDraft = getStoredDraft();
  const petName = params.get("petName") ?? storedDraft.petName;
  const platformIds = parsePlatforms(params.get("platforms"));
  const platforms = PLATFORMS.filter((p) => platformIds.includes(p.id));

  const files = platforms.map((platform) => {
    const format = FORMAT_BY_PLATFORM[platform.id] ?? "markdown";
    const content = buildExportContent(storedDraft, format, platform.id);
    const ext = format === "markdown" ? "md" : format === "json" ? "json" : "txt";
    return {
      platform,
      format,
      ext,
      content,
      filename: `${petName}_${SHORT_LABEL[platform.id] ?? platform.name}.${ext}`,
      size: kb(content),
    };
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function saveOne(file: (typeof files)[number]) {
    downloadFile(file.content, file.format, `${petName}_${SHORT_LABEL[file.platform.id] ?? file.platform.name}`);
    setToastMessage(`${file.filename} 파일을 저장했어요`);
    setToastOpen(true);
  }

  function saveAll() {
    files.forEach((f) =>
      downloadFile(f.content, f.format, `${petName}_${SHORT_LABEL[f.platform.id] ?? f.platform.name}`)
    );
    setToastMessage(`파일 ${files.length}개를 저장했어요`);
    setToastOpen(true);
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <main className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-9 pb-6 flex flex-col gap-5">
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-[40px] bg-confirmed-100 flex items-center justify-center">
            <CheckCircleIcon size={40} color="#155e75" />
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center w-[180px]">
            <h1 className="text-[20.8px] font-extrabold text-brand-800 tracking-tight">
              {files.length}개 파일이 준비됐어요
            </h1>
            <p className="text-[12.2px] text-brand-400">
              {petName} · 플랫폼별 공고 · 1분 42초
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {files.map((file) => (
            <div
              key={file.platform.id}
              className="w-full flex items-center gap-3 p-[13px] rounded-2xl border border-brand-75 bg-white"
            >
              <div className="w-[42px] h-[42px] rounded-[11px] bg-accent-100 text-accent-600 flex items-center justify-center shrink-0">
                {file.ext === "md" ? (
                  <FileTextIcon size={20} color="currentColor" />
                ) : (
                  <FileIcon size={20} color="currentColor" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12.7px] font-bold text-brand-800 truncate">{file.filename}</p>
                <p className="text-[10.3px] text-brand-300 mt-0.5">
                  {file.platform.imageSize.ratio} · {file.size}
                </p>
              </div>
              <button
                onClick={() => saveOne(file)}
                className="text-accent-600 hover:text-accent-500 transition-colors shrink-0"
                aria-label={`${file.filename} 저장`}
              >
                <DownloadIcon size={22} color="currentColor" />
              </button>
            </div>
          ))}
        </div>
      </main>

      <div className="bg-white border-t border-brand-75 px-[18px] pt-3.5 pb-7 shrink-0 flex flex-col gap-2.5">
        <button
          onClick={saveAll}
          className="w-full flex items-center justify-center gap-1.5 py-[14px] rounded-2xl bg-accent-500 text-[14.9px] font-extrabold text-brand-800 hover:bg-accent-600 transition-colors"
        >
          <DownloadIcon size={20} color="currentColor" />
          전체 저장
        </button>
        <Link
          href="/"
          className="w-full flex items-center justify-center py-[14px] rounded-2xl border border-brand-150 text-[13.8px] font-bold text-brand-600 hover:bg-brand-50 transition-colors"
        >
          홈으로
        </Link>
      </div>

      <Toast
        open={toastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
        actionLabel="실행취소"
        onAction={() => setToastOpen(false)}
      />
    </div>
  );
}

export default function CompletePage() {
  return (
    <Suspense>
      <CompleteContent />
    </Suspense>
  );
}
