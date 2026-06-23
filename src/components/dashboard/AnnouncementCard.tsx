import type { Announcement } from "@/lib/types";
import {
  ANNOUNCEMENT_STATUS_LABEL,
  ANNOUNCEMENT_STATUS_COLOR,
} from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

interface AnnouncementCardProps {
  announcement: Announcement;
}

const genderLabel = { male: "수컷", female: "암컷", unknown: "미상" };

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const { id, status, petInfo, photos } = announcement;

  return (
    <Link
      href={`/announcements/${id}`}
      className="flex items-center gap-4 bg-surface-50 rounded-2xl px-4 py-3.5 border border-brand-100 active:bg-brand-50 transition-colors"
    >
      <div className="w-14 h-14 rounded-xl bg-brand-100 shrink-0 overflow-hidden">
        {photos?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photos[0]}
            alt={petInfo.breed ?? petInfo.species}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-300 text-2xl">
            🐾
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-brand-800 truncate">
          {petInfo.breed ?? petInfo.species} · {genderLabel[petInfo.gender]}
        </p>
        {petInfo.estimatedAge && (
          <p className="text-[13px] text-brand-400 mt-0.5">
            {petInfo.estimatedAge}
            {petInfo.weight ? ` · ${petInfo.weight}` : ""}
          </p>
        )}
      </div>

      <Badge
        label={ANNOUNCEMENT_STATUS_LABEL[status]}
        className={ANNOUNCEMENT_STATUS_COLOR[status]}
      />
    </Link>
  );
}
