import type { AnnouncementDraft, PlatformId } from "./types";

/**
 * 채팅 흐름을 벗어나 별도 라우트(플랫폼 선택 → 결과 → 완료)로 이동하면
 * ChatContext가 초기화되므로, 데모용 초안을 공유 상수로 유지해요.
 */
export const MOCK_DRAFT: AnnouncementDraft = {
  petName: "보리",
  title: "사람을 잘 따르는 갈색 믹스견, 보리",
  description:
    "사람을 무척 좋아하고 잘 따르는 3살 남아예요. OO동에서 구조되었고, 건강하게 새 가족을 기다리고 있어요.",
  petInfo: {
    name: "보리",
    species: "dog",
    breed: "믹스견",
    gender: "male",
    estimatedAge: { value: 3, unit: "년" },
    weightKg: 5,
    appearance: "갈색 단모, 중형견",
    healthConditions: ["슬개골 탈구 2기", "심장사상충 음성"],
    neutered: false,
    rescueRegion: "OO동",
    rescueDate: "2026-05-18",
    shelterContact: "010-0000-0000",
  },
};

/** 플랫폼별로 어투와 길이를 다르게 맞춘 미리보기 캡션 (데모용 고정 텍스트) */
const PLATFORM_CAPTIONS: Partial<Record<PlatformId, string>> = {
  instagram:
    "사람만 보면 꼬리가 멈추질 않는 보리예요. 이 미소, 그냥 지나치실 수 있나요? #유기견입양 #보리 #믹스견",
  danggeun:
    "안녕하세요! OO동에서 구조한 보리예요. 사람을 참 잘 따르고 산책을 좋아해요. 좋은 가족 되어주실 분 찾습니다 🙂",
  naver_cafe:
    "[입양 공고] 보리 (믹스견·수컷·3세)\n온순하고 사람을 잘 따릅니다. 예방접종 완료, 심장사상충 음성. 슬개골 2기로 관리가 필요합니다.",
};

export function getPlatformCaption(draft: AnnouncementDraft, platformId: PlatformId): string {
  return PLATFORM_CAPTIONS[platformId] ?? draft.description;
}
