"use client";

import { useRef, useState } from "react";
import { PlusCircleIcon, MicIcon, SendIcon } from "@/components/ui/Icons";

interface ChatInputProps {
  onSendText: (text: string) => void | Promise<void>;
  onSendImages?: (files: File[]) => void | Promise<void>;
  onSendVoice?: (file: File, durationSec: number) => void | Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

/** 오디오 파일 메타데이터에서 재생 길이(초)를 읽어와요 */
function readAudioDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    const url = URL.createObjectURL(file);
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      const duration = Number.isFinite(audio.duration) ? Math.round(audio.duration) : 0;
      URL.revokeObjectURL(url);
      resolve(duration);
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(0);
    };
    audio.src = url;
  });
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
  const voiceFileRef = useRef<HTMLInputElement>(null);

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

  async function handleVoiceFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !onSendVoice) return;
    const duration = await readAudioDuration(file);
    onSendVoice(file, duration);
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

      <div className="flex-1 bg-surface-200 rounded-full px-4 py-2.5">
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
        aria-label="음성 파일 첨부"
        onClick={() => voiceFileRef.current?.click()}
        className="text-brand-500 hover:text-brand-600 transition-colors shrink-0"
      >
        <MicIcon size={26} />
      </button>
      <input
        ref={voiceFileRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={handleVoiceFileChange}
      />

      <button
        type="button"
        aria-label="전송"
        disabled={!canSend}
        onClick={handleSubmit}
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
          canSend ? "bg-brand-500 hover:bg-brand-600" : "bg-brand-150"
        }`}
      >
        <SendIcon size={18} color="white" className={canSend ? "" : "opacity-60"} />
      </button>
    </div>
  );
}
