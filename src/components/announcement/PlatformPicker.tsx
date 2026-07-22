"use client";

import { useState } from "react";
import type { Platform, PlatformId, ToneStyle, CustomPlatformConfig } from "@/lib/types";
import { PLATFORMS } from "@/lib/constants";
import Modal from "@/components/ui/Modal";
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "@/components/ui/Icons";

interface PlatformPickerProps {
  open: boolean;
  onClose: () => void;
  selected?: PlatformId;
  onSelect: (id: PlatformId, custom?: CustomPlatformConfig) => void;
}

const TONE_OPTIONS: { value: ToneStyle; label: string; desc: string }[] = [
  { value: "friendly",    label: "친근한",       desc: "편안하고 가까운 느낌" },
  { value: "warm",        label: "따뜻한",       desc: "감성적이고 정감 있는 느낌" },
  { value: "formal",      label: "공식적인",     desc: "정확하고 신뢰감 있는 느낌" },
  { value: "informative", label: "정보 중심",    desc: "항목별로 명확하게 전달" },
];

const RATIO_OPTIONS = [
  { label: "1:1 정사각형",  ratio: "1:1",  w: 1080, h: 1080 },
  { label: "4:3 가로형",    ratio: "4:3",  w: 1200, h: 900  },
  { label: "16:9 와이드",   ratio: "16:9", w: 1920, h: 1080 },
  { label: "9:16 세로형",   ratio: "9:16", w: 1080, h: 1920 },
];

type Step = "list" | "custom";

export default function PlatformPicker({ open, onClose, selected, onSelect }: PlatformPickerProps) {
  const [step, setStep] = useState<Step>("list");
  const [customRatio, setCustomRatio] = useState("1:1");
  const [customTone, setCustomTone] = useState<ToneStyle>("friendly");
  const [customToneDesc, setCustomToneDesc] = useState("");

  function handleClose() {
    setStep("list");
    onClose();
  }

  function handleSelectPlatform(p: Platform) {
    if (p.id === "custom") {
      setStep("custom");
    } else {
      onSelect(p.id);
      handleClose();
    }
  }

  function handleConfirmCustom() {
    const ratioData = RATIO_OPTIONS.find((r) => r.ratio === customRatio) ?? RATIO_OPTIONS[0];
    onSelect("custom", {
      imageRatio: customRatio,
      imageWidth: ratioData.w,
      imageHeight: ratioData.h,
      tone: customTone,
      toneDescription: customToneDesc.trim() || TONE_OPTIONS.find((t) => t.value === customTone)!.desc,
    });
    handleClose();
  }

  const title = step === "custom" ? "직접 설정" : "어디에 게시하나요?";

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      {step === "list" ? (
        <div className="px-5 pb-5 flex flex-col gap-2.5">
          <p className="text-[13px] text-brand-400 mb-1">
            플랫폼마다 이미지 크기와 말투가 달라져요
          </p>
          {PLATFORMS.map((p) => (
            <PlatformCard
              key={p.id}
              platform={p}
              selected={selected === p.id}
              onSelect={() => handleSelectPlatform(p)}
            />
          ))}
        </div>
      ) : (
        <div className="px-5 pb-6 flex flex-col gap-5">
          {/* 뒤로가기 */}
          <button
            onClick={() => setStep("list")}
            className="flex items-center gap-1 text-[13px] font-semibold text-brand-450 hover:text-brand-600 transition-colors self-start -mt-1"
          >
            <ChevronLeftIcon size={16} color="currentColor" />
            플랫폼 목록으로
          </button>

          {/* 이미지 규격 */}
          <div className="flex flex-col gap-2.5">
            <p className="text-[13px] font-bold text-brand-700">이미지 비율</p>
            <div className="grid grid-cols-2 gap-2">
              {RATIO_OPTIONS.map((r) => (
                <button
                  key={r.ratio}
                  onClick={() => setCustomRatio(r.ratio)}
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-[14px] border transition-colors ${
                    customRatio === r.ratio
                      ? "border-brand-500 bg-brand-50"
                      : "border-brand-100 bg-surface-50 hover:bg-brand-50"
                  }`}
                >
                  {/* 비율 시각화 */}
                  <RatioPreview ratio={r.ratio} active={customRatio === r.ratio} />
                  <span className={`text-[12px] font-semibold ${customRatio === r.ratio ? "text-brand-500" : "text-brand-600"}`}>
                    {r.label}
                  </span>
                  <span className="text-[10px] text-brand-300">
                    {r.w}×{r.h}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 말투 선택 */}
          <div className="flex flex-col gap-2.5">
            <p className="text-[13px] font-bold text-brand-700">말투 스타일</p>
            <div className="flex flex-col gap-1.5">
              {TONE_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setCustomTone(t.value)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-[14px] border transition-colors ${
                    customTone === t.value
                      ? "border-brand-500 bg-brand-50"
                      : "border-brand-100 bg-surface-50 hover:bg-brand-50"
                  }`}
                >
                  <div className="text-left">
                    <p className={`text-[13.5px] font-bold ${customTone === t.value ? "text-brand-500" : "text-brand-700"}`}>
                      {t.label}
                    </p>
                    <p className="text-[11.5px] text-brand-400 mt-0.5">{t.desc}</p>
                  </div>
                  {customTone === t.value && (
                    <div className="w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                      <CheckIcon size={9} color="white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 말투 직접 설명 */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[13px] font-bold text-brand-700">
              말투 추가 설명 <span className="font-normal text-brand-400">(선택)</span>
            </p>
            <textarea
              value={customToneDesc}
              onChange={(e) => setCustomToneDesc(e.target.value)}
              placeholder={`예: "반말로 작성해줘", "~해요 체로 써줘"`}
              rows={2}
              maxLength={100}
              className="px-4 py-3 rounded-[14px] border border-brand-100 focus:border-brand-500 text-[13.5px] text-brand-800 placeholder:text-brand-300 bg-surface-50 outline-none resize-none transition-colors"
            />
            <p className="text-[11px] text-brand-300 text-right">{customToneDesc.length}/100</p>
          </div>

          <button
            onClick={handleConfirmCustom}
            className="w-full py-3.5 rounded-[16px] bg-brand-500 hover:bg-brand-600 text-[15px] font-bold text-white transition-colors"
          >
            적용하기
          </button>
        </div>
      )}
    </Modal>
  );
}

function PlatformCard({
  platform,
  selected,
  onSelect,
}: {
  platform: Platform;
  selected: boolean;
  onSelect: () => void;
}) {
  const disabled = platform.disabled;
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full text-left flex items-start gap-3.5 p-3.5 rounded-[18px] border transition-colors ${
        disabled
          ? "border-brand-100 bg-surface-100 opacity-60 cursor-not-allowed"
          : selected
            ? "border-brand-500 bg-brand-50"
            : "border-brand-100 bg-surface-50 hover:bg-brand-50"
      }`}
    >
      <div className={`shrink-0 mt-0.5 ${disabled ? "text-brand-300" : selected ? "text-brand-500" : "text-brand-400"}`}>
        <platform.icon size={22} color="currentColor" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className={`text-[14px] font-bold ${disabled ? "text-brand-300" : "text-brand-800"}`}>
            {platform.name}
            {disabled && <span className="ml-1.5 text-[11px] font-semibold text-brand-300">(준비 중)</span>}
          </p>
          {selected ? (
            <div className="w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
              <CheckIcon size={9} color="white" />
            </div>
          ) : platform.id === "custom" ? (
            <ChevronRightIcon size={16} color="#756858" />
          ) : null}
        </div>
        <p className="text-[12px] text-brand-400 mt-0.5">{platform.description}</p>
        <div className="flex gap-1.5 mt-2">
          <span className="bg-surface-100 text-brand-450 text-[11px] font-semibold px-2 py-1 rounded-[8px]">
            {platform.imageSize.label}
          </span>
          <span className="bg-surface-100 text-brand-450 text-[11px] font-semibold px-2 py-1 rounded-[8px]">
            {platform.toneLabel}
          </span>
        </div>
      </div>
    </button>
  );
}

function RatioPreview({ ratio, active }: { ratio: string; active: boolean }) {
  const dims: Record<string, { w: number; h: number }> = {
    "1:1":  { w: 32, h: 32 },
    "4:3":  { w: 36, h: 27 },
    "16:9": { w: 40, h: 22 },
    "9:16": { w: 22, h: 36 },
  };
  const d = dims[ratio] ?? { w: 32, h: 32 };
  return (
    <div
      className={`rounded-[4px] border-2 ${active ? "border-brand-500 bg-brand-100" : "border-brand-200 bg-surface-100"}`}
      style={{ width: d.w, height: d.h }}
    />
  );
}
