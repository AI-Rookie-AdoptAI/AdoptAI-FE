"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MonitorIcon, SmartphoneIcon } from "@/components/ui/Icons";

type ViewMode = "mobile" | "pc";
const STORAGE_KEY = "adopt_view_mode";

/**
 * PC 브라우저에서 앱을 모바일 폭(430px) 컬럼 안에 보여줄지, 전체 폭(PC)으로 보여줄지 전환해요.
 * 실제 모바일 기기(뷰포트가 430px보다 좁을 때)에서는 sm: 이상에서만 적용되는 장식 클래스들이
 * 전부 빠지기 때문에 자동으로 지금까지와 같은 전체 화면으로 보여요.
 *
 * 모바일 모드일 때 프레임 컨테이너에 transform을 걸어서, 내부의 position:fixed 요소들
 * (BottomNav, Modal, Toast 등)이 브라우저 뷰포트 전체가 아니라 이 프레임 폭 안에 고정되도록 해요.
 * 높이는 항상 min-h-screen(100vh)을 그대로 써서 — 각 페이지가 이미 그 값을 기준으로 레이아웃을
 * 잡고 있기 때문에 — 별도 높이 보정 없이 자연스럽게 맞아떨어져요.
 */
export default function DeviceFrame({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ViewMode>("mobile");

  useEffect(() => {
    // localStorage는 서버에 없으므로 항상 "mobile"로 먼저 그린 뒤(SSR과 동일한 첫 렌더),
    // 마운트 후에 저장된 값으로 동기화해요 — hydration mismatch를 피하기 위한 의도적인 처리예요.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "pc" || stored === "mobile") setMode(stored);
  }, []);

  function handleChange(next: ViewMode) {
    setMode(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <div className={mode === "mobile" ? "sm:flex sm:justify-center sm:bg-brand-900" : ""}>
      <div
        className={
          mode === "mobile"
            ? "relative w-full min-h-screen sm:max-w-[430px] sm:border-x sm:border-black/15 sm:shadow-2xl bg-surface-50"
            : "relative min-h-screen bg-surface-50"
        }
        style={mode === "mobile" ? { transform: "translateZ(0)" } : undefined}
      >
        {children}
      </div>
      <DeviceToggle mode={mode} onChange={handleChange} />
    </div>
  );
}

function DeviceToggle({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  return (
    <div className="hidden sm:flex fixed top-4 right-4 z-[60] bg-brand-800 rounded-full p-1 gap-1 shadow-lg">
      <button
        type="button"
        onClick={() => onChange("mobile")}
        aria-label="모바일로 보기"
        aria-pressed={mode === "mobile"}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
          mode === "mobile" ? "bg-accent-500 text-brand-800" : "text-white/60 hover:text-white"
        }`}
      >
        <SmartphoneIcon size={18} color="currentColor" />
      </button>
      <button
        type="button"
        onClick={() => onChange("pc")}
        aria-label="PC로 보기"
        aria-pressed={mode === "pc"}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
          mode === "pc" ? "bg-accent-500 text-brand-800" : "text-white/60 hover:text-white"
        }`}
      >
        <MonitorIcon size={18} color="currentColor" />
      </button>
    </div>
  );
}
