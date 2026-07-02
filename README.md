# AdoptAI — 프론트엔드

---

## 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.local.example .env.local
# .env.local 을 열어 필요한 값 수정

# 3. 개발 서버 실행
npm run dev
# → http://localhost:3000
```

### 환경변수

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api/v1` | 백엔드 REST API base URL |
| `NEXT_PUBLIC_USE_MOCK` | `true` | `true` 이면 백엔드 없이 mock 동작 |
| `NEXT_PUBLIC_USE_STREAM` | `false` | `true` 이면 SSE 스트리밍 응답 수신 |

> 백엔드 없이 UI를 확인하려면 `NEXT_PUBLIC_USE_MOCK=true` 상태로 실행하세요.

---

## 스크립트

```bash
npm run dev      # 개발 서버 (hot reload)
npm run build    # 프로덕션 빌드
npm run start    # 빌드된 결과 실행
npm run lint     # ESLint 검사
```

---

## 기술 스택

| 분류 | 사용 기술 |
|------|-----------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript 5 (strict) |
| 스타일 | Tailwind CSS v4 — `@theme {}` 토큰 |
| 폰트 | Pretendard Variable |
| 상태 관리 | React Context (`ChatContext`, `AuthContext`) |
| 인증 | 쿠키 기반 JWT (자체 구현) |
| API 통신 | Fetch API (REST + SSE 스트리밍) |

---

## 레포 구조

```
src/
├── app/                        # Next.js App Router 페이지
│   ├── layout.tsx              # 루트 레이아웃 (웹앱 모바일 쉘)
│   ├── page.tsx                # 홈 — 대시보드
│   ├── chat/
│   │   ├── page.tsx            # 채팅 — 공고 작성 (Screen 02~04)
│   │   └── publish/page.tsx    # 게시 완료 (Screen 06)
│   ├── announcements/
│   │   ├── page.tsx            # 공고 목록
│   │   └── [id]/page.tsx       # 공고 상세
│   ├── login/ & signup/        # 인증
│   ├── notifications/          # 알림
│   └── settings/               # 설정
│
├── components/
│   ├── announcement/
│   │   ├── PlatformPicker.tsx  # 플랫폼 선택 모달 (인스타/카카오/네이버카페 등)
│   │   └── ExportFormatPicker.tsx  # 저장 형식 선택 (md/txt/json/클립보드)
│   ├── auth/                   # 로그인·회원가입 폼
│   ├── chat/
│   │   ├── ChatWindow.tsx      # 메시지 목록 + 스크롤
│   │   ├── ChatBubble.tsx      # 메시지 렌더러 (text/image/chips/draft_card)
│   │   └── ChatInput.tsx       # 텍스트 입력 + 사진/음성 버튼
│   ├── dashboard/
│   │   └── AnnouncementCard.tsx
│   ├── layout/
│   │   ├── AppHeader.tsx
│   │   └── BottomNav.tsx
│   └── ui/
│       ├── Icons.tsx           # SVG 아이콘 모음
│       ├── Modal.tsx           # 바텀시트 모달
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── Input.tsx
│
└── lib/
    ├── types.ts                # 공유 TypeScript 타입
    ├── constants.ts            # 플랫폼 목록, 저장 형식, 상태 레이블
    ├── chatApi.ts              # 백엔드 채팅 API 호출 레이어
    ├── export.ts               # md/txt/json 내보내기 + 클립보드 복사
    ├── ChatContext.tsx         # 채팅 상태 (mock / real API 분기)
    ├── AuthContext.tsx         # 로그인 세션 Context
    └── auth.ts                 # 토큰 저장·갱신·API 호출
```

---

## 화면 흐름

```
홈 (대시보드)
  └─ 새 공고 작성하기 ──→ 채팅 (입양 도우미)
                              ├─ 사진 + 음성 업로드
                              ├─ AI 정보 정리 카드
                              ├─ 추가 질문 (칩 선택)
                              └─ 공고 초안 카드
                                    ├─ 수정 요청 (재채팅)
                                    └─ 게시하기 ──→ 게시 완료
                                                        ├─ 플랫폼 선택
                                                        └─ 저장 형식으로 내보내기

홈 → 공고 탭 → 공고 목록 → 공고 상세
                                ├─ 플랫폼 선택
                                └─ 저장 형식으로 내보내기
```

---

## 백엔드 연동

채팅 API 호출 코드는 [`src/lib/chatApi.ts`](src/lib/chatApi.ts)에 집중되어 있어,  
백엔드 URL·응답 형태가 바뀌어도 이 파일만 수정하면 됩니다.
