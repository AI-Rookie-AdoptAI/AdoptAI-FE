"use client";

import type { ReactNode } from "react";
import { useEscapeKey } from "@/lib/hooks";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  /** 삭제 등 되돌릴 수 없는 작업일 때 true — 확인 버튼이 destructive 색으로 표시돼요 */
  destructive?: boolean;
  /** 제목 위에 보여줄 아이콘 (예: 삭제 확인 다이얼로그의 휴지통 아이콘) */
  icon?: ReactNode;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  cancelLabel = "취소",
  confirmLabel = "확인",
  destructive = false,
  icon,
}: ConfirmDialogProps) {
  useEscapeKey(open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-brand-900/45 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[323px] bg-surface-50 rounded-3xl shadow-2xl z-10 flex flex-col items-center p-[22px] gap-2">
        {icon && (
          <div
            className={`w-14 h-14 rounded-[28px] flex items-center justify-center shrink-0 mb-1 ${
              destructive ? "bg-destructive-100 text-destructive-500" : "bg-accent-100 text-accent-600"
            }`}
          >
            {icon}
          </div>
        )}
        <h2 className="text-[16px] font-extrabold text-brand-800 text-center">{title}</h2>
        <p className="text-[13px] text-brand-400 text-center leading-[1.7]">{description}</p>
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
