"use client";

import { useState, type ReactNode } from "react";
import { FileTextIcon, CopyIcon, CheckCircleIcon, CircleIcon } from "@/components/ui/Icons";
import { useEscapeKey, useFocusTrap } from "@/lib/hooks";

export interface ExportFile {
  id: string;
  name: string;
  /** 예: "1:1 · 0.4 KB" */
  meta: string;
  icon?: ReactNode;
}

interface ExportFilesSheetProps {
  open: boolean;
  onClose: () => void;
  /** 예: "보리 · 저장할 파일을 선택하세요" */
  subtitle: string;
  files: ExportFile[];
  initialSelectedIds?: string[];
  onCopy: (selectedIds: string[]) => void;
  onSave: (selectedIds: string[]) => void;
  title?: string;
}

export default function ExportFilesSheet({
  open,
  onClose,
  subtitle,
  files,
  initialSelectedIds,
  onCopy,
  onSave,
  title = "내보내기",
}: ExportFilesSheetProps) {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(initialSelectedIds ?? files.map((f) => f.id))
  );

  useEscapeKey(open, onClose);
  const trapRef = useFocusTrap(open);

  if (!open) return null;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedIds = Array.from(selected);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-sheet-title"
      aria-describedby="export-sheet-desc"
    >
      <div className="absolute inset-0 bg-brand-900/45 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={trapRef}
        className="relative w-full max-w-[430px] bg-surface-50 rounded-t-[26px] shadow-2xl z-10 flex flex-col items-center pt-3.5 pb-7 px-[18px]"
      >
        <div className="w-10 h-[5px] rounded-full bg-brand-150 shrink-0" aria-hidden="true" />

        <div className="w-full pt-3">
          <h2 id="export-sheet-title" className="text-[16.9px] font-extrabold text-brand-800 tracking-tight">{title}</h2>
          <p id="export-sheet-desc" className="text-[11.7px] text-brand-400 mt-1">{subtitle}</p>
        </div>

        <div className="w-full flex flex-col gap-2.5 pt-3">
          {files.map((file) => {
            const isSelected = selected.has(file.id);
            return (
              <button
                key={file.id}
                onClick={() => toggle(file.id)}
                aria-pressed={isSelected}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border bg-surface-50 transition-colors ${
                  isSelected ? "border-accent-500" : "border-brand-75"
                }`}
              >
                <div className="w-[38px] h-[38px] rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center shrink-0">
                  {file.icon ?? <FileTextIcon size={20} color="currentColor" />}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[12.7px] font-bold text-brand-800 truncate">{file.name}</p>
                  <p className="text-[10.3px] text-brand-300 mt-0.5">{file.meta}</p>
                </div>
                {isSelected ? (
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

        <div className="w-full flex gap-2.5 pt-3.5">
          <button
            onClick={() => onCopy(selectedIds)}
            disabled={selectedIds.length === 0}
            className="w-[50px] h-[50px] rounded-2xl border border-brand-150 flex items-center justify-center text-accent-600 shrink-0 disabled:opacity-40 hover:bg-brand-50 transition-colors"
            aria-label="복사"
          >
            <CopyIcon size={22} color="currentColor" />
          </button>
          <button
            onClick={() => onSave(selectedIds)}
            disabled={selectedIds.length === 0}
            className="flex-1 h-[50px] rounded-2xl bg-accent-500 text-brand-800 text-[14.4px] font-extrabold disabled:opacity-40 hover:bg-accent-600 transition-colors"
          >
            {selectedIds.length}개 파일 저장
          </button>
        </div>
      </div>
    </div>
  );
}
