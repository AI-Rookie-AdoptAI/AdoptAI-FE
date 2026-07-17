"use client";

import type { ReactNode } from "react";
import { useEscapeKey } from "@/lib/hooks";

export interface ActionSheetItem {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  /** 삭제 등 되돌릴 수 없는 작업 — 빨간색으로 표시돼요 */
  destructive?: boolean;
}

interface ActionSheetProps {
  open: boolean;
  onClose: () => void;
  /** 메뉴가 어떤 항목에 대한 것인지 (예: 반려동물 이름) */
  subtitle?: string;
  items: ActionSheetItem[];
  cancelLabel?: string;
}

export default function ActionSheet({ open, onClose, subtitle, items, cancelLabel = "취소" }: ActionSheetProps) {
  useEscapeKey(open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-brand-900/45 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[430px] px-4 pb-4 z-10 flex flex-col gap-2">
        <div className="bg-surface-50 rounded-[26px] shadow-2xl flex flex-col items-center pt-3.5 px-2 pb-3 gap-2">
          <div className="w-10 h-[5px] rounded-full bg-brand-150 shrink-0" />
          {subtitle && <p className="text-[12.5px] font-bold text-brand-300">{subtitle}</p>}

          <div className="w-full bg-white border border-brand-75 rounded-2xl overflow-hidden">
            {items.map((item, i) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-brand-50 ${
                  i < items.length - 1 ? "border-b border-brand-25" : ""
                }`}
              >
                <span className={item.destructive ? "text-destructive-500" : "text-accent-600"}>{item.icon}</span>
                <span
                  className={`text-[14.5px] font-semibold ${
                    item.destructive ? "text-destructive-500" : "text-brand-800"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-white border border-brand-75 rounded-2xl py-4 text-[14.5px] font-extrabold text-brand-600 shadow-2xl hover:bg-brand-50 transition-colors"
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  );
}
