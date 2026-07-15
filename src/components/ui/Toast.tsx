"use client";

import { useEffect } from "react";
import { CheckCircleIcon } from "@/components/ui/Icons";

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
  /** ms 후 자동으로 닫혀요. 0이면 자동으로 닫히지 않아요. 기본 4000ms */
  autoHideMs?: number;
}

export default function Toast({ open, message, onClose, actionLabel, onAction, autoHideMs = 4000 }: ToastProps) {
  useEffect(() => {
    if (!open || autoHideMs <= 0) return;
    const timer = setTimeout(onClose, autoHideMs);
    return () => clearTimeout(timer);
  }, [open, autoHideMs, onClose]);

  if (!open) return null;

  return (
    <div className="fixed left-0 right-0 bottom-24 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-[391px] bg-brand-800 rounded-2xl shadow-2xl flex items-center gap-2.5 px-4 py-3.5 pointer-events-auto">
        <span className="text-green-400 shrink-0">
          <CheckCircleIcon size={21} color="currentColor" />
        </span>
        <p className="flex-1 min-w-0 text-[12.7px] font-semibold text-white">{message}</p>
        {actionLabel && (
          <button
            onClick={() => {
              onAction?.();
              onClose();
            }}
            className="text-[12.9px] font-extrabold text-accent-500 shrink-0"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
