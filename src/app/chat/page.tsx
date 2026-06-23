import ChatWindow from "@/components/chat/ChatWindow";
import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-brand-50">
      {/* Chat header */}
      <header className="flex items-center gap-3 px-4 pt-12 pb-3 bg-brand-50 border-b border-brand-100 shrink-0">
        <Link
          href="/"
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-brand-100 transition-colors"
          aria-label="뒤로 가기"
        >
          <ChevronLeft />
        </Link>
        <div className="flex-1">
          <p className="text-[16px] font-bold text-brand-800">입양 도우미</p>
          <p className="text-[12px] text-green-500 font-medium">사실 기반 작성</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-500" />
      </header>

      <ChatWindow />
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18L9 12L15 6"
        stroke="#2a211b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
