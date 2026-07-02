import type { AnnouncementStatus, Platform, ExportFormat } from "./types";

export const ANNOUNCEMENT_STATUS_LABEL: Record<AnnouncementStatus, string> = {
  draft: "작성 중",
  in_review: "검토 대기",
  published: "게시중",
  closed: "마감",
};

export const ANNOUNCEMENT_STATUS_COLOR: Record<AnnouncementStatus, string> = {
  draft: "bg-brand-100 text-brand-500",
  in_review: "bg-green-500/15 text-green-700",
  published: "bg-green-500/15 text-green-700",
  closed: "bg-brand-100 text-brand-300",
};

export const PLATFORMS: Platform[] = [
  {
    id: "instagram",
    name: "인스타그램",
    emoji: "📸",
    imageSize: { width: 1080, height: 1080, ratio: "1:1", label: "정사각형 1080×1080" },
    tone: "friendly",
    toneLabel: "감성적·친근한",
    description: "해시태그 최적화, 짧고 감성적인 문체",
  },
  {
    id: "kakao",
    name: "카카오 오픈채팅",
    emoji: "💬",
    imageSize: { width: 1200, height: 675, ratio: "16:9", label: "가로형 1200×675" },
    tone: "warm",
    toneLabel: "따뜻하고 일상적인",
    description: "이웃에게 말하듯 편안한 말투",
  },
  {
    id: "naver_cafe",
    name: "네이버 카페",
    emoji: "☕",
    imageSize: { width: 800, height: 600, ratio: "4:3", label: "표준 800×600" },
    tone: "informative",
    toneLabel: "정보 중심·체계적인",
    description: "정보 위주, 표 형식 건강 정보 포함",
  },
  {
    id: "poinhand",
    name: "포인핸드",
    emoji: "🐾",
    imageSize: { width: 800, height: 800, ratio: "1:1", label: "정사각형 800×800" },
    tone: "formal",
    toneLabel: "공식·정확한",
    description: "입양 플랫폼 표준 양식, 항목별 기재",
  },
  {
    id: "custom",
    name: "직접 설정",
    emoji: "✏️",
    imageSize: { width: 1080, height: 1080, ratio: "1:1", label: "자유 설정" },
    tone: "friendly",
    toneLabel: "직접 선택",
    description: "이미지 비율과 말투를 직접 설정해요",
  },
];

export const EXPORT_FORMATS: { id: ExportFormat; label: string; description: string; icon: string }[] = [
  {
    id: "markdown",
    label: "Markdown (.md)",
    description: "Notion, GitHub 등에 바로 붙여넣기",
    icon: "M",
  },
  {
    id: "text",
    label: "일반 텍스트 (.txt)",
    description: "어떤 편집기에서도 열 수 있어요",
    icon: "T",
  },
  {
    id: "json",
    label: "JSON (.json)",
    description: "시스템 연동, 데이터 백업용",
    icon: "{}",
  },
  {
    id: "clipboard",
    label: "클립보드 복사",
    description: "바로 붙여넣기 — 파일 저장 없음",
    icon: "📋",
  },
];

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
