import type { AnnouncementDraft, ExportFormat, Platform } from "./types";
import { PLATFORMS } from "./constants";

export function getPlatform(id?: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id);
}

function buildMarkdown(draft: AnnouncementDraft, platform?: Platform): string {
  const { petName, title, description, petInfo } = draft;
  const toneNote = platform ? `\n> 말투: ${platform.toneLabel} · 플랫폼: ${platform.name}` : "";

  const healthLines = petInfo.healthConditions?.length
    ? petInfo.healthConditions.join(", ")
    : "특이사항 없음";

  const lines = [
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
    `| 성별 | ${petInfo.gender === "male" ? "수컷" : petInfo.gender === "female" ? "암컷" : "미상"} |`,
    `| 중성화 | ${petInfo.neutered === true ? "완료" : petInfo.neutered === false ? "미완료" : "미상"} |`,
    `| 추정 나이 | ${petInfo.estimatedAge ?? "미상"} |`,
    `| 체중 | ${petInfo.weight ?? "미상"} |`,
    `| 색상 | ${petInfo.color ?? "미상"} |`,
    `| 건강 | ${healthLines} |`,
    petInfo.rescueLocation ? `| 구조 장소 | ${petInfo.rescueLocation} |` : null,
    petInfo.rescueDate ? `| 구조 일자 | ${petInfo.rescueDate} |` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return lines;
}

function buildPlainText(draft: AnnouncementDraft, platform?: Platform): string {
  const { petName, title, description, petInfo } = draft;
  const toneNote = platform ? `[말투: ${platform.toneLabel} · 플랫폼: ${platform.name}]\n\n` : "";

  const gender = petInfo.gender === "male" ? "수컷" : petInfo.gender === "female" ? "암컷" : "미상";
  const neutered = petInfo.neutered === true ? "완료" : petInfo.neutered === false ? "미완료" : "미상";
  const health = petInfo.healthConditions?.join(", ") ?? "특이사항 없음";

  return [
    title,
    "",
    toneNote + description,
    "",
    "─────────────────",
    `이름: ${petName}`,
    `종류: ${petInfo.breed ?? petInfo.species}`,
    `성별: ${gender} / 중성화: ${neutered}`,
    `나이: ${petInfo.estimatedAge ?? "미상"} / 체중: ${petInfo.weight ?? "미상"}`,
    `건강: ${health}`,
    petInfo.rescueLocation ? `구조: ${petInfo.rescueLocation}${petInfo.rescueDate ? ` (${petInfo.rescueDate})` : ""}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
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
    case "markdown":
      return buildMarkdown(draft, platform);
    case "text":
      return buildPlainText(draft, platform);
    case "json":
      return buildJson(draft, platform);
    case "clipboard":
      return buildPlainText(draft, platform);
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
