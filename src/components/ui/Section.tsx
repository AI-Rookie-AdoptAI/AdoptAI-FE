import type { ReactNode } from "react";

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/** ListItem들을 hairline divider로 구분해 하나의 카드로 묶어요 */
export default function Section({ title, children, className = "" }: SectionProps) {
  return (
    <div className={className}>
      {title && (
        <p className="text-[12px] font-bold text-brand-300 uppercase tracking-wide mb-2 px-0.5">{title}</p>
      )}
      <div className="bg-surface-50 border border-brand-75 rounded-2xl overflow-hidden divide-y divide-brand-25">
        {children}
      </div>
    </div>
  );
}
