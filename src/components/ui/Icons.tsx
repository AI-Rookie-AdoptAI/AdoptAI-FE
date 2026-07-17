/**
 * Icons.tsx
 * Feather Icons (https://feathericons.com) — node 1027:7346 in design-system Figma file
 * All Feather icons: viewBox 0 0 24 24, stroke currentColor, fill none,
 * strokeWidth 2, strokeLinecap round, strokeLinejoin round
 *
 * Brand-specific icons (AppIcon, SparkleIcon, VerifiedIcon, WaveformIcon)
 * are kept as custom SVGs since they are not part of Feather.
 */

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const base = {
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// ─── Navigation ───────────────────────────────────────────────────────────────

export function HomeIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function HomeFillIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={color} />
      <polyline points="9 22 9 12 15 12 15 22" stroke="white" />
    </svg>
  );
}

export function BellIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export function BellOffIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
      <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" />
      <path d="M18 8a6 6 0 0 0-9.33-5" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function SettingsIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// ─── Device preview (PC/모바일 토글) ───────────────────────────────────────────

export function MonitorIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function SmartphoneIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <rect x="6" y="1.5" width="12" height="21" rx="2.5" />
      <line x1="11" y1="18.5" x2="13" y2="18.5" />
    </svg>
  );
}

// ─── Chevrons ─────────────────────────────────────────────────────────────────

export function ChevronLeftIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function ChevronUpIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export function CameraIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function MicIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

export function MicOffIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

export function PlusCircleIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

export function MoreHorizIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <circle cx="12" cy="12" r="1" fill={color} />
      <circle cx="19" cy="12" r="1" fill={color} />
      <circle cx="5" cy="12" r="1" fill={color} />
    </svg>
  );
}

export function CheckIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function DownloadIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function EditIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export function TrashIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

export function CopyIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CircleIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export function XIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function UserIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function LogOutIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function InfoIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function MapPinIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function PhoneIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.06-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function MailIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function SearchIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function SendIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export function StoreIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M3 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
      <path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
      <path d="M9 21v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6" />
    </svg>
  );
}

// ─── Pets navigation icon (not in Feather — custom paw) ───────────────────────

export function PetsIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="5.5" cy="8" rx="2" ry="2.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="18.5" cy="8" rx="2" ry="2.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="9.5" cy="5.5" rx="2" ry="2.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="14.5" cy="5.5" rx="2" ry="2.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 13c-4 0-6.5 2-6.5 4.5C5.5 20.5 8 22 12 22s6.5-1.5 6.5-4.5C18.5 15 16 13 12 13z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Brand / AI icons (custom — not in Feather) ───────────────────────────────

/** AI 스파클 — 채팅 아바타, CTA 버튼에 사용 */
export function SparkleIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"
        fill={color}
        strokeLinejoin="round"
      />
      <path d="M5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5L5 3z" fill={color} />
      <path d="M19 15l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5z" fill={color} />
    </svg>
  );
}

/** 인증 뱃지 — 사실 기반 작성 표시 */
export function VerifiedIcon({ size = 16, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2l3.09 1.26L18 2l1.26 3.09L22 6l-1.26 3.09L22 12l-3.09 1.26L18 16.5l-3.09-1.26L12 16.5l-3.09 1.26L6 16.5l-1.26-3.09L2 12l1.26-3.09L2 6l3.09-1.26L6 2l3.09 1.26L12 2z"
        fill={color}
      />
      <polyline points="8.5 12 11 14.5 15.5 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 음성 파형 */
export function WaveformIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="2"  y1="12" x2="2"  y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="6"  y1="8"  x2="6"  y2="16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="4"  x2="10" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="7"  x2="14" y2="17" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="9"  x2="18" y2="15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Platform icons (Feather) ─────────────────────────────────────────────────

export function InstagramIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function MessageCircleIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function CoffeeIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}

export function HeartIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function SlidersIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

export function GlobeIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function TargetIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function HelpCircleIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// ─── Export format icons (Feather) ────────────────────────────────────────────

export function FileTextIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export function FileIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  );
}

export function CodeIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function ClipboardIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} className={className} {...base}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

/** AdoptAI 앱 아이콘 — 손과 두 발바닥 (피그마 node 48:10) */
export function AppIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 433 433" fill="none" className={className}>
      <g clipPath="url(#app-icon-clip)">
        <rect width="433" height="433" rx="40" fill="white" />
        <path d="M-19.1789 -34C-16.402 -33.0815 -6.5745 -25.7572 -3.70205 -23.8126L49.1767 12.2146C55.0856 16.1701 61.687 21.4478 67.7442 24.8457C76.6894 29.2448 88.8117 31.766 98.6927 32.964C130.605 36.8326 160.677 48.0992 182.56 72.5696C189.964 80.8504 205.358 101.855 193.415 112.252C203.998 121.992 215.151 135.803 216.143 150.733C218.763 171.208 191.682 162.525 183.434 170.243C172.732 180.257 181.954 205.565 158.147 206.067C148.78 205.208 141.571 202.94 133.727 197.68C131.965 196.499 129.911 195.174 128.521 193.584C127.867 194.764 127.016 196.518 126.235 197.553C118.556 207.736 102.159 201.997 92.6715 198.328C64.2676 187.345 41.6739 167.567 24.8312 142.393C21.9933 138.144 19.3287 133.781 16.8444 129.316C14.9614 125.913 9.73386 114.634 7.55916 112.499C4.79221 109.781 1.28319 107.572 -1.83214 105.258L-18.2397 93.0793C-36.5799 79.5843 -55.3262 65.8708 -73.4455 52.1518C-60.7045 31.6341 -47.8405 11.193 -34.8546 -9.17036C-30.0371 -16.8223 -23.4946 -26.396 -19.1789 -34ZM74.6882 134.937C79.355 134.792 84.0225 134.278 88.6796 133.935C99.5011 133.139 112.991 132.893 121.033 124.452C125.238 120.038 127.754 113.568 127.576 107.483C127.255 96.514 117.828 62.7049 109.799 55.1945C105.03 50.7338 98.4913 47.6359 91.8815 47.637C85.5247 48.1977 79.2837 49.5934 75.0459 54.8459C69.0639 62.5662 69.2451 70.97 63.6639 79.2507C55.8506 90.842 41.5157 89.7531 36.8504 103.582C33.8308 112.53 35.876 122.383 43.3337 128.514C52.35 135.926 63.6149 135.964 74.6882 134.937ZM132.691 138.192C128.76 138.907 125.642 139.406 123.141 142.986C120.546 146.702 120.618 150.863 121.419 155.113C124.473 171.3 142.139 190.911 160.093 188.661C177.003 185.151 173.209 169.29 165.002 159.463C157.694 150.712 144.479 138.928 132.691 138.192ZM177.167 153.62C208.684 158.574 200.362 115.926 160.359 110.779C151.386 110.017 142.102 111.879 140.964 122.953C140.455 127.913 144.139 133.342 147.42 136.793C155.837 144.842 165.967 150.69 177.167 153.62ZM103.802 186.907C105.554 186.952 107.057 187.01 108.792 186.706C114.812 185.65 118.76 179.222 118.514 173.313C117.953 159.849 108.813 145.18 95.2384 141.694C93.5916 141.271 90.9809 141.054 89.2623 140.891C85.1421 141.531 79.2994 142.906 76.9242 146.664C67.7298 161.214 83.3463 179.828 96.7066 185.053C98.3441 185.693 102.233 186.882 103.802 186.907ZM163.201 104.59C185.016 102.948 182.097 85.7553 168.954 75.298C164.184 71.5023 155.144 66.9257 149.001 67.5176C132.1 66.9381 127.872 83.1988 138.749 93.8196C145.446 100.359 153.95 103.868 163.201 104.59Z" fill="#EFAE53" />
        <path d="M478.991 -4.0367C480.329 -3.48785 527.655 78.7336 532.672 86.8258C506.835 102.646 481.48 119.346 455.912 135.599C451.404 138.463 427.124 153.129 425.093 155.562C420.265 161.352 416.06 167.651 411.164 173.397C393.882 193.68 371.589 211.551 345.569 218.933C341.347 220.116 337.02 220.873 332.649 221.192C330.845 221.325 325.562 221.41 324.219 221.904C318.531 224 312.742 226.241 306.934 228.086C307.209 224.36 307.34 221.613 308.095 217.932C299.056 220.281 293.937 219.498 284.782 217.308C283.17 216.923 280.022 215.38 278.711 215.604C274.595 216.309 270.473 218.018 266.228 219.053C264.751 219.66 260.741 219.947 259.134 220.051C260.025 213.419 262.246 209.741 265.424 203.836C256.442 201.32 251.265 197.077 246.075 189.389C241.548 191.001 233.503 193.097 228.833 193.914C229.343 187.323 233.481 181.742 236.951 176.087C230.788 164.573 233.795 152.551 239.258 141.602C234.894 142.909 230.525 144.193 226.145 145.454C226.278 144.708 226.435 143.966 226.614 143.229C229.252 132.693 238.229 126.028 244.555 118.397C248.624 113.077 252.529 107.903 257.38 103.22C280.883 80.5269 314.292 72.8423 345.515 67.5882C352.051 66.489 361.42 66.5502 367.267 64.1415C370.895 62.6471 376.894 58.4402 380.519 56.1943L401.256 43.5668L478.991 -4.0367ZM304.881 186.817C334.412 181.132 342.23 147.739 313.94 152.023C304.954 154.355 294.677 159.36 289.862 167.564C282.49 180.134 292.282 188.878 304.881 186.817ZM308.451 115.371C331.413 112.567 337.644 86.6946 315.369 88.2522C308.904 89.2883 300.959 91.689 297.05 97.4862C289.815 108.208 296.173 116.488 308.451 115.371ZM352.987 89.0001C341.028 92.0824 337.705 102.688 333.116 112.652C331.534 116.08 328.464 119.445 326.707 122.832C321.697 132.228 325.062 141.7 333.958 147.045C340.576 151.024 346.396 149.287 353.519 151.128C357.841 152.291 362.655 154.758 366.904 156.415C384.686 163.302 398.963 147.899 392.115 130.455C389.565 123.967 386.679 120.242 383.826 114.385C377.703 101.812 370.283 85.3214 352.987 89.0001ZM265.063 215.061L270.143 213.213C276.628 210.857 282.82 207.762 288.594 203.988C287.707 202.269 284.063 196.497 282.474 195.822L281.856 195.888C274.064 200.812 268.513 206.241 265.063 215.061ZM316.519 220.23C323.213 216.439 327.078 213.298 332.593 207.882C331.552 206.357 328.812 201.552 327.104 201.663C318.514 208.476 315.842 211.973 312.362 222.521C313.715 221.734 315.1 220.876 316.519 220.23ZM348.011 190.983C371.737 185.672 376.022 157.996 352.753 161.558C345.908 163.928 337.804 167.617 334.742 174.547C329.431 186.567 336.227 192.952 348.011 190.983ZM256.56 177.924C255.693 176.511 252.229 170.788 251.288 170.072C244.962 174.836 238.465 180.432 235.435 188.039C236.666 187.491 238.022 186.848 239.265 186.361C245.095 184.371 251.026 180.833 256.56 177.924ZM250.338 124.294C241.37 127.909 237.363 131.346 232.379 139.401L237.173 137.578C244.24 135.175 249.233 133.428 256.522 132.003C255.473 130.095 253.061 125.272 251.411 124.242C251.237 124.247 250.481 124.262 250.338 124.294ZM290.025 153.399C299.992 151.478 313.797 143.767 311.514 131.673C310.956 128.619 309.187 125.921 306.608 124.194C302.903 121.736 297.047 121.1 292.726 121.929C265.247 127.564 263.013 157.515 290.025 153.399Z" fill="#888888" />
        <path d="M200.626 178.687C213.538 176.389 220.954 188.793 222.269 199.827C224.768 220.794 223.993 241.777 224.993 262.814C225.223 267.677 224.759 273.587 225.435 278.305L230.774 278.803C230.496 274.348 230.635 268.349 230.499 263.669L229.372 216.653C261.571 213.87 258.04 232.181 260.283 256.854C260.655 260.952 261.107 265.219 261.498 269.353C261.927 273.861 261.987 278.856 262.675 283.271L262.741 283.663C264.868 283.934 265.67 284.091 267.743 284.681C267.452 282.848 267.323 280.753 267.245 278.879C266.629 264.575 264.84 250.36 264.054 236.078C291.831 235.475 291.399 255.026 292.519 276.459L293.712 296.322C295.302 297 297.016 297.584 298.648 298.174C297.58 288.348 296.946 271.069 296.978 261.249C307.83 263.247 312.815 267.087 315.021 278.238C316.394 285.187 316.567 292.106 316.577 299.188C316.621 328.442 311.402 358.939 299.638 385.81C296.817 392.185 292.677 397.429 288.916 403.15C288.66 414.645 288.941 427.327 288.989 438.898C289.026 445.998 289.411 458.332 288.849 465.088C252.331 465.325 214.302 465.492 177.832 465.066C177.534 458.67 177.838 450.819 177.869 444.297L177.783 415.588C177.806 410.452 178.042 403.547 177.656 398.473C177.572 397.372 172.015 391.844 170.869 390.626C161.944 381.033 154.692 370.008 149.413 358.014C141.748 340.824 140.431 323.715 134.93 306.167C132.505 298.503 129.837 290.914 126.932 283.416C123.182 273.735 115.138 260.06 125.272 251.887C144.422 236.447 167.429 257.57 171.532 276.733C174.168 289.049 168.566 304.432 173.24 316.662C174.248 319.303 176.011 321.471 177.806 323.566C177.768 316.539 177.436 309.408 177.453 302.403C177.505 275.31 178.673 248.23 180.955 221.234C181.904 211.044 182.12 196.833 187.186 187.617C189.99 182.514 195.08 180.069 200.626 178.687ZM192.222 219.973C196.669 219.556 199.758 219.595 204.203 219.551C207.368 219.477 210.534 219.447 213.699 219.461C213.614 210.826 215.621 185.599 202.438 186.278C202.235 186.289 202.032 186.303 201.829 186.319C198.921 187.14 196.92 188.165 195.453 191.081C191.494 198.949 192.201 211.23 192.222 219.973ZM140.729 287.209C143.4 284.331 145.816 281.223 145.606 277.036C145.259 270.144 139.218 257.725 131.364 257.838C125.655 259.359 128.563 265.588 130.237 269.289C131.22 271.463 132.714 275.465 133.937 277.339C136.197 280.807 137.155 285.073 139.025 288.358C139.817 288.386 140.212 287.847 140.729 287.209Z" fill="#FFE1C2" />
      </g>
      <defs>
        <clipPath id="app-icon-clip">
          <rect width="433" height="433" rx="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

