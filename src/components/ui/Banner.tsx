import type { ReactNode } from "react";

interface BannerProps {
  title?: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  /** 강조가 필요한 경고성 배너일 때 true — accent 대신 destructive 톤을 써요 */
  tone?: "accent" | "neutral" | "success";
  className?: string;
}

const toneClass = {
  accent: "bg-accent-100 text-accent-600",
  neutral: "bg-surface-100 text-brand-500",
  success: "bg-green-100 text-green-700",
};

export default function Banner({ title, description, icon, action, tone = "accent", className = "" }: BannerProps) {
  return (
    <div className={`flex items-start gap-3 rounded-2xl px-4 py-3.5 ${toneClass[tone]} ${className}`}>
      {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div>
          {title && <p className="text-[13px] font-bold text-brand-800">{title}</p>}
          <p className="text-[11.5px] font-semibold leading-[1.5]">{description}</p>
        </div>
        {action}
      </div>
    </div>
  );
}
