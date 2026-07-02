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
  | "kakao"
  | "naver_cafe"
  | "poinhand"
  | "custom";

export type ToneStyle = "friendly" | "warm" | "formal" | "informative";

export interface Platform {
  id: PlatformId;
  name: string;
  emoji: string;
  imageSize: { width: number; height: number; ratio: string; label: string };
  tone: ToneStyle;
  toneLabel: string;
  description: string;
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

export interface PetInfo {
  name?: string;
  species: string;
  breed?: string;
  gender: PetGender;
  estimatedAge?: string;
  weight?: string;
  color?: string;
  healthConditions?: string[];
  neutered?: boolean;
  vaccinated?: boolean;
  characteristics?: string[];
  rescueLocation?: string;
  rescueDate?: string;
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
