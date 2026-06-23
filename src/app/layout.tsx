import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/lib/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdoptAI",
  description: "대화형 입양 공고 도우미 — 음성과 사진만으로 사실 기반 공고를 작성합니다",
  icons: { icon: "/favicon.ico" },
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
      <body className="min-h-full bg-brand-50 font-pretendard antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
