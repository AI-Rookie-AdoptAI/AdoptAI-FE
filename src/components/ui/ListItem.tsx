"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Toggle from "@/components/ui/Toggle";
import { ChevronRightIcon } from "@/components/ui/Icons";

type Control =
  | { type: "chevron" }
  | { type: "toggle"; checked: boolean; onChange: (v: boolean) => void }
  | { type: "badge"; label: string }
  | { type: "value"; text: string }
  | { type: "none" };

interface ListItemProps {
  title: string;
  description?: string;
  /** 왼쪽 아이콘/아바타. 아이콘이면 사각형 배지, 아바타면 원형으로 감싸요 */
  icon?: ReactNode;
  iconVariant?: "icon" | "avatar";
  control?: Control;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function ListItem({
  title,
  description,
  icon,
  iconVariant = "icon",
  control = { type: "chevron" },
  href,
  onClick,
  className = "",
}: ListItemProps) {
  const content = (
    <>
      {icon && (
        <div
          className={`shrink-0 w-10 h-10 flex items-center justify-center text-accent-600 ${
            iconVariant === "avatar" ? "rounded-2xl bg-accent-100" : "rounded-xl bg-accent-100"
          }`}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-brand-800 truncate">{title}</p>
        {description && <p className="text-[12px] text-brand-400 mt-0.5 truncate">{description}</p>}
      </div>
      {control.type === "chevron" && <ChevronRightIcon size={18} color="#cbb9a3" />}
      {control.type === "toggle" && <Toggle checked={control.checked} onChange={control.onChange} />}
      {control.type === "badge" && (
        <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-accent-500 text-brand-800 text-[10px] font-bold flex items-center justify-center">
          {control.label}
        </span>
      )}
      {control.type === "value" && (
        <span className="text-[13px] text-brand-400 shrink-0">{control.text}</span>
      )}
    </>
  );

  const rowClass = `flex items-center gap-3.5 px-4 py-3.5 ${className}`;

  if (href) {
    return (
      <Link href={href} className={`${rowClass} hover:bg-brand-50 transition-colors`}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${rowClass} w-full text-left hover:bg-brand-50 transition-colors`}>
        {content}
      </button>
    );
  }

  return <div className={rowClass}>{content}</div>;
}
