"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProgressOverlay from "@/components/ui/ProgressOverlay";
import Tag from "@/components/ui/Tag";
import { ChevronLeftIcon, CheckCircleIcon, CircleIcon } from "@/components/ui/Icons";
import { PLATFORMS } from "@/lib/constants";
import type { PlatformId } from "@/lib/types";

const SELECTABLE = PLATFORMS.filter((p) => p.id !== "custom");
const DEFAULT_SELECTED = SELECTABLE.filter((p) => !p.disabled).map((p) => p.id);

function PlatformSelectContent() {
  const params = useSearchParams();
  const router = useRouter();
  const petName = params.get("petName") ?? "보리";

  const [selected, setSelected] = useState<PlatformId[]>(DEFAULT_SELECTED);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!generating) return;
    const timer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 8));
    }, 120);
    return () => clearInterval(timer);
  }, [generating]);

  useEffect(() => {
    if (progress < 100) return;
    const t = setTimeout(() => {
      router.push(
        `/chat/preview?petName=${encodeURIComponent(petName)}&platforms=${selected.join(",")}`
      );
    }, 300);
    return () => clearTimeout(t);
  }, [progress, router, petName, selected]);

  function toggle(id: PlatformId) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  }

  const completed = Math.round((progress / 100) * selected.length);

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <header className="flex items-center gap-2.5 px-[18px] pt-[52px] pb-3 bg-surface-50 border-b border-brand-75 shrink-0">
        <Link
          href="/chat"
          className="w-6 h-6 flex items-center justify-center text-brand-500 hover:text-brand-600 transition-colors"
          aria-label="뒤로 가기"
        >
          <ChevronLeftIcon size={24} color="currentColor" />
        </Link>
        <p className="text-[15px] font-extrabold text-brand-800">플랫폼 선택</p>
      </header>

      <main className="flex-1 overflow-y-auto scrollbar-hide px-[18px] pt-[17px] pb-6 flex flex-col gap-1.5">
        <h1 className="text-[19px] font-extrabold text-brand-800 tracking-tight leading-snug">
          어디에 올릴 공고예요?
        </h1>
        <p className="text-[12px] text-brand-400 mb-3.5">
          선택하면 사진 비율과 어투를 자동으로 맞춰 파일을 만들어요
        </p>

        <div className="flex flex-col gap-2.5">
          {SELECTABLE.map((platform) => {
            const isSelected = selected.includes(platform.id);
            const disabled = platform.disabled;
            return (
              <button
                key={platform.id}
                onClick={() => !disabled && toggle(platform.id)}
                disabled={disabled}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border bg-white transition-colors text-left ${
                  disabled
                    ? "border-brand-75 opacity-60 cursor-not-allowed"
                    : isSelected
                      ? "border-accent-500"
                      : "border-brand-75 hover:bg-brand-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    disabled ? "bg-surface-100 text-brand-300" : "bg-accent-100 text-accent-600"
                  }`}
                >
                  <platform.icon size={20} color="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[13.5px] font-extrabold ${
                      disabled ? "text-brand-300" : "text-brand-800"
                    }`}
                  >
                    {platform.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Tag label={platform.imageSize.ratio} tone={disabled ? "neutral" : "accent"} />
                    <span className="text-[11px] text-brand-400">{platform.toneLabel}</span>
                  </div>
                </div>
                {disabled ? (
                  <span className="text-brand-200 shrink-0">
                    <CircleIcon size={24} color="currentColor" />
                  </span>
                ) : isSelected ? (
                  <span className="text-accent-500 shrink-0">
                    <CheckCircleIcon size={24} color="currentColor" />
                  </span>
                ) : (
                  <span className="text-brand-200 shrink-0">
                    <CircleIcon size={24} color="currentColor" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </main>

      <div className="bg-white border-t border-brand-75 px-[18px] pt-3.5 pb-7 shrink-0">
        <button
          onClick={() => setGenerating(true)}
          disabled={selected.length === 0 || generating}
          className="w-full py-[15px] rounded-2xl bg-accent-500 text-[14.9px] font-extrabold text-brand-800 hover:bg-accent-600 transition-colors disabled:opacity-40"
        >
          {selected.length}곳에 맞게 만들기
        </button>
      </div>

      <ProgressOverlay
        open={generating}
        title="공고를 만들고 있어요"
        description="플랫폼에 맞게 사진 비율과 어투를 바꾸고 있어요…"
        progress={progress}
        subtext={`${selected.length}개 플랫폼 중 ${completed}개 완료`}
      />
    </div>
  );
}

export default function PlatformSelectPage() {
  return (
    <Suspense>
      <PlatformSelectContent />
    </Suspense>
  );
}
