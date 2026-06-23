import type { PetInfo } from "@/lib/types";

interface PetInfoCardProps {
  petInfo: PetInfo;
  confidence?: number;
}

const infoRows = (petInfo: PetInfo) => [
  { label: "품종", value: petInfo.breed ?? petInfo.species },
  { label: "나이", value: petInfo.estimatedAge },
  { label: "체중", value: petInfo.weight },
  { label: "건강", value: petInfo.healthConditions?.join(", ") },
  { label: "중성화", value: petInfo.neutered == null ? undefined : petInfo.neutered ? "완료" : "미완료" },
  { label: "접종", value: petInfo.vaccinated == null ? undefined : petInfo.vaccinated ? "완료" : "미완료" },
].filter((r) => r.value);

export default function PetInfoCard({ petInfo, confidence }: PetInfoCardProps) {
  const rows = infoRows(petInfo);

  return (
    <div className="bg-surface-50 rounded-2xl rounded-tl-sm border border-brand-100 overflow-hidden max-w-[85%]">
      {confidence !== undefined && (
        <div className="px-4 pt-3.5 pb-0 flex items-center justify-between">
          <span className="text-[12px] font-bold text-brand-300 uppercase tracking-wide">
            들은 내용을 정리했어요
          </span>
          <span className="text-[12px] font-bold text-green-500">
            AI 추천 {Math.round(confidence * 100)}%
          </span>
        </div>
      )}
      <div className="p-4 flex flex-col gap-2.5">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <span className="text-[13px] text-brand-400 shrink-0">{label}</span>
            <span className="text-[14px] font-semibold text-brand-800 text-right">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
