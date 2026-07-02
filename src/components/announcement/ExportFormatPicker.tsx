"use client";

import type { ExportFormat, AnnouncementDraft, PlatformId } from "@/lib/types";
import { EXPORT_FORMATS } from "@/lib/constants";
import { buildExportContent, downloadFile, copyToClipboard } from "@/lib/export";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

interface ExportFormatPickerProps {
  open: boolean;
  onClose: () => void;
  draft: AnnouncementDraft;
  platformId?: PlatformId;
}

export default function ExportFormatPicker({ open, onClose, draft, platformId }: ExportFormatPickerProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState<ExportFormat | null>(null);

  async function handleSelect(format: ExportFormat) {
    setLoading(format);
    const content = buildExportContent(draft, format, platformId);

    if (format === "clipboard") {
      const ok = await copyToClipboard(content);
      setCopied(ok);
      setTimeout(() => setCopied(false), 2000);
    } else {
      downloadFile(content, format, draft.petName);
    }

    setLoading(null);
    if (format !== "clipboard") onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="저장 형식 선택">
      <div className="px-5 pb-5 flex flex-col gap-2.5">
        <p className="text-[13px] text-brand-400 mb-1">
          공고 초안을 어떤 형식으로 저장할까요?
        </p>

        {EXPORT_FORMATS.map((f) => (
          <button
            key={f.id}
            onClick={() => handleSelect(f.id)}
            disabled={loading !== null}
            className="w-full text-left flex items-center gap-3.5 p-3.5 rounded-[18px] border border-brand-100 bg-surface-50 hover:bg-brand-50 transition-colors disabled:opacity-50"
          >
            <div className="w-10 h-10 bg-surface-100 rounded-[12px] flex items-center justify-center shrink-0 text-[13px] font-black text-brand-450">
              {f.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-brand-800">{f.label}</p>
              <p className="text-[12px] text-brand-400 mt-0.5">{f.description}</p>
            </div>
            {loading === f.id && (
              <div className="w-4 h-4 border-2 border-brand-300 border-t-brand-500 rounded-full animate-spin shrink-0" />
            )}
            {f.id === "clipboard" && copied && (
              <span className="text-[11px] font-bold text-green-700 shrink-0">복사됨!</span>
            )}
          </button>
        ))}
      </div>
    </Modal>
  );
}
