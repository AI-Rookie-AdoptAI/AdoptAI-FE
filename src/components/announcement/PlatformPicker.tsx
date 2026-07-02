"use client";

import type { Platform, PlatformId } from "@/lib/types";
import { PLATFORMS } from "@/lib/constants";
import Modal from "@/components/ui/Modal";

interface PlatformPickerProps {
  open: boolean;
  onClose: () => void;
  selected?: PlatformId;
  onSelect: (id: PlatformId) => void;
}

export default function PlatformPicker({ open, onClose, selected, onSelect }: PlatformPickerProps) {
  return (
    <Modal open={open} onClose={onClose} title="어디에 게시하나요?">
      <div className="px-5 pb-5 flex flex-col gap-2.5">
        <p className="text-[13px] text-brand-400 mb-1">
          플랫폼마다 이미지 크기와 말투가 달라져요
        </p>
        {PLATFORMS.map((p) => (
          <PlatformCard
            key={p.id}
            platform={p}
            selected={selected === p.id}
            onSelect={() => {
              onSelect(p.id);
              onClose();
            }}
          />
        ))}
      </div>
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
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left flex items-start gap-3.5 p-3.5 rounded-[18px] border transition-colors ${
        selected
          ? "border-brand-500 bg-brand-50"
          : "border-brand-100 bg-surface-50 hover:bg-brand-50"
      }`}
    >
      <span className="text-2xl shrink-0 mt-0.5">{platform.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[14px] font-bold text-brand-800">{platform.name}</p>
          {selected && (
            <div className="w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
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
