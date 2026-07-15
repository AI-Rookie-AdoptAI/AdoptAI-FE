import type { AnnouncementStatus, Platform, ExportFormat } from "./types";
import type { ComponentType } from "react";
import {
  InstagramIcon,
  StoreIcon,
  CoffeeIcon,
  PetsIcon,
  SlidersIcon,
  FileTextIcon,
  FileIcon,
  CodeIcon,
  ClipboardIcon,
} from "@/components/ui/Icons";

/** 대표 사진이 없을 때 카드에 쓰는 플레이스홀더 그라데이션 — hashIndex(id, length)로 골라요 */
export const PET_PHOTO_GRADIENTS = [
  "from-[#eadccb] to-[#d6c1a6]",
  "from-[#e8e0d0] to-[#cfbe9e]",
  "from-[#e7d6c0] to-[#cbae89]",
  "from-[#e6dcc8] to-[#d2b891]",
];

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
    icon: InstagramIcon,
    imageSize: { width: 1080, height: 1080, ratio: "1:1", label: "정사각형 1080×1080" },
    tone: "friendly",
    toneLabel: "감성적 짧은 글 · 해시태그",
    description: "해시태그 최적화, 짧고 감성적인 문체",
  },
  {
    id: "danggeun",
    name: "당근 동네생활",
    icon: StoreIcon,
    imageSize: { width: 1200, height: 900, ratio: "4:3", label: "가로형 1200×900" },
    tone: "warm",
    toneLabel: "친근한 존댓말 · 동네 강조",
    description: "이웃에게 말하듯 편안한 말투",
  },
  {
    id: "naver_cafe",
    name: "네이버 카페",
    icon: CoffeeIcon,
    imageSize: { width: 1000, height: 1250, ratio: "4:5", label: "세로형 1000×1250" },
    tone: "informative",
    toneLabel: "정보 중심 · 격식체 긴 글",
    description: "정보 위주, 표 형식 건강 정보 포함",
  },
  {
    id: "stray_animal",
    name: "유기동물 공고",
    icon: PetsIcon,
    imageSize: { width: 0, height: 0, ratio: "표", label: "항목 표 형식" },
    tone: "formal",
    toneLabel: "항목 표 · 공식 톤",
    description: "입양 플랫폼 표준 양식, 항목별 기재",
    disabled: true,
  },
  {
    id: "custom",
    name: "직접 설정",
    icon: SlidersIcon,
    imageSize: { width: 1080, height: 1080, ratio: "1:1", label: "자유 설정" },
    tone: "friendly",
    toneLabel: "직접 선택",
    description: "이미지 비율과 말투를 직접 설정해요",
  },
];

type IconComponent = ComponentType<{ size?: number; color?: string; className?: string }>;

export const EXPORT_FORMATS: {
  id: ExportFormat;
  label: string;
  description: string;
  icon: IconComponent;
}[] = [
  {
    id: "markdown",
    label: "Markdown (.md)",
    description: "Notion, GitHub 등에 바로 붙여넣기",
    icon: FileTextIcon,
  },
  {
    id: "text",
    label: "일반 텍스트 (.txt)",
    description: "어떤 편집기에서도 열 수 있어요",
    icon: FileIcon,
  },
  {
    id: "json",
    label: "JSON (.json)",
    description: "시스템 연동, 데이터 백업용",
    icon: CodeIcon,
  },
  {
    id: "clipboard",
    label: "클립보드 복사",
    description: "바로 붙여넣기 — 파일 저장 없음",
    icon: ClipboardIcon,
  },
];

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
