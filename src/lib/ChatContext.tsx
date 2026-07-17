"use client";

/**
 * ChatContext.tsx
 *
 * NEXT_PUBLIC_USE_MOCK=true  → mock 시뮬레이션 (백엔드 없어도 UI 확인 가능)
 * NEXT_PUBLIC_USE_MOCK 미설정 → 실제 백엔드 chatApi.ts 호출
 * NEXT_PUBLIC_USE_STREAM=true → 텍스트 응답을 SSE 스트리밍으로 수신
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import type { ChatMessage, ChatStage, AnnouncementDraft, PlatformId } from "./types";
import * as api from "./chatApi";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// ─── Context shape ────────────────────────────────────────────────────────────

interface ChatContextValue {
  messages: ChatMessage[];
  stage: ChatStage;
  isLoading: boolean;
  platformId: PlatformId | undefined;
  draft: AnnouncementDraft | undefined;
  sessionId: string | undefined;
  error: string | null;
  sendText: (text: string) => Promise<void>;
  sendImages: (files: File[]) => Promise<void>;
  sendVoice: (file: File, durationSec: number) => Promise<void>;
  answerChip: (questionKey: string, value: string) => Promise<void>;
  publish: () => Promise<{ announcementId: string; timeTaken: string } | null>;
  setPlatform: (id: PlatformId) => void;
  clearError: () => void;
  reset: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _id = 0;
function newId() {
  return `msg-${++_id}-${Date.now()}`;
}
function makeMsg(partial: Omit<ChatMessage, "id" | "createdAt">): ChatMessage {
  return { ...partial, id: newId(), createdAt: new Date().toISOString() };
}

const WELCOME: ChatMessage = makeMsg({
  role: "assistant",
  type: "text",
  content:
    "안녕하세요! 어떤 아이의 공고를 만들까요?\n구조한 아이의 **사진**과 **음성 메모**를 보내주시면 제가 정리해서 공고 초안을 만들어 드릴게요.",
});

// ─── Mock 세션 복원용 샘플 대화 ──────────────────────────────────────────────

function makeMockRestoredMessages(): ChatMessage[] {
  return [
    WELCOME,
    makeMsg({ role: "user", type: "image_group", content: "사진 2장 전송", metadata: { imageUrls: [], aiPickIndex: 0, aiConfidence: 88 } }),
    makeMsg({ role: "assistant", type: "text", content: "대표 사진을 골랐어요. 정면을 보고 단독으로 찍힌 사진이 입양률이 높아요." }),
    makeMsg({
      role: "assistant", type: "pet_info_card", content: "들은 내용을 정리했어요",
      metadata: {
        petInfo: { species: "dog", breed: "믹스견", gender: "male", estimatedAge: { value: 3, unit: "년" as const }, weightKg: 5, appearance: "갈색 단모", healthConditions: ["슬개골 탈구 2기", "심장사상충 음성"] },
      },
    }),
    makeMsg({
      role: "assistant", type: "quick_chips", content: "중성화 수술은 했나요?",
      metadata: { questionKey: "neutered", chips: [{ label: "했어요", value: "true" }, { label: "안 했어요", value: "false" }, { label: "모름", value: "unknown" }], currentQuestion: 1, totalQuestions: 2 },
    }),
  ];
}

// ─── Mock Provider ────────────────────────────────────────────────────────────

function MockProvider({ children, initialSessionId }: { children: ReactNode; initialSessionId?: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialSessionId ? makeMockRestoredMessages() : [WELCOME]
  );
  const [stage, setStage] = useState<ChatStage>(initialSessionId ? "clarifying" : "start");
  const [isLoading, setIsLoading] = useState(false);
  const [draft, setDraft] = useState<AnnouncementDraft | undefined>();
  const [platformId, setPlatformState] = useState<PlatformId | undefined>();
  const answersRef = useRef<Record<string, string>>({});

  const add = useCallback((...msgs: ChatMessage[]) => {
    setMessages((prev) => [...prev, ...msgs]);
  }, []);

  const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  const sendText = useCallback(async (text: string) => {
    add(makeMsg({ role: "user", type: "text", content: text }));
    setIsLoading(true);
    await delay(900);
    add(makeMsg({
      role: "assistant",
      type: "text",
      content: "사진이나 음성 메모도 함께 보내주시면 더 정확하게 정리할 수 있어요!",
    }));
    setIsLoading(false);
  }, [add]);

  const sendImages = useCallback(async (files: File[]) => {
    const urls = files.map((f) => URL.createObjectURL(f));
    add(makeMsg({
      role: "user",
      type: "image_group",
      content: `사진 ${files.length}장 전송`,
      metadata: { imageUrls: urls, aiPickIndex: 0, aiConfidence: 92 },
    }));
    setIsLoading(true);
    await delay(1200);
    add(makeMsg({
      role: "assistant",
      type: "text",
      content: "대표 사진을 골랐어요. 정면을 보고 단독으로 찍힌 사진이 입양률이 높아요.",
    }));
    await delay(800);
    add(makeMsg({
      role: "assistant",
      type: "pet_info_card",
      content: "들은 내용을 정리했어요",
      metadata: {
        petInfo: {
          species: "dog", breed: "믹스견", gender: "male",
          estimatedAge: { value: 3, unit: "년" as const },
          weightKg: 5,
          appearance: "갈색 단모",
          healthConditions: ["슬개골 탈구 2기", "심장사상충 음성"],
        },
      },
    }));
    setStage("clarifying");
    await delay(600);
    add(makeMsg({
      role: "assistant",
      type: "quick_chips",
      content: "중성화 수술은 했나요?",
      metadata: {
        questionKey: "neutered",
        chips: [
          { label: "했어요", value: "true" },
          { label: "안 했어요", value: "false" },
          { label: "모름", value: "unknown" },
        ],
        currentQuestion: 1,
        totalQuestions: 2,
      },
    }));
    setIsLoading(false);
  }, [add]);

  const sendVoice = useCallback(async (_file: File, duration: number) => {
    add(makeMsg({
      role: "user",
      type: "voice",
      content: `음성 메모 0:${String(duration).padStart(2, "0")}`,
      metadata: { voiceDuration: duration },
    }));
  }, [add]);

  const answerChip = useCallback(async (questionKey: string, value: string) => {
    const labels: Record<string, Record<string, string>> = {
      neutered: { true: "했어요", false: "안 했어요", unknown: "모름" },
      vaccinated: { true: "있어요", false: "없어요", unknown: "모름" },
    };
    answersRef.current = { ...answersRef.current, [questionKey]: value };
    add(makeMsg({ role: "user", type: "text", content: labels[questionKey]?.[value] ?? value }));
    setIsLoading(true);
    await delay(400);

    if (questionKey === "neutered") {
      add(makeMsg({
        role: "assistant",
        type: "quick_chips",
        content: "예방접종 기록도 있을까요?",
        metadata: {
          questionKey: "vaccinated",
          chips: [
            { label: "있어요", value: "true" },
            { label: "없어요", value: "false" },
          ],
          currentQuestion: 2,
          totalQuestions: 2,
        },
      }));
    } else {
      setStage("draft_ready");
      const a = answersRef.current;
      const newDraft: AnnouncementDraft = {
        petName: "보리",
        title: "사람을 잘 따르는 갈색 믹스견, 보리",
        description:
          "사람을 무척 좋아하고 잘 따르는 3살 남아예요. OO동에서 구조되었고, 건강하게 새 가족을 기다리고 있어요.",
        petInfo: {
          name: "보리", species: "dog", breed: "믹스견", gender: "male",
          estimatedAge: { value: 3, unit: "년" as const },
          weightKg: 5,
          appearance: "갈색 단모",
          healthConditions: ["슬개골 탈구 2기", "심장사상충 음성"],
          neutered: a["neutered"] === "true",
          vaccinated: a["vaccinated"] === "true",
          rescueRegion: "OO동", rescueDate: "2026-05-18",
          shelterContact: "010-0000-0000",
        },
      };
      setDraft(newDraft);
      add(makeMsg({
        role: "assistant",
        type: "draft_card",
        content: "이렇게 작성했어요. 확인 후 게시해 주세요!",
        metadata: { draft: newDraft },
      }));
    }
    setIsLoading(false);
  }, [add]);

  const publish = useCallback(async () => {
    setStage("publishing");
    await delay(800);
    setStage("published");
    return { announcementId: "mock-ann-1", timeTaken: "1분 42초" };
  }, []);

  const reset = useCallback(() => {
    setMessages([WELCOME]);
    setStage("start");
    setDraft(undefined);
    answersRef.current = {};
  }, []);

  return (
    <ChatContext.Provider value={{
      messages, stage, isLoading, platformId, draft,
      sessionId: "mock-session",
      error: null,
      sendText, sendImages, sendVoice, answerChip, publish,
      setPlatform: setPlatformState,
      clearError: () => {},
      reset,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

// ─── Real API Provider ────────────────────────────────────────────────────────

function ApiProvider({ children, initialSessionId }: { children: ReactNode; initialSessionId?: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [stage, setStage] = useState<ChatStage>("start");
  const [isLoading, setIsLoading] = useState(!!initialSessionId);
  const [draft, setDraft] = useState<AnnouncementDraft | undefined>();
  const [platformId, setPlatformState] = useState<PlatformId | undefined>();
  const [sessionId, setSessionId] = useState<string | undefined>(initialSessionId);
  const [error, setError] = useState<string | null>(null);

  const addErrorBubble = useCallback((msg: string) => {
    setMessages((prev) => [
      ...prev,
      makeMsg({ role: "assistant", type: "text", content: `⚠️ ${msg}` }),
    ]);
  }, []);

  // 세션 초기화: initialSessionId가 있으면 메시지 복원, 없으면 새 세션 생성
  useEffect(() => {
    if (initialSessionId) {
      api.fetchMessages(initialSessionId)
        .then((msgs) => {
          if (msgs.length > 0) setMessages(msgs);
        })
        .catch(() => addErrorBubble("대화 내역을 불러오지 못했어요."))
        .finally(() => setIsLoading(false));
    } else {
      api.createSession()
        .then(setSessionId)
        .catch(() => setError("세션을 시작하지 못했어요. 페이지를 새로고침해 주세요."));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = useCallback((...msgs: ChatMessage[]) => {
    setMessages((prev) => [...prev, ...msgs]);
  }, []);

  const applyResult = useCallback(
    (assistantMessages: ChatMessage[], newStage: ChatStage, newDraft?: AnnouncementDraft) => {
      add(...assistantMessages);
      setStage(newStage);
      if (newDraft) setDraft(newDraft);
    },
    [add]
  );

  const sendText = useCallback(async (text: string) => {
    if (!sessionId) {
      setError("세션이 준비되지 않았어요. 페이지를 새로고침해 주세요.");
      return;
    }
    add(makeMsg({ role: "user", type: "text", content: text }));
    setIsLoading(true);

    const useStream = process.env.NEXT_PUBLIC_USE_STREAM === "true";

    if (useStream) {
      const tmpId = newId();
      const tmpMsg: ChatMessage = { ...makeMsg({ role: "assistant", type: "text", content: "" }), id: tmpId };
      add(tmpMsg);

      try {
        await api.sendTextStreaming(
          sessionId,
          text,
          (delta) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === tmpId ? { ...m, content: m.content + delta } : m))
            );
          },
          (result) => {
            setMessages((prev) => prev.filter((m) => m.id !== tmpId));
            applyResult(result.assistantMessages, result.stage, result.draft);
          },
          (err) => {
            setMessages((prev) => prev.filter((m) => m.id !== tmpId));
            addErrorBubble(err.message || "메시지 전송에 실패했어요. 다시 시도해 주세요.");
          }
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const result = await api.sendTextMessage(sessionId, text);
        applyResult(result.assistantMessages, result.stage, result.draft);
      } catch (e) {
        addErrorBubble(e instanceof Error ? e.message : "메시지 전송에 실패했어요. 다시 시도해 주세요.");
      } finally {
        setIsLoading(false);
      }
    }
  }, [sessionId, add, applyResult, addErrorBubble]);

  const sendImages = useCallback(async (files: File[]) => {
    if (!sessionId) {
      setError("세션이 준비되지 않았어요. 페이지를 새로고침해 주세요.");
      return;
    }
    const urls = files.map((f) => URL.createObjectURL(f));
    add(makeMsg({
      role: "user", type: "image_group",
      content: `사진 ${files.length}장 전송`,
      metadata: { imageUrls: urls },
    }));
    setIsLoading(true);
    try {
      const result = await api.sendImages(sessionId, files);
      applyResult(result.assistantMessages, result.stage);
    } catch (e) {
      addErrorBubble(e instanceof Error ? e.message : "사진 전송에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, add, applyResult, addErrorBubble]);

  const sendVoice = useCallback(async (file: File, durationSec: number) => {
    if (!sessionId) {
      setError("세션이 준비되지 않았어요. 페이지를 새로고침해 주세요.");
      return;
    }
    add(makeMsg({
      role: "user", type: "voice",
      content: `음성 메모 0:${String(durationSec).padStart(2, "0")}`,
      metadata: { voiceDuration: durationSec },
    }));
    setIsLoading(true);
    try {
      const result = await api.sendVoice(sessionId, file, durationSec);
      applyResult(result.assistantMessages, result.stage, result.draft);
    } catch (e) {
      addErrorBubble(e instanceof Error ? e.message : "음성 전송에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, add, applyResult, addErrorBubble]);

  const answerChip = useCallback(async (questionKey: string, value: string) => {
    if (!sessionId) return;
    const labels: Record<string, Record<string, string>> = {
      neutered: { true: "했어요", false: "안 했어요", unknown: "모름" },
      vaccinated: { true: "있어요", false: "없어요", unknown: "모름" },
    };
    add(makeMsg({ role: "user", type: "text", content: labels[questionKey]?.[value] ?? value }));
    setIsLoading(true);
    try {
      const result = await api.answerQuestion(sessionId, questionKey, value);
      applyResult(result.assistantMessages, result.stage, result.draft);
    } catch (e) {
      addErrorBubble(e instanceof Error ? e.message : "답변 전송에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, add, applyResult, addErrorBubble]);

  const publish = useCallback(async () => {
    if (!sessionId) return null;
    setStage("publishing");
    setIsLoading(true);
    try {
      const result = await api.publishAnnouncement(sessionId, platformId);
      setStage("published");
      return result;
    } catch (e) {
      setStage("draft_ready");
      addErrorBubble(e instanceof Error ? e.message : "게시에 실패했어요. 다시 시도해 주세요.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, platformId, addErrorBubble]);

  const reset = useCallback(() => {
    setMessages([WELCOME]);
    setStage("start");
    setDraft(undefined);
    setError(null);
    api.createSession()
      .then(setSessionId)
      .catch(() => setError("세션을 시작하지 못했어요. 페이지를 새로고침해 주세요."));
  }, []);

  return (
    <ChatContext.Provider value={{
      messages, stage, isLoading, platformId, draft, sessionId, error,
      sendText, sendImages, sendVoice, answerChip, publish,
      setPlatform: setPlatformState,
      clearError: () => setError(null),
      reset,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

// ─── Public exports ───────────────────────────────────────────────────────────

interface ChatProviderProps {
  children: ReactNode;
  /** 기존 세션 복원 시 전달 (AnnouncementCard draft → /chat?session=xxx) */
  initialSessionId?: string;
}

export function ChatProvider({ children, initialSessionId }: ChatProviderProps) {
  return USE_MOCK ? (
    <MockProvider initialSessionId={initialSessionId}>{children}</MockProvider>
  ) : (
    <ApiProvider initialSessionId={initialSessionId}>{children}</ApiProvider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used inside ChatProvider");
  return ctx;
}
