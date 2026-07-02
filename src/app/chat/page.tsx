"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatProvider, useChatContext } from "@/lib/ChatContext";
import ChatWindow from "@/components/chat/ChatWindow";
import { PawIcon, ChevronLeftIcon, MoreHorizIcon } from "@/components/ui/Icons";
import Link from "next/link";

export default function ChatPage() {
  return (
    <Suspense>
      <ChatPageWithSession />
    </Suspense>
  );
}

function ChatPageWithSession() {
  const params = useSearchParams();
  const sessionId = params.get("session") ?? undefined;

  return (
    <ChatProvider initialSessionId={sessionId}>
      <ChatPageInner />
    </ChatProvider>
  );
}

function ChatPageInner() {
  const { stage, messages } = useChatContext();

  const isResume = messages.length > 1; // 복원된 세션이면 웰컴 외 메시지 존재

  const statusMap: Record<string, { text: string; color: string }> = {
    start:      { text: "사실 기반 작성",   color: "text-green-600" },
    uploading:  { text: "사진 분석 중…",    color: "text-brand-300" },
    processing: { text: "분석 중…",         color: "text-brand-300" },
    clarifying: { text: "확인이 필요해요",   color: "text-brand-500" },
    draft_ready:{ text: "초안 완성",         color: "text-green-600" },
    editing:    { text: "수정 중",           color: "text-brand-400" },
    publishing: { text: "게시 중…",          color: "text-brand-300" },
    published:  { text: "게시 완료",         color: "text-green-600" },
  };

  const status = statusMap[stage] ?? statusMap.start;

  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <header className="flex items-center gap-2.5 px-[18px] pt-[52px] pb-3 bg-surface-50 border-b border-brand-75 shrink-0">
        <Link
          href="/"
          className="w-6 h-6 flex items-center justify-center text-brand-450 hover:text-brand-600 transition-colors"
          aria-label="뒤로 가기"
        >
          <ChevronLeftIcon size={24} color="currentColor" />
        </Link>

        <div className="w-[38px] h-[38px] bg-brand-500 rounded-[19px] flex items-center justify-center shrink-0">
          <PawIcon size={20} color="white" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-extrabold text-brand-800 leading-tight">입양 도우미</p>
          <div className="flex items-center gap-1.5">
            {(stage === "start" || stage === "draft_ready") && (
              <div className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
            )}
            <p className={`text-[11px] font-semibold ${status.color}`}>
              {isResume ? `이어서 작성 중 · ${status.text}` : status.text}
            </p>
          </div>
        </div>

        <button className="text-brand-200 hover:text-brand-400 transition-colors" aria-label="더보기">
          <MoreHorizIcon size={24} color="currentColor" />
        </button>
      </header>

      <ChatWindow />
    </div>
  );
}
