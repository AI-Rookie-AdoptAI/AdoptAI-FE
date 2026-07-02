"use client";

import { useEffect } from "react";
import { XIcon } from "@/components/ui/Icons";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-brand-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[430px] bg-surface-50 rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 max-h-[85dvh] flex flex-col">
        {title && (
          <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
            <h2 className="text-[17px] font-extrabold text-brand-800">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-100 transition-colors text-brand-300"
              aria-label="닫기"
            >
              <XIcon size={18} color="currentColor" />
            </button>
          </div>
        )}
        <div className="overflow-y-auto flex-1 scrollbar-hide">{children}</div>
        <div className="h-safe shrink-0" />
      </div>
    </div>
  );
}
