"use client";

import { useState } from "react";
import SettingsHeader from "@/components/settings/SettingsHeader";
import { ChevronRightIcon } from "@/components/ui/Icons";

const FAQ = [
  {
    q: "공고는 어떻게 작성하나요?",
    a: "홈 화면의 '새 공고 작성하기'를 누르면 AI 도우미가 시작됩니다. 구조한 동물의 사진과 음성 메모를 보내주시면 1분 안에 공고 초안을 만들어 드려요.",
  },
  {
    q: "어떤 동물의 공고를 작성할 수 있나요?",
    a: "강아지, 고양이, 기타 동물 모두 지원합니다. AI가 사진을 보고 종류를 자동으로 파악해요.",
  },
  {
    q: "플랫폼마다 공고가 다르게 작성되나요?",
    a: "네! 인스타그램, 카카오 오픈채팅, 네이버 카페, 포인핸드 등 플랫폼별로 이미지 비율과 말투를 자동으로 맞춰드려요.",
  },
  {
    q: "공고를 저장하거나 내보낼 수 있나요?",
    a: "Markdown, 텍스트, JSON 파일로 저장하거나 클립보드에 바로 복사할 수 있어요. 공고 상세 페이지의 저장 버튼을 눌러보세요.",
  },
  {
    q: "AI가 없는 내용을 지어낼 수도 있나요?",
    a: "아니요. AdoptAI는 '사실 기반 작성' 원칙을 따릅니다. 음성이나 사진에서 확인된 정보만 공고에 담고, 불확실한 항목은 사용자에게 직접 확인을 요청해요.",
  },
  {
    q: "음성 메모는 어떻게 사용하나요?",
    a: "채팅 화면 하단의 마이크 버튼을 눌러 녹음하면 됩니다. 말하는 내용을 AI가 분석해서 동물 정보를 정리해 드려요.",
  },
];

const LINKS = [
  { label: "개인정보 처리방침", href: "#" },
  { label: "서비스 이용약관", href: "#" },
  { label: "오픈소스 라이선스", href: "#" },
  { label: "버전 정보", value: "v0.1.0" },
];

export default function HelpPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-surface-50">
      <SettingsHeader title="도움말" />

      <main className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-6 pb-10 flex flex-col gap-6">
        {/* 자주 묻는 질문 */}
        <section>
          <p className="text-[12px] font-bold text-brand-300 uppercase tracking-wide mb-3">
            자주 묻는 질문
          </p>
          <div className="flex flex-col gap-2">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className="bg-surface-50 border border-brand-75 rounded-[16px] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-brand-50 transition-colors"
                >
                  <span className="text-[14px] font-semibold text-brand-800 flex-1">{item.q}</span>
                  <ChevronRightIcon
                    size={18}
                    color="#cbb9a3"
                    className={`shrink-0 transition-transform ${openIdx === i ? "rotate-90" : ""}`}
                  />
                </button>
                {openIdx === i && (
                  <div className="px-4 pb-4 pt-1 border-t border-brand-25">
                    <p className="text-[13.5px] text-brand-450 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 문의하기 */}
        <section>
          <p className="text-[12px] font-bold text-brand-300 uppercase tracking-wide mb-3">
            문의하기
          </p>
          <div className="bg-surface-50 border border-brand-75 rounded-[18px] px-4 py-4 flex flex-col gap-3">
            <p className="text-[13.5px] text-brand-700 leading-relaxed">
              서비스 이용 중 문제가 생기거나 개선 사항이 있으면 알려주세요.
            </p>
            <a
              href="mailto:support@adoptai.kr"
              className="inline-flex items-center justify-center py-3 rounded-[14px] bg-brand-500 hover:bg-brand-600 transition-colors"
            >
              <span className="text-[14px] font-bold text-white">이메일로 문의하기</span>
            </a>
          </div>
        </section>

        {/* 기타 링크 */}
        <section>
          <p className="text-[12px] font-bold text-brand-300 uppercase tracking-wide mb-3">
            정보
          </p>
          <div className="flex flex-col gap-0 bg-surface-50 border border-brand-75 rounded-[18px] overflow-hidden divide-y divide-brand-25">
            {LINKS.map(({ label, href, value }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  className="flex items-center justify-between px-4 py-3.5 hover:bg-brand-50 transition-colors"
                >
                  <span className="text-[14px] font-semibold text-brand-700">{label}</span>
                  <ChevronRightIcon size={18} color="#cbb9a3" />
                </a>
              ) : (
                <div key={label} className="flex items-center justify-between px-4 py-3.5">
                  <span className="text-[14px] font-semibold text-brand-700">{label}</span>
                  <span className="text-[13px] text-brand-400">{value}</span>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
