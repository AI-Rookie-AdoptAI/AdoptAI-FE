import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col h-full min-h-screen bg-surface-50">
      <AppHeader userName="민정" />
      <main className="flex-1 flex items-center justify-center pb-[88px]">
        <div className="text-center flex flex-col items-center gap-2">
          <p className="text-[40px]">🔔</p>
          <p className="text-[16px] font-bold text-brand-800">알림</p>
          <p className="text-[13px] text-brand-400">새로운 알림이 없어요</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
