import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/lib/AuthContext";
import DeviceFrame from "@/components/layout/DeviceFrame";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdoptAI",
  description: "대화형 입양 공고 도우미 — 음성과 사진만으로 사실 기반 공고를 작성합니다",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full bg-surface-50 font-pretendard antialiased">
        <AuthProvider>
          <DeviceFrame>{children}</DeviceFrame>
        </AuthProvider>
      </body>
    </html>
  );
}
