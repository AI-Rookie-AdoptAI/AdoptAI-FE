import type React from "react";

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

// ─── Platform ─────────────────────────────────────────────────────────────────

export type PlatformId =
  | "instagram"
  | "danggeun"
  | "naver_cafe"
  | "stray_animal"
  | "custom";

export type ToneStyle = "friendly" | "warm" | "formal" | "informative";

export interface CustomPlatformConfig {
  imageRatio: string;   // 예: "1:1", "16:9", "4:3"
  imageWidth: number;
  imageHeight: number;
  tone: ToneStyle;
  toneDescription: string; // 사용자가 직접 입력한 말투 설명
}

export interface Platform {
  id: PlatformId;
  name: string;
  /** Feather icon component for this platform */
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  imageSize: { width: number; height: number; ratio: string; label: string };
  tone: ToneStyle;
  toneLabel: string;
  description: string;
  /** 아직 지원하지 않는 플랫폼 — 선택 목록에서 비활성으로 표시돼요 */
  disabled?: boolean;
}

// ─── Export ───────────────────────────────────────────────────────────────────

export type ExportFormat = "markdown" | "text" | "json" | "clipboard";

export interface ExportConfig {
  format: ExportFormat;
  platformId?: PlatformId;
}

// ─── Pet / Announcement ───────────────────────────────────────────────────────

export type PetGender = "male" | "female" | "unknown";
export type PetSpecies = "dog" | "cat" | "other";

export type AnnouncementStatus =
  | "draft"      // 작성 중
  | "in_review"  // 검토 대기
  | "published"  // 게시중
  | "closed";    // 마감

/**
 * 백엔드 슬롯 스키마(adoption_slots.schema.json / slots.py)와 1:1 대응.
 *
 * 필수 슬롯 (8)
 *   breed, estimatedAge, gender, neutered, weightKg,
 *   rescueRegion, rescueDate, shelterContact
 *
 * 선택 슬롯 (3)
 *   appearance, healthConditions, personalityNotes
 *
 * 날짜 포맷: "2026-06-30" (ISO 8601 — 백엔드가 APMS "20260630" → 변환)
 */
export interface EstimatedAge {
  value: number;
  unit: "년" | "개월";
}

export interface PetInfo {
  // 식별
  name?: string;
  species: string;              // "dog" | "cat" | "other"

  // ── 필수 슬롯 ──────────────────────────────────────────
  breed?: string;               // breed
  estimatedAge?: EstimatedAge;  // estimated_age {value, unit}
  gender: PetGender;            // sex
  neutered?: boolean;           // is_neutered
  weightKg?: number;            // weight_kg (kg 단위 숫자)
  rescueRegion?: string;        // rescue_region  ← 기존 rescueLocation 대체
  rescueDate?: string;          // rescue_date "2026-06-30"
  shelterContact?: string;      // shelter_contact

  // ── 선택 슬롯 ──────────────────────────────────────────
  appearance?: string;          // appearance (모색/외형 특징)
  healthConditions?: string[];  // health_conditions ["슬개골 탈구", ...]
  personalityNotes?: string;    // personality_notes

  // 레거시/호환 — UI 표시용
  /** @deprecated weightKg 사용 권장. UI 표시용 문자열이 필요할 때만 */
  weight?: string;
  /** @deprecated rescueRegion 사용 권장 */
  rescueLocation?: string;
  vaccinated?: boolean;
  characteristics?: string[];
}

export interface AnnouncementDraft {
  petName: string;
  title: string;
  description: string;
  petInfo: PetInfo;
  representativePhoto?: string;
  platformId?: PlatformId;
  createdAt?: string;
  timeTaken?: string;
}

export interface Announcement {
  id: string;
  status: AnnouncementStatus;
  petInfo: PetInfo;
  title?: string;
  description?: string;
  photos?: string[];
  platformId?: PlatformId;
  /** 연결된 채팅 세션 ID — draft 상태에서 대화 내역 복원에 사용 */
  sessionId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export type MessageRole = "user" | "assistant";
export type MessageType =
  | "text"
  | "voice"
  | "image_group"
  | "pet_info_card"
  | "draft_card"
  | "quick_chips"
  | "fact_badge";

export interface QuickChip {
  label: string;
  value: string;
  selected?: boolean;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  metadata?: {
    voiceDuration?: number;
    imageUrls?: string[];
    aiPickIndex?: number;
    aiConfidence?: number;
    petInfo?: PetInfo;
    draft?: AnnouncementDraft;
    chips?: QuickChip[];
    questionKey?: string;
    totalQuestions?: number;
    currentQuestion?: number;
  };
  createdAt: string;
}

export type ChatStage =
  | "start"
  | "uploading"
  | "processing"
  | "clarifying"
  | "draft_ready"
  | "editing"
  | "publishing"
  | "published";

export interface ChatSession {
  id: string;
  stage: ChatStage;
  announcementId?: string;
  platformId?: PlatformId;
  messages: ChatMessage[];
  createdAt: string;
}
