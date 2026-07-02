"use client";

import { useRef, useState } from "react";
import { PlusCircleIcon, MicIcon, CameraIcon } from "@/components/ui/Icons";

interface ChatInputProps {
  onSendText: (text: string) => void | Promise<void>;
  onSendImages?: (files: File[]) => void | Promise<void>;
  onSendVoice?: (duration: number) => void | Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSendText,
  onSendImages,
  onSendVoice,
  disabled,
  placeholder = "메시지 입력…",
}: ChatInputProps) {
  const [text, setText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSendText(trimmed);
    setText("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length && onSendImages) onSendImages(files);
    e.target.value = "";
  }

  function handleVoice() {
    onSendVoice?.(14);
  }

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <div className="flex items-center gap-2.5 px-4 pt-2.5 pb-7 bg-surface-50 border-t border-brand-75">
      <button
        type="button"
        aria-label="추가"
        onClick={() => fileRef.current?.click()}
        className="text-brand-500 hover:text-brand-600 transition-colors shrink-0"
      >
        <PlusCircleIcon size={26} />
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex-1 bg-surface-200 rounded-[22px] px-4 py-2.5">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-transparent text-[13.5px] text-brand-800 placeholder:text-brand-350 outline-none"
        />
      </div>

      <button
        type="button"
        aria-label="음성"
        onClick={handleVoice}
        className="text-brand-500 hover:text-brand-600 transition-colors shrink-0"
      >
        <MicIcon size={26} />
      </button>

      <button
        type="button"
        aria-label="전송"
        disabled={!canSend}
        onClick={handleSubmit}
        className={`w-10 h-10 rounded-[20px] flex items-center justify-center shrink-0 transition-colors ${
          canSend ? "bg-brand-500 hover:bg-brand-600" : "bg-brand-150"
        }`}
      >
        <SendArrowIcon active={canSend} />
      </button>
    </div>
  );
}

function SendArrowIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 19V5M5 12l7-7 7 7"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={active ? 1 : 0.6}
      />
    </svg>
  );
}
