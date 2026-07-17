"use client";

import { useEffect, useRef } from "react";
import { useChatContext } from "@/lib/ChatContext";
import type { AnnouncementDraft } from "@/lib/types";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { useRouter } from "next/navigation";

export default function ChatWindow() {
  const router = useRouter();
  const {
    messages, stage, isLoading, error,
    sendText, sendImages, sendVoice, answerChip, publish,
    clearError,
  } = useChatContext();
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isTyping = isLoading || stage === "uploading" || stage === "processing";

  async function handlePublish(draft: AnnouncementDraft) {
    const result = await publish();
    if (result) {
      router.push(
        `/chat/publish?petName=${encodeURIComponent(draft.petName)}&announcementId=${result.announcementId}&timeTaken=${encodeURIComponent(result.timeTaken)}`
      );
    }
  }

  function handleEditDraft() {
    sendText("말투를 더 친근하게 바꿔줘");
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {error && (
        <div className="mx-4 mt-3 px-4 py-3 bg-red-50 border border-red-200 rounded-[14px] flex items-center justify-between gap-3">
          <p className="text-[13px] text-red-600 flex-1">{error}</p>
          <button
            onClick={clearError}
            className="text-red-400 hover:text-red-600 text-[18px] leading-none shrink-0"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
      )}

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-hide px-[18px] pt-4 pb-2 flex flex-col gap-3.5"
      >
        {/* timestamp */}
        <div className="flex justify-center">
          <span className="text-[11px] font-semibold text-brand-200">오늘 오후 2:14</span>
        </div>

        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            onChipSelect={answerChip}
            onPublish={handlePublish}
            onEditDraft={handleEditDraft}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      <ChatInput
        onSendText={sendText}
        onSendImages={sendImages}
        onSendVoice={sendVoice}
        disabled={isTyping || stage === "published"}
        placeholder={stage === "draft_ready" ? "예: 말투를 더 친근하게" : "메시지 입력…"}
      />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-[30px] h-[30px] bg-brand-500 rounded-[15px] flex items-center justify-center shrink-0">
        <span className="text-[10px] text-white font-bold">AI</span>
      </div>
      <div className="flex gap-1 bg-surface-50 border border-brand-75 rounded-[20px] rounded-tl-[6px] px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
