interface BadgeProps {
  label: string;
  className?: string;
}

export default function Badge({ label, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-[8px] text-[11px] font-semibold whitespace-nowrap ${className}`}
    >
      {label}
    </span>
  );
}
