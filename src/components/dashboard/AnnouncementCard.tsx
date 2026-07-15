import type { Announcement } from "@/lib/types";
import { ANNOUNCEMENT_STATUS_LABEL, ANNOUNCEMENT_STATUS_COLOR, PET_PHOTO_GRADIENTS } from "@/lib/constants";
import { ChevronRightIcon, MoreHorizIcon } from "@/components/ui/Icons";
import { hashIndex } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

interface AnnouncementCardProps {
  announcement: Announcement;
  onMore?: (announcement: Announcement) => void;
}

export default function AnnouncementCard({ announcement, onMore }: AnnouncementCardProps) {
  const { id, status, petInfo, photos, title, sessionId } = announcement;
  const gradient = PET_PHOTO_GRADIENTS[hashIndex(id, PET_PHOTO_GRADIENTS.length)];

  // draft → 채팅 세션으로 복귀 / 나머지 → 상세 페이지
  const href =
    status === "draft"
      ? `/chat${sessionId ? `?session=${sessionId}` : ""}`
      : `/announcements/${id}`;

  return (
    <Link
      href={href}
      className="flex items-center gap-3 bg-surface-50 rounded-2xl px-[13px] py-[13px] border border-brand-75 hover:bg-surface-100 transition-colors"
    >
      <div className="w-[54px] h-[54px] rounded-xl shrink-0 overflow-hidden">
        {photos?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photos[0]} alt={petInfo.name ?? petInfo.breed ?? petInfo.species} className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-bold text-brand-800 truncate">
          {title ?? petInfo.name ?? petInfo.breed}
        </p>
        <p className="text-[12px] text-brand-300 mt-0.5 truncate">
          {petInfo.breed ?? petInfo.species}
          {petInfo.gender !== "unknown" && ` · ${petInfo.gender === "male" ? "수컷" : "암컷"}`}
          {petInfo.estimatedAge && ` · ${petInfo.estimatedAge.value}${petInfo.estimatedAge.unit}`}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <Badge
          label={ANNOUNCEMENT_STATUS_LABEL[status]}
          className={ANNOUNCEMENT_STATUS_COLOR[status]}
        />
        {onMore ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onMore(announcement);
            }}
            aria-label="더보기"
            className="w-6 h-6 flex items-center justify-center text-brand-200 hover:text-brand-500 transition-colors -mr-1"
          >
            <MoreHorizIcon size={18} color="currentColor" />
          </button>
        ) : (
          <ChevronRightIcon size={20} color="#cbb9a3" />
        )}
      </div>
    </Link>
  );
}
