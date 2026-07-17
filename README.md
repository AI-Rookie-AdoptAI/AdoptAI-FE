# AdoptAI — 프론트엔드

---

## 로컬 실행

```bash
# 1. 의존성 설치 (Node 20+ 권장)
npm install

# 2. 환경변수 설정
cp .env.local.example .env.local
# .env.local 을 열어 필요한 값 수정 (기본값 그대로도 mock 모드로 바로 실행돼요)

# 3. 개발 서버 실행
npm run dev
# → http://localhost:3000
```

백엔드 없이 화면만 확인하려면 `.env.local`의 `NEXT_PUBLIC_USE_MOCK=true`(기본값)를 그대로 두면 됩니다.
실제 백엔드에 연결하려면 `NEXT_PUBLIC_USE_MOCK=false`로 바꾸고 `NEXT_PUBLIC_API_URL`이 백엔드 주소를 가리키는지 확인하세요.

> 로그인 페이지 상단에 "개발 모드" 안내가 보이면 아무 이메일/비밀번호로 로그인돼요 (mock 인증).

### 환경변수

`.env.local.example`을 복사해서 사용하세요.

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api/v1` | 백엔드(AI 서버) REST API base URL |
| `NEXT_PUBLIC_USE_MOCK` | `true` | `true` 이면 백엔드 없이 mock 동작 |
| `NEXT_PUBLIC_USE_STREAM` | `false` | `true` 이면 SSE 스트리밍 응답 수신 |

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
| 스타일 | Tailwind CSS v4 — `@theme {}` 토큰 (`src/app/globals.css`) |
| 폰트 | Pretendard Variable |
| 상태 관리 | React Context (`ChatContext`, `AuthContext`) |
| 인증 | 쿠키 기반 JWT (자체 구현), `middleware.ts`에서 라우트 가드 |
| API 통신 | Fetch API (REST + `multipart/form-data` 업로드 + SSE 스트리밍) |

---

## 레포 구조

```
src/
├── app/                          # Next.js App Router 페이지
│   ├── layout.tsx                # 루트 레이아웃 (웹앱 모바일 쉘)
│   ├── icon.svg                  # 앱 아이콘 (파비콘 자동 생성)
│   ├── page.tsx                  # 홈 — 대시보드
│   ├── chat/
│   │   ├── page.tsx              # 채팅 — 사진/음성 업로드 · 정보 정리 · 초안
│   │   ├── platform/page.tsx     # 플랫폼 다중 선택 → 생성 진행 오버레이
│   │   ├── preview/page.tsx      # 플랫폼별 맞춤 미리보기 → 저장 확인
│   │   └── complete/page.tsx     # 파일 생성 완료 · 다운로드
│   ├── announcements/
│   │   ├── page.tsx              # 공고 목록
│   │   └── [id]/page.tsx         # 공고 상세
│   ├── login/ & signup/          # 인증
│   ├── notifications/            # 알림
│   └── settings/                 # 설정
│
├── components/
│   ├── announcement/
│   │   ├── PlatformPicker.tsx    # 플랫폼 선택 모달 (공고 상세 재설정용)
│   │   └── ExportFormatPicker.tsx  # 저장 형식 선택 (md/txt/json/클립보드)
│   ├── auth/                     # 로그인·회원가입 폼
│   ├── chat/
│   │   ├── ChatWindow.tsx        # 메시지 목록 + 스크롤
│   │   ├── ChatBubble.tsx        # 메시지 렌더러 (text/image/voice/chips/draft_card)
│   │   └── ChatInput.tsx         # 텍스트 입력 + 사진/음성 파일 첨부
│   ├── dashboard/
│   │   └── AnnouncementCard.tsx  # 목록 카드 (⋯ 메뉴 → ActionSheet)
│   ├── layout/
│   │   ├── AppHeader.tsx
│   │   └── BottomNav.tsx
│   └── ui/                       # 공용 디자인 시스템 컴포넌트
│       ├── Icons.tsx             # SVG 아이콘 모음 (AppIcon 포함)
│       ├── Modal.tsx             # 바텀시트 모달
│       ├── ActionSheet.tsx       # 액션 시트 메뉴
│       ├── ConfirmDialog.tsx     # 확인/삭제 다이얼로그
│       ├── ProgressOverlay.tsx   # 전체화면 진행 오버레이
│       ├── ExportFilesSheet.tsx  # 파일 다중 선택 내보내기 시트
│       ├── Toast.tsx             # 토스트 · 실행취소
│       ├── Badge.tsx / Button.tsx / Input.tsx / Toggle.tsx
│
└── lib/
    ├── types.ts                  # 공유 TypeScript 타입
    ├── constants.ts              # 플랫폼 목록, 저장 형식, 상태 레이블
    ├── mockDraft.ts              # 데모용 고정 초안 + 플랫폼별 캡션
    ├── chatApi.ts                # 백엔드(AI 서버) 채팅 API 호출 레이어
    ├── export.ts                 # md/txt/json 내보내기 + 클립보드 복사
    ├── ChatContext.tsx           # 채팅 상태 (mock / real API 분기)
    ├── AuthContext.tsx           # 로그인 세션 Context
    └── auth.ts                   # 토큰 저장·갱신·API 호출
```

---

## 화면 흐름

```
홈 (대시보드)
  ├─ ⋯ 메뉴 (초안 카드) ──→ 이름 변경 · 복제 · 파일 다시 내보내기 · 삭제
  └─ 새 공고 작성하기 ──→ 채팅 (입양 도우미)
                              ├─ 사진 + 음성 업로드
                              ├─ AI 정보 정리 카드
                              ├─ 추가 질문 (칩 선택)
                              └─ 공고 초안 카드
                                    ├─ 수정 요청 (재채팅)
                                    └─ 플랫폼 선택 ──→ 플랫폼 다중 선택
                                                            └─ 생성 진행(오버레이)
                                                                  └─ 플랫폼별 미리보기
                                                                        └─ 파일로 저장하기(확인)
                                                                              └─ 파일 생성 완료 · 다운로드

홈 → 공고 탭 → 공고 목록 → 공고 상세
                                ├─ 플랫폼 선택
                                └─ 저장 형식으로 내보내기
```

---

## 사진 · 음성 업로드

사진과 음성은 **프론트엔드에서 파일로 수집한 뒤 AI 서버로 업로드**하는 구조예요. 브라우저에서 직접 녹음/촬영을 처리하지 않고, 표준 파일 선택(`<input type="file">`)으로 받은 파일을 그대로 백엔드에 전달합니다.

- 사진: `ChatInput`의 "+" 버튼 → `accept="image/*"` 파일 선택 (다중 선택 가능) → `sendImages(files)`
- 음성: `ChatInput`의 마이크 버튼 → `accept="audio/*"` 파일 선택 → 브라우저에서 `<audio>` 메타데이터로 재생 길이를 읽은 뒤 → `sendVoice(file, durationSec)`

두 경로 모두 [`src/lib/ChatContext.tsx`](src/lib/ChatContext.tsx)를 거쳐 [`src/lib/chatApi.ts`](src/lib/chatApi.ts)의 `sendImages` / `sendVoice`가 `multipart/form-data`로 백엔드에 업로드합니다.

| 액션 | 엔드포인트 | 필드 |
|------|-----------|------|
| 사진 업로드 | `POST /chat/sessions/{id}/images` | `images` (다중 파일) |
| 음성 업로드 | `POST /chat/sessions/{id}/voice` | `audio` (파일), `duration_sec` |

`NEXT_PUBLIC_USE_MOCK=true`일 때는 실제 업로드 없이 즉시 mock 응답으로 대체돼요.

---

## 백엔드 연동

채팅 API 호출 코드는 [`src/lib/chatApi.ts`](src/lib/chatApi.ts)에 집중되어 있어,
백엔드 URL·응답 형태가 바뀌어도 이 파일만 수정하면 됩니다.
