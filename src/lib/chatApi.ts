/**
 * chatApi.ts
 *
 * 백엔드 채팅 API 호출 레이어.
 * ChatContext가 이 파일만 바라보므로, 백엔드 URL/스펙이 바뀌면 여기만 수정하면 됩니다.
 *
 * 환경변수:
 *   NEXT_PUBLIC_API_URL  — 백엔드 base URL (기본: http://localhost:8000/api/v1)
 *   NEXT_PUBLIC_USE_MOCK — "true" 이면 실제 API 대신 mock 동작
 */

import { API_BASE_URL } from "./constants";
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "./auth";
import type { ChatMessage, ChatStage, AnnouncementDraft, PetInfo } from "./types";

// ─── Raw API types (백엔드 응답 형태) ─────────────────────────────────────────

interface ApiSession {
  id: string;
  stage: ChatStage;
  announcement_id?: string;
  created_at: string;
}

interface ApiMessage {
  id: string;
  role: "user" | "assistant";
  type: ChatMessage["type"];
  content: string;
  metadata?: ChatMessage["metadata"];
  created_at: string;
}

/** 백엔드 slots.py (Pydantic v2) 과 1:1 대응 */
interface ApiSlots {
  // 필수 슬롯
  breed?: string;
  estimated_age?: { value: number; unit: "년" | "개월" };
  sex?: "수컷" | "암컷" | "미상";
  is_neutered?: boolean;
  weight_kg?: number;
  rescue_region?: string;
  rescue_date?: string;         // "2026-06-30"
  shelter_contact?: string;
  // 선택 슬롯
  appearance?: string;
  health_conditions?: string[];
  personality_notes?: string;
}

interface ApiDraft {
  pet_name: string;
  title: string;
  description: string;
  pet_info: ApiSlots & {
    name?: string;
    species: string;
  };
  representative_photo?: string;
}

interface ApiSendMessageResponse {
  user_message: ApiMessage;
  assistant_messages: ApiMessage[];
  stage: ChatStage;
  draft?: ApiDraft;
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

function mapApiMessage(m: ApiMessage): ChatMessage {
  return {
    id: m.id,
    role: m.role,
    type: m.type,
    content: m.content,
    metadata: m.metadata,
    createdAt: m.created_at,
  };
}

/** snake_case API 성별 → PetGender */
function mapSex(sex?: string): import("./types").PetGender {
  if (sex === "수컷") return "male";
  if (sex === "암컷") return "female";
  return "unknown";
}

function mapApiDraft(d: ApiDraft): AnnouncementDraft {
  const pi = d.pet_info;
  return {
    petName: d.pet_name,
    title: d.title,
    description: d.description,
    petInfo: {
      name: pi.name,
      species: pi.species,
      breed: pi.breed,
      gender: mapSex(pi.sex),
      estimatedAge: pi.estimated_age,   // { value, unit }
      weightKg: pi.weight_kg,
      neutered: pi.is_neutered,
      rescueRegion: pi.rescue_region,
      rescueDate: pi.rescue_date,       // "2026-06-30"
      shelterContact: pi.shelter_contact,
      appearance: pi.appearance,
      healthConditions: pi.health_conditions,
      personalityNotes: pi.personality_notes,
    },
    representativePhoto: d.representative_photo,
  };
}

// ─── Auth helper ──────────────────────────────────────────────────────────────

function authHeaders(): HeadersInit {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// refresh 중복 요청 방지용 플래그
let _refreshing: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  if (_refreshing) return _refreshing;
  _refreshing = (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (!res.ok) {
        clearTokens();
        return false;
      }
      const data = await res.json() as { access_token: string; refresh_token: string; expires_in: number };
      saveTokens({ accessToken: data.access_token, refreshToken: data.refresh_token, expiresIn: data.expires_in });
      return true;
    } catch {
      clearTokens();
      return false;
    } finally {
      _refreshing = null;
    }
  })();
  return _refreshing;
}

async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const doFetch = () =>
    fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
        ...(init.headers ?? {}),
      },
    });

  let res = await doFetch();

  // 401 → 토큰 갱신 후 1회 재시도
  if (res.status === 401) {
    const ok = await tryRefresh();
    if (ok) {
      res = await doFetch();
    } else {
      // refresh도 실패 → 로그인 페이지로
      if (typeof window !== "undefined") window.location.href = "/login";
      throw new Error("인증이 만료됐어요. 다시 로그인해 주세요.");
    }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { detail?: string }).detail ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// multipart/form-data 전송용 (Content-Type 헤더 직접 지정 X → 브라우저가 boundary 자동 추가)
async function apiFetchForm<T>(path: string, body: FormData): Promise<T> {
  const doFetch = () =>
    fetch(`${API_BASE_URL}${path}`, { method: "POST", headers: authHeaders(), body });

  let res = await doFetch();

  if (res.status === 401) {
    const ok = await tryRefresh();
    if (ok) {
      res = await doFetch();
    } else {
      if (typeof window !== "undefined") window.location.href = "/login";
      throw new Error("인증이 만료됐어요. 다시 로그인해 주세요.");
    }
  }

  if (!res.ok) {
    const body2 = await res.json().catch(() => ({}));
    throw new Error((body2 as { detail?: string }).detail ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Session ──────────────────────────────────────────────────────────────────

/** 새 채팅 세션 생성. 페이지 마운트 시 1회 호출. */
export async function createSession(): Promise<string> {
  const data = await apiFetch<ApiSession>("/chat/sessions", { method: "POST" });
  return data.id;
}

/** 기존 세션의 메시지 목록 조회 (재접속 시). */
export async function fetchMessages(sessionId: string): Promise<ChatMessage[]> {
  const data = await apiFetch<ApiMessage[]>(`/chat/sessions/${sessionId}/messages`);
  return data.map(mapApiMessage);
}

// ─── Send text message ────────────────────────────────────────────────────────

export interface SendTextResult {
  assistantMessages: ChatMessage[];
  stage: ChatStage;
  draft?: AnnouncementDraft;
}

export async function sendTextMessage(
  sessionId: string,
  text: string
): Promise<SendTextResult> {
  const data = await apiFetch<ApiSendMessageResponse>(
    `/chat/sessions/${sessionId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({ type: "text", content: text }),
    }
  );

  return {
    assistantMessages: data.assistant_messages.map(mapApiMessage),
    stage: data.stage,
    draft: data.draft ? mapApiDraft(data.draft) : undefined,
  };
}

// ─── Send images ──────────────────────────────────────────────────────────────

export interface SendImagesResult {
  assistantMessages: ChatMessage[];
  stage: ChatStage;
  representativeIndex: number;
  aiConfidence: number;
  parsedPetInfo?: PetInfo;
}

export async function sendImages(
  sessionId: string,
  files: File[]
): Promise<SendImagesResult> {
  const form = new FormData();
  files.forEach((f) => form.append("images", f));

  const data = await apiFetchForm<{
    assistant_messages: ApiMessage[];
    stage: ChatStage;
    representative_index: number;
    ai_confidence: number;
    parsed_pet_info?: ApiDraft["pet_info"];
  }>(`/chat/sessions/${sessionId}/images`, form);

  return {
    assistantMessages: data.assistant_messages.map(mapApiMessage),
    stage: data.stage,
    representativeIndex: data.representative_index,
    aiConfidence: data.ai_confidence,
    parsedPetInfo: data.parsed_pet_info
      ? {
          name: data.parsed_pet_info.name,
          species: data.parsed_pet_info.species,
          breed: data.parsed_pet_info.breed,
          gender: mapSex(data.parsed_pet_info.sex),
          estimatedAge: data.parsed_pet_info.estimated_age,
          weightKg: data.parsed_pet_info.weight_kg,
          neutered: data.parsed_pet_info.is_neutered,
          rescueRegion: data.parsed_pet_info.rescue_region,
          rescueDate: data.parsed_pet_info.rescue_date,
          shelterContact: data.parsed_pet_info.shelter_contact,
          appearance: data.parsed_pet_info.appearance,
          healthConditions: data.parsed_pet_info.health_conditions,
          personalityNotes: data.parsed_pet_info.personality_notes,
        }
      : undefined,
  };
}

// ─── Send voice ───────────────────────────────────────────────────────────────

export async function sendVoice(
  sessionId: string,
  audioBlob: Blob,
  durationSec: number
): Promise<SendTextResult> {
  const form = new FormData();
  form.append("audio", audioBlob, "voice.webm");
  form.append("duration_sec", String(durationSec));

  const data = await apiFetchForm<ApiSendMessageResponse>(
    `/chat/sessions/${sessionId}/voice`,
    form
  );
  return {
    assistantMessages: data.assistant_messages.map(mapApiMessage),
    stage: data.stage,
    draft: data.draft ? mapApiDraft(data.draft) : undefined,
  };
}

// ─── Answer chip (추가 질문 답변) ──────────────────────────────────────────────

export async function answerQuestion(
  sessionId: string,
  questionKey: string,
  value: string
): Promise<SendTextResult> {
  const data = await apiFetch<ApiSendMessageResponse>(
    `/chat/sessions/${sessionId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({
        type: "quick_reply",
        content: value,
        metadata: { question_key: questionKey },
      }),
    }
  );

  return {
    assistantMessages: data.assistant_messages.map(mapApiMessage),
    stage: data.stage,
    draft: data.draft ? mapApiDraft(data.draft) : undefined,
  };
}

// ─── Publish ──────────────────────────────────────────────────────────────────

export interface PublishResult {
  announcementId: string;
  timeTaken: string;
}

export async function publishAnnouncement(
  sessionId: string,
  platformId?: string
): Promise<PublishResult> {
  const data = await apiFetch<{ announcement_id: string; time_taken: string }>(
    `/chat/sessions/${sessionId}/publish`,
    {
      method: "POST",
      body: JSON.stringify({ platform_id: platformId }),
    }
  );
  return { announcementId: data.announcement_id, timeTaken: data.time_taken };
}

// ─── SSE streaming (선택적 — 백엔드가 streaming 지원 시 사용) ─────────────────

/**
 * 텍스트 메시지를 SSE 스트리밍으로 전송.
 * 백엔드가 `text/event-stream`을 지원하지 않으면 sendTextMessage() 사용.
 *
 * @param onToken   글자 단위 스트리밍 콜백
 * @param onDone    스트리밍 완료 콜백 (최종 stage, draft 포함)
 */
export async function sendTextStreaming(
  sessionId: string,
  text: string,
  onToken: (delta: string) => void,
  onDone: (result: SendTextResult) => void,
  onError: (err: Error) => void
): Promise<void> {
  try {
    const doStream = () =>
      fetch(`${API_BASE_URL}/chat/sessions/${sessionId}/messages/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          ...authHeaders(),
        },
        body: JSON.stringify({ type: "text", content: text }),
      });

    let res = await doStream();

    if (res.status === 401) {
      const ok = await tryRefresh();
      if (ok) {
        res = await doStream();
      } else {
        if (typeof window !== "undefined") window.location.href = "/login";
        throw new Error("인증이 만료됐어요. 다시 로그인해 주세요.");
      }
    }

    if (!res.ok || !res.body) {
      const body = await res.json().catch(() => ({}));
      throw new Error((body as { detail?: string }).detail ?? `HTTP ${res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    let finalStage: ChatStage = "start";
    let finalDraft: AnnouncementDraft | undefined;
    const collectedMessages: ChatMessage[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6).trim();
        if (!raw || raw === "[DONE]") continue;

        try {
          const event = JSON.parse(raw) as
            | { type: "token"; delta: string }
            | { type: "message"; message: ApiMessage }
            | { type: "done"; stage: ChatStage; draft?: ApiDraft };

          if (event.type === "token") {
            onToken(event.delta);
          } else if (event.type === "message") {
            collectedMessages.push(mapApiMessage(event.message));
          } else if (event.type === "done") {
            finalStage = event.stage;
            finalDraft = event.draft ? mapApiDraft(event.draft) : undefined;
          }
        } catch {
          // 파싱 실패한 이벤트는 무시
        }
      }
    }

    onDone({ assistantMessages: collectedMessages, stage: finalStage, draft: finalDraft });
  } catch (err) {
    onError(err instanceof Error ? err : new Error(String(err)));
  }
}
