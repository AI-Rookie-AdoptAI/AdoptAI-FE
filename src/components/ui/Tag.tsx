import type { ReactNode } from "react";

interface TagProps {
  label: string;
  /** accent: 강조 톤 · solid: 진한 강조(accent 배경) · success: 긍정/확인됨(초록) · neutral: 여러 개 나열할 때 쓰는 차분한 톤 */
  tone?: "accent" | "solid" | "success" | "neutral";
  /** sm: kit 원본 스타일(10px, uppercase) · md: 한글 문구가 길 때 쓰는 살짝 더 넉넉한 크기 */
  size?: "sm" | "md";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

const sizeClass = {
  sm: "px-2 py-[6px] text-[10px] uppercase tracking-[0.5px]",
  md: "px-[11px] py-[5px] text-[12px]",
};

const toneClass = {
  accent: "bg-accent-100 text-accent-600",
  solid: "bg-accent-500 text-brand-800",
  success: "bg-confirmed-100 text-confirmed-700",
  neutral: "bg-surface-100 text-brand-450",
};

export default function Tag({ label, tone = "accent", size = "sm", leftIcon, rightIcon, className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-xl font-semibold whitespace-nowrap ${sizeClass[size]} ${toneClass[tone]} ${className}`}
    >
      {leftIcon}
      {label}
      {rightIcon}
    </span>
  );
}
