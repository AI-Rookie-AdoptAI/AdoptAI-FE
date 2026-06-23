import type { AnnouncementStatus } from "./types";

export const ANNOUNCEMENT_STATUS_LABEL: Record<AnnouncementStatus, string> = {
  draft: "작성 중",
  in_review: "검토 대기",
  published: "최근 게시",
  closed: "마감",
};

export const ANNOUNCEMENT_STATUS_COLOR: Record<AnnouncementStatus, string> = {
  draft: "bg-brand-100 text-brand-500",
  in_review: "bg-surface-100 text-brand-400",
  published: "bg-green-500/10 text-green-700",
  closed: "bg-brand-100 text-brand-300",
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
