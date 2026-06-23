"use client";

import { useRef, useState } from "react";

interface ChatInputProps {
  onSendText: (text: string) => void;
  onSendVoice?: (blob: Blob) => void;
  onSendImage?: (file: File) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSendText,
  onSendImage,
  disabled,
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
    const file = e.target.files?.[0];
    if (file && onSendImage) onSendImage(file);
    e.target.value = "";
  }

  return (
    <div className="flex flex-col gap-2 px-4 pt-2 pb-5 bg-brand-50 border-t border-brand-100">
      <div className="flex items-center gap-2 bg-surface-50 rounded-2xl border border-brand-100 px-3 py-2.5">
        {/* Photo */}
        <button
          type="button"
          aria-label="사진 추가"
          disabled={disabled}
          onClick={() => fileRef.current?.click()}
          className="p-1.5 rounded-lg text-brand-400 hover:text-brand-500 hover:bg-brand-50 transition-colors disabled:opacity-40"
        >
          <CameraIcon />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Text input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지 입력…"
          disabled={disabled}
          className="flex-1 bg-transparent text-[15px] text-brand-800 placeholder:text-brand-300 outline-none disabled:opacity-40"
        />

        {/* Send */}
        <button
          type="button"
          aria-label="전송"
          disabled={disabled || !text.trim()}
          onClick={handleSubmit}
          className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center text-white disabled:opacity-30 transition-opacity"
        >
          <SendIcon />
        </button>
      </div>

      <div className="flex gap-3 justify-center">
        <QuickActionPill label="사진 추가" onClick={() => fileRef.current?.click()} />
        <QuickActionPill label="음성 녹음" />
      </div>
    </div>
  );
}

function QuickActionPill({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-100 border border-brand-100 text-[13px] text-brand-500 font-medium hover:bg-brand-50 transition-colors"
    >
      {label}
    </button>
  );
}

function CameraIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M23 19C23 20.1 22.1 21 21 21H3C1.9 21 1 20.1 1 19V8C1 6.9 1.9 6 3 6H7L9 3H15L17 6H21C22.1 6 23 6.9 23 8V19Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
