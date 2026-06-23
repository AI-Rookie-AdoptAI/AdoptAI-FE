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

// ─── Pet / Announcement ───────────────────────────────────────────────────────

export type PetGender = "male" | "female" | "unknown";
export type PetSpecies = "dog" | "cat" | "other";

export type AnnouncementStatus =
  | "draft"       // 작성 중
  | "in_review"   // 검토 대기
  | "published"   // 최근 게시
  | "closed";

export interface PetInfo {
  species: string;
  breed?: string;
  gender: PetGender;
  estimatedAge?: string;
  weight?: string;
  healthConditions?: string[];
  neutered?: boolean;
  vaccinated?: boolean;
  characteristics?: string[];
}

export interface Announcement {
  id: string;
  status: AnnouncementStatus;
  petInfo: PetInfo;
  photos?: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type MessageRole = "user" | "assistant";
export type MessageType =
  | "text"
  | "voice"
  | "image"
  | "pet_info_card"
  | "confirmation_question";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  metadata?: {
    voiceDuration?: number;       // seconds
    imageUrl?: string;
    petInfo?: PetInfo;
    confidence?: number;          // 0–1 (AI 추천 %)
    questionIndex?: number;
    totalQuestions?: number;
  };
  createdAt: string;
}

export interface ChatSession {
  id: string;
  announcementId?: string;
  messages: ChatMessage[];
  status: "active" | "completed";
  createdAt: string;
}
