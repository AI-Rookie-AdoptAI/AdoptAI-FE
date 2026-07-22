"use client";

import type { ReactNode } from "react";
import { useEscapeKey, useFocusTrap } from "@/lib/hooks";

export interface ActionSheetItem {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  open: boolean;
  onClose: () => void;
  subtitle?: string;
  items: ActionSheetItem[];
  cancelLabel?: string;
}

export default function ActionSheet({ open, onClose, subtitle, items, cancelLabel = "취소" }: ActionSheetProps) {
  useEscapeKey(open, onClose);
  const trapRef = useFocusTrap(open);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={subtitle ? `${subtitle} 작업 메뉴` : "작업 메뉴"}
    >
      <div className="absolute inset-0 bg-brand-900/45 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div ref={trapRef} className="relative w-full max-w-[430px] px-4 pb-4 z-10 flex flex-col gap-2">
        <div className="bg-surface-50 rounded-[26px] shadow-2xl flex flex-col items-center pt-3.5 px-2 pb-3 gap-2">
          <div className="w-10 h-[5px] rounded-full bg-brand-150 shrink-0" aria-hidden="true" />
          {subtitle && <p className="text-[12.5px] font-bold text-brand-300">{subtitle}</p>}

          <div className="w-full bg-surface-50 border border-brand-75 rounded-2xl overflow-hidden">
            {items.map((item, i) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-brand-50 ${
                  i < items.length - 1 ? "border-b border-brand-25" : ""
                }`}
              >
                <span className={item.destructive ? "text-destructive-500" : "text-accent-600"} aria-hidden="true">
                  {item.icon}
                </span>
                <span className={`text-[14.5px] font-semibold ${item.destructive ? "text-destructive-500" : "text-brand-800"}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-surface-50 border border-brand-75 rounded-2xl py-4 text-[14.5px] font-extrabold text-brand-600 shadow-2xl hover:bg-brand-50 transition-colors"
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  );
}
