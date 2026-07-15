"use client";

import { useEffect } from "react";

/** 오버레이(모달/시트/다이얼로그)가 열려 있을 때 Esc 키로 닫을 수 있게 해요 */
export function useEscapeKey(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);
}
