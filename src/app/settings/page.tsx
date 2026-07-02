import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <AppHeader userName="민정" />
      <main className="flex-1 pb-[88px] px-[22px] pt-4">
        <h1 className="text-[20px] font-extrabold text-brand-800 mb-4">설정</h1>
        <div className="flex flex-col gap-2">
          {["프로필 수정", "보호소 정보", "알림 설정", "도움말", "로그아웃"].map((item) => (
            <button
              key={item}
              className="w-full text-left px-4 py-3.5 bg-surface-50 border border-brand-75 rounded-[16px] text-[14px] font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
