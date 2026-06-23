import type { ChatMessage } from "@/lib/types";
import PetInfoCard from "./PetInfoCard";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isAssistant = message.role === "assistant";

  if (message.type === "pet_info_card" && message.metadata?.petInfo) {
    return (
      <div className="flex flex-col gap-2 items-start">
        <AssistantLabel />
        <PetInfoCard petInfo={message.metadata.petInfo} confidence={message.metadata.confidence} />
      </div>
    );
  }

  if (message.type === "voice") {
    return (
      <div className={`flex ${isAssistant ? "flex-col items-start gap-1" : "justify-end"}`}>
        {isAssistant && <AssistantLabel />}
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl max-w-[75%] ${
            isAssistant
              ? "bg-surface-50 text-brand-800 rounded-tl-sm"
              : "bg-brand-500 text-white rounded-tr-sm"
          }`}
        >
          <MicIcon color={isAssistant ? "#8a5a2b" : "white"} />
          <span className="text-[14px] font-medium">
            음성 메모 {formatDuration(message.metadata?.voiceDuration ?? 0)}
          </span>
        </div>
      </div>
    );
  }

  if (message.type === "confirmation_question") {
    return (
      <div className="flex flex-col items-start gap-1">
        <AssistantLabel />
        <div className="bg-surface-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
          {message.metadata?.questionIndex !== undefined && (
            <p className="text-[11px] font-bold text-brand-300 uppercase tracking-wide mb-1.5">
              확인이 필요해요 · {message.metadata.questionIndex + 1}/
              {message.metadata.totalQuestions}
            </p>
          )}
          <p className="text-[15px] text-brand-800">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isAssistant ? "flex-col items-start gap-1" : "justify-end"}`}>
      {isAssistant && <AssistantLabel />}
      <div
        className={`px-4 py-3 rounded-2xl max-w-[80%] text-[15px] leading-relaxed ${
          isAssistant
            ? "bg-surface-50 text-brand-800 rounded-tl-sm"
            : "bg-brand-500 text-white rounded-tr-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

function AssistantLabel() {
  return (
    <div className="flex items-center gap-1.5 mb-0.5">
      <div className="w-5 h-5 bg-brand-500 rounded-md flex items-center justify-center">
        <span className="text-[9px] text-white font-bold">AI</span>
      </div>
      <span className="text-[12px] font-semibold text-brand-400">입양 도우미</span>
    </div>
  );
}

function MicIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="11" rx="3" fill={color} />
      <path
        d="M5 10C5 14.4 8.1 18 12 18C15.9 18 19 14.4 19 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line x1="12" y1="18" x2="12" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
