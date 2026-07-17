import type { ChatMessage, AnnouncementDraft } from "@/lib/types";
import { SparkleIcon, VerifiedIcon, WaveformIcon } from "@/components/ui/Icons";
import Tag from "@/components/ui/Tag";

interface ChatBubbleProps {
  message: ChatMessage;
  onChipSelect?: (questionKey: string, value: string) => void;
  onPublish?: (draft: AnnouncementDraft) => void;
  onEditDraft?: () => void;
}

function parseMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>{line}{j < arr.length - 1 ? <br /> : null}</span>
    ));
  });
}

export default function ChatBubble({ message, onChipSelect, onPublish, onEditDraft }: ChatBubbleProps) {
  const { role, type, content, metadata } = message;

  if (type === "voice") {
    return (
      <div className="flex justify-end">
        <div className="flex items-center gap-2 bg-brand-500 px-3.5 py-2.5 rounded-[20px]">
          <WaveformIcon size={18} color="white" />
          <span className="text-[13px] font-semibold text-white">{content}</span>
        </div>
      </div>
    );
  }

  if (type === "image_group") {
    const imgs = metadata?.imageUrls ?? [];
    return (
      <div className="flex justify-end">
        <div className="flex flex-col gap-1.5 items-end max-w-[300px]">
          <div className="flex gap-1.5">
            {imgs.slice(0, 2).map((url, i) => (
              <div key={i} className="w-[58px] h-[58px] rounded-[14px] overflow-hidden bg-brand-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {imgs.length > 2 && (
              <div className="w-[58px] h-[58px] rounded-[14px] bg-surface-100 flex items-center justify-center">
                <span className="text-[13px] font-bold text-brand-300">+{imgs.length - 2}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="bg-brand-500 px-4 py-2.5 rounded-[20px] rounded-br-[6px] max-w-[80%]">
          <p className="text-[14px] font-semibold text-white leading-snug">{content}</p>
        </div>
      </div>
    );
  }

  // ── Assistant messages ──────────────────────────────────────────────────────

  if (type === "text") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-end gap-2 max-w-[90%]">
          <AIAvatar />
          <div className="bg-surface-50 border border-brand-75 px-4 py-3 rounded-[20px] rounded-tl-[6px]">
            <p className="text-[14px] text-brand-700 leading-[1.55]">
              {parseMarkdown(content)}
            </p>
          </div>
        </div>
        <FactBadge />
      </div>
    );
  }

  if (type === "pet_info_card" && metadata?.petInfo) {
    const pi = metadata.petInfo;
    const genderLabel = pi.gender === "male" ? "수컷" : pi.gender === "female" ? "암컷" : null;
    const ageLabel = pi.estimatedAge
      ? `${pi.estimatedAge.value}${pi.estimatedAge.unit}`
      : null;
    const weightLabel = pi.weightKg != null ? `${pi.weightKg}kg` : null;

    const tags = [
      pi.breed,
      ageLabel,
      genderLabel,
      weightLabel,
      pi.appearance,
      ...(pi.healthConditions ?? []),
    ].filter(Boolean) as string[];

    return (
      <div className="flex items-start gap-2 max-w-[90%]">
        <div className="w-[30px] shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-[13.5px] text-brand-700 leading-snug">{content}</p>
          <div className="bg-surface-50 border border-brand-75 rounded-2xl p-[15px]">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, i) => {
                const isGreen = (pi.healthConditions ?? []).some(
                  (c) => c === tag && c.includes("음성")
                );
                return <Tag key={i} label={tag} size="md" tone={isGreen ? "success" : "neutral"} />;
              })}
            </div>
            {/* 검사 음성 태그가 있을 때만 verified 배지 표시 */}
            {(pi.healthConditions ?? []).filter((c) => c.includes("음성")).map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 mt-2">
                <VerifiedIcon size={14} color="#4e6443" />
                <span className="text-[11.5px] font-semibold text-green-700">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "quick_chips" && metadata?.chips) {
    return (
      <div className="flex flex-col gap-2.5">
        <div className="flex items-start gap-2">
          <AIAvatar />
          <div className="bg-surface-50 border border-brand-75 px-4 py-3.5 rounded-[20px] rounded-tl-[6px] flex flex-col gap-1">
            <p className="text-[14px] font-bold text-brand-800">{content}</p>
            <p className="text-[12.5px] text-brand-300">음성 메모에 없어서 확인할게요</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 pl-[39px]">
          {metadata.chips.map((chip) => (
            <button
              key={chip.value}
              onClick={() => onChipSelect?.(metadata.questionKey!, chip.value)}
              className="px-4 py-2.5 rounded-full text-[13px] font-bold border border-brand-150 bg-surface-50 text-brand-600 hover:bg-brand-50 active:bg-brand-500 active:text-white transition-colors"
            >
              {chip.label}
            </button>
          ))}
        </div>
        <div className="pl-[39px]">
          <FactBadge text="확실하지 않은 정보는 추측하지 않아요" />
        </div>
      </div>
    );
  }

  if (type === "draft_card" && metadata?.draft) {
    return (
      <div className="flex flex-col gap-2.5">
        <div className="flex items-end gap-2">
          <AIAvatar />
          <div className="bg-surface-50 border border-brand-75 px-4 py-3 rounded-[20px] rounded-tl-[6px]">
            <p className="text-[13.5px] text-brand-700">{content}</p>
          </div>
        </div>
        <div className="pl-[39px]">
          <DraftCard draft={metadata.draft} onPublish={onPublish} onEdit={onEditDraft} />
        </div>
      </div>
    );
  }

  return null;
}

function AIAvatar() {
  return (
    <div className="w-[30px] h-[30px] bg-brand-500 rounded-[15px] flex items-center justify-center shrink-0 self-end">
      <SparkleIcon size={14} color="white" />
    </div>
  );
}

function FactBadge({ text = "들은 사실만 공고에 담아요" }: { text?: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-green-100 px-3 py-2 rounded-[12px] self-start ml-[39px]">
      <VerifiedIcon size={14} color="#4e6443" />
      <span className="text-[11.5px] font-semibold text-green-700">{text}</span>
    </div>
  );
}

function DraftCard({
  draft,
  onPublish,
  onEdit,
}: {
  draft: AnnouncementDraft;
  onPublish?: (d: AnnouncementDraft) => void;
  onEdit?: () => void;
}) {
  const { title, description, petInfo } = draft;

  return (
    <div className="bg-surface-50 border border-brand-75 rounded-[20px] overflow-hidden shadow-[0_6px_16px_-8px_rgba(40,28,18,0.18)]">
      <div className="w-full h-[180px] bg-gradient-to-br from-[#e7d6c0] to-[#cbae89] relative flex items-end p-3">
        <span className="bg-brand-800/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
          대표 사진
        </span>
      </div>

      <div className="px-3.5 pt-[13px] pb-3.5 flex flex-col gap-2">
        <p className="text-[16px] font-extrabold text-brand-800 leading-snug tracking-tight">{title}</p>
        <p className="text-[12.5px] text-brand-450 leading-[1.6]">{description}</p>

        <div className="border-t border-brand-25 pt-3 flex flex-col gap-2">
          {[
            {
              label: "성별 · 중성화",
              value: `${petInfo.gender === "male" ? "수컷" : petInfo.gender === "female" ? "암컷" : "미상"} · ${petInfo.neutered === true ? "완료" : petInfo.neutered === false ? "안 함" : "미상"}`,
            },
            {
              label: "나이 · 체중",
              value: `${petInfo.estimatedAge ? `${petInfo.estimatedAge.value}${petInfo.estimatedAge.unit}` : "미상"} · ${petInfo.weightKg != null ? `${petInfo.weightKg}kg` : "미상"}`,
            },
            { label: "건강", value: petInfo.healthConditions?.join(" · ") ?? "특이사항 없음" },
            {
              label: "구조",
              value: `${petInfo.rescueRegion ?? petInfo.rescueLocation ?? ""}${petInfo.rescueDate ? ` · ${petInfo.rescueDate}` : ""}`,
            },
          ].filter(({ value }) => value.trim() !== " · ").map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-2">
              <span className="text-[12.5px] text-brand-300 shrink-0">{label}</span>
              <span className="text-[12.5px] font-semibold text-brand-700 text-right">{value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_1.4fr] gap-2 pt-1.5">
          <button
            onClick={onEdit}
            className="py-3 rounded-xl border border-brand-150 text-[13px] font-bold text-brand-600 hover:bg-brand-50 transition-colors"
          >
            수정 요청
          </button>
          <button
            onClick={() => onPublish?.(draft)}
            className="py-3 rounded-xl bg-accent-500 text-[14px] font-extrabold text-brand-800 hover:bg-accent-600 transition-colors"
          >
            플랫폼 선택
          </button>
        </div>
      </div>
    </div>
  );
}
