import type { AnnouncementDraft, ExportFormat, Platform, EstimatedAge } from "./types";
import { PLATFORMS } from "./constants";

export function getPlatform(id?: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id);
}

// ─── 표시용 포맷 헬퍼 ──────────────────────────────────────────────────────────

function fmtAge(age?: EstimatedAge): string {
  if (!age) return "미상";
  return `${age.value}${age.unit}`;
}

function fmtWeight(kg?: number): string {
  if (kg == null) return "미상";
  return `${kg} kg`;
}

function fmtGender(gender: string, neutered?: boolean): string {
  const g = gender === "male" ? "수컷" : gender === "female" ? "암컷" : "미상";
  const n = neutered === true ? "중성화 완료" : neutered === false ? "중성화 안 함" : null;
  return n ? `${g} · ${n}` : g;
}

// ─── Builders ─────────────────────────────────────────────────────────────────

function buildMarkdown(draft: AnnouncementDraft, platform?: Platform): string {
  const { petName, title, description, petInfo } = draft;
  const toneNote = platform ? `\n> 말투: ${platform.toneLabel} · 플랫폼: ${platform.name}` : "";

  const rows: (string | null)[] = [
    `# ${title}`,
    toneNote,
    "",
    description,
    "",
    "---",
    "",
    "## 기본 정보",
    "",
    `| 항목 | 내용 |`,
    `|------|------|`,
    `| 이름 | ${petName} |`,
    `| 종류 | ${petInfo.breed ?? petInfo.species} |`,
    `| 성별 | ${fmtGender(petInfo.gender, petInfo.neutered)} |`,
    `| 추정 나이 | ${fmtAge(petInfo.estimatedAge)} |`,
    `| 체중 | ${fmtWeight(petInfo.weightKg)} |`,
    petInfo.appearance ? `| 외형 | ${petInfo.appearance} |` : null,
    petInfo.healthConditions?.length
      ? `| 건강 | ${petInfo.healthConditions.join(", ")} |`
      : `| 건강 | 특이사항 없음 |`,
    petInfo.personalityNotes ? `| 성격 | ${petInfo.personalityNotes} |` : null,
    petInfo.rescueRegion ? `| 구조 지역 | ${petInfo.rescueRegion} |` : null,
    petInfo.rescueDate ? `| 구조 일자 | ${petInfo.rescueDate} |` : null,
    petInfo.shelterContact ? `| 보호소 연락처 | ${petInfo.shelterContact} |` : null,
  ];

  return rows.filter((l) => l !== null).join("\n");
}

function buildPlainText(draft: AnnouncementDraft, platform?: Platform): string {
  const { petName, title, description, petInfo } = draft;
  const toneNote = platform ? `[말투: ${platform.toneLabel} · 플랫폼: ${platform.name}]\n\n` : "";

  const lines: (string | null)[] = [
    title,
    "",
    toneNote + description,
    "",
    "─────────────────",
    `이름: ${petName}`,
    `종류: ${petInfo.breed ?? petInfo.species}`,
    `성별: ${fmtGender(petInfo.gender, petInfo.neutered)}`,
    `나이: ${fmtAge(petInfo.estimatedAge)} / 체중: ${fmtWeight(petInfo.weightKg)}`,
    petInfo.appearance ? `외형: ${petInfo.appearance}` : null,
    `건강: ${petInfo.healthConditions?.join(", ") ?? "특이사항 없음"}`,
    petInfo.personalityNotes ? `성격: ${petInfo.personalityNotes}` : null,
    petInfo.rescueRegion
      ? `구조: ${petInfo.rescueRegion}${petInfo.rescueDate ? ` (${petInfo.rescueDate})` : ""}`
      : null,
    petInfo.shelterContact ? `연락처: ${petInfo.shelterContact}` : null,
  ];

  return lines.filter((l) => l !== null).join("\n");
}

function buildJson(draft: AnnouncementDraft, platform?: Platform): string {
  return JSON.stringify(
    {
      ...draft,
      platform: platform
        ? { id: platform.id, name: platform.name, tone: platform.tone }
        : undefined,
      exportedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildExportContent(
  draft: AnnouncementDraft,
  format: ExportFormat,
  platformId?: string
): string {
  const platform = getPlatform(platformId);
  switch (format) {
    case "markdown":  return buildMarkdown(draft, platform);
    case "text":      return buildPlainText(draft, platform);
    case "json":      return buildJson(draft, platform);
    case "clipboard": return buildPlainText(draft, platform);
  }
}

export function downloadFile(content: string, format: ExportFormat, petName: string) {
  const ext = format === "markdown" ? "md" : format === "json" ? "json" : "txt";
  const filename = `adoptai_${petName}_${new Date().toISOString().slice(0, 10)}.${ext}`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
