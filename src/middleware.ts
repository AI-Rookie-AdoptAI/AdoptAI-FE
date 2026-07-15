import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/signup"];
const TOKEN_COOKIE = "adopt_access_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  if (!isPublic && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublic && token) {
    const next = request.nextUrl.searchParams.get("next") ?? "/";
    // 오픈 리다이렉트 방지: "/"로 시작하고 "//"(프로토콜 상대 URL)가 아닌 경로만 허용
    const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
    return NextResponse.redirect(new URL(safeNext, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};
