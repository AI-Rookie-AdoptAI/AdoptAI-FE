"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/types";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    type: "text",
    content: "안녕하세요! 입양 공고 작성을 도와드릴게요.\n구조한 아이에 대해 알고 있는 정보를 말씀해 주세요.",
    createdAt: new Date().toISOString(),
  },
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function addMessage(msg: Omit<ChatMessage, "id" | "createdAt">) {
    setMessages((prev) => [
      ...prev,
      { ...msg, id: Date.now().toString(), createdAt: new Date().toISOString() },
    ]);
  }

  async function handleSendText(text: string) {
    addMessage({ role: "user", type: "text", content: text });
    setLoading(true);

    // TODO: Replace with real API call to /api/v1/chat/sessions/{id}/messages
    await new Promise((r) => setTimeout(r, 1200));
    addMessage({
      role: "assistant",
      type: "text",
      content: "들은 내용을 분석하고 있어요. 음성 메모나 사진이 있으면 함께 전달해 주세요.",
    });
    setLoading(false);
  }

  function handleSendImage(file: File) {
    const url = URL.createObjectURL(file);
    addMessage({
      role: "user",
      type: "image",
      content: "사진",
      metadata: { imageUrl: url },
    });
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {messages.map((msg) =>
          msg.type === "image" && msg.metadata?.imageUrl ? (
            <div key={msg.id} className="flex justify-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={msg.metadata.imageUrl}
                alt="업로드 사진"
                className="w-48 h-48 object-cover rounded-2xl rounded-tr-sm"
              />
            </div>
          ) : (
            <ChatBubble key={msg.id} message={msg} />
          )
        )}

        {loading && (
          <div className="flex items-start gap-1.5">
            <div className="flex gap-1 bg-surface-50 rounded-2xl rounded-tl-sm px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput
        onSendText={handleSendText}
        onSendImage={handleSendImage}
        disabled={loading}
      />
    </div>
  );
}
