"use client";

import type { ReactNode } from "react";
import { useEscapeKey, useFocusTrap } from "@/lib/hooks";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  destructive?: boolean;
  icon?: ReactNode;
}

export default function ConfirmDialog({
  open, onClose, onConfirm, title, description,
  cancelLabel = "취소", confirmLabel = "확인",
  destructive = false, icon,
}: ConfirmDialogProps) {
  useEscapeKey(open, onClose);
  const trapRef = useFocusTrap(open);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
    >
      <div className="absolute inset-0 bg-brand-900/45 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={trapRef}
        className="relative w-full max-w-[323px] bg-surface-50 rounded-3xl shadow-2xl z-10 flex flex-col items-center p-[22px] gap-2"
      >
        {icon && (
          <div className={`w-14 h-14 rounded-[28px] flex items-center justify-center shrink-0 mb-1 ${destructive ? "bg-destructive-100 text-destructive-500" : "bg-accent-100 text-accent-600"}`}>
            {icon}
          </div>
        )}
        <h2 id="confirm-title" className="text-[16px] font-extrabold text-brand-800 text-center">{title}</h2>
        <p id="confirm-desc" className="text-[13px] text-brand-400 text-center leading-[1.7]">{description}</p>
        <div className="flex gap-2.5 w-full pt-3">
          <button
            onClick={onClose}
            className="flex-1 h-[45px] rounded-xl border border-brand-150 text-[14px] font-bold text-brand-600 hover:bg-brand-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 h-[45px] rounded-xl text-[14px] font-extrabold transition-colors ${
              destructive
                ? "bg-destructive-500 text-white hover:bg-destructive-500/90"
                : "bg-accent-500 text-brand-800 hover:bg-accent-600"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
