import type { Announcement } from "@/lib/types";
import { ANNOUNCEMENT_STATUS_LABEL, ANNOUNCEMENT_STATUS_COLOR } from "@/lib/constants";
import { ChevronRightIcon } from "@/components/ui/Icons";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

interface AnnouncementCardProps {
  announcement: Announcement;
}

const petGradients: Record<string, string> = {
  "1": "from-[#eadccb] to-[#d6c1a6]",
  "2": "from-[#e8e0d0] to-[#cfbe9e]",
  "3": "from-[#e7d6c0] to-[#cbae89]",
  "4": "from-[#e6dcc8] to-[#d2b891]",
};

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const { id, status, petInfo, photos, title } = announcement;
  const gradient = petGradients[id] ?? "from-[#eadccb] to-[#d6c1a6]";

  return (
    <Link
      href={`/announcements/${id}`}
      className="flex items-center gap-3 bg-surface-50 rounded-[18px] px-[13px] py-[13px] border border-brand-75 hover:bg-surface-100 transition-colors"
    >
      <div className="w-[54px] h-[54px] rounded-[14px] shrink-0 overflow-hidden">
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
          {petInfo.breed ?? petInfo.species} · {petInfo.gender === "male" ? "수컷" : petInfo.gender === "female" ? "암컷" : "미상"}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <Badge
          label={ANNOUNCEMENT_STATUS_LABEL[status]}
          className={ANNOUNCEMENT_STATUS_COLOR[status]}
        />
        <ChevronRightIcon size={20} color="#cbb9a3" />
      </div>
    </Link>
  );
}
