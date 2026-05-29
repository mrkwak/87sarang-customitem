# 판촉사랑 · 세상의 모든 판촉 (랜딩 MVP)

쿠팡·네이버·지마켓 어디서 본 상품이든, 로고 인쇄·고급 포장·세금계산서·후결제까지 한 번에 처리해드리는 B2B/B2G 판촉 솔루션 랜딩 페이지입니다.

## 📁 파일 구조

```
/
├─ index.html        # 메인 랜딩 (단일 파일)
└─ api/
   └─ search.js      # 네이버 쇼핑 API 프록시 (Vercel Serverless Function)
```

## 🚀 배포 방법 (Vercel)

### 1. 네이버 API 키 발급

1. [네이버 개발자센터](https://developers.naver.com/apps/#/list) 접속
2. **애플리케이션 등록** 클릭
3. 사용 API: **검색** 체크
4. 환경: **WEB 설정** → 서비스 URL에 배포할 도메인 입력 (예: `https://sr-mybrand.vercel.app`)
5. 등록 완료 후 **Client ID** / **Client Secret** 복사

### 2. Vercel 환경변수 등록

Vercel 대시보드 → 프로젝트 → **Settings → Environment Variables** 에서 다음 2개를 추가:

| Key | Value |
|-----|-------|
| `NAVER_CLIENT_ID` | (발급받은 Client ID) |
| `NAVER_CLIENT_SECRET` | (발급받은 Client Secret) |

추가 후 **Deployments → 최신 배포 → Redeploy** 클릭.

### 3. 카톡 / 이메일 연동

`index.html` 상단의 `CONFIG` 부분을 본인 정보로 수정:

```js
const CONFIG = {
  // 카카오톡 채널 URL — 예: 'http://pf.kakao.com/_abcDEF/chat'
  KAKAO_CHAT_URL: 'http://pf.kakao.com/_yourChannelId/chat',
  CONTACT_EMAIL: 'quote@panchok-sarang.kr',
};
```

> **카카오톡 채널 URL 만드는 법**
> 1. [카카오톡 채널 관리자센터](https://center-pf.kakao.com/) 로그인
> 2. 채널 만들기 → 채널 홈 URL에서 `_xxxxx` 부분 확인
> 3. 위 형식으로 `http://pf.kakao.com/_xxxxx/chat` 으로 설정

## 🧪 로컬 테스트

```bash
npm i -g vercel
vercel dev
```

브라우저에서 http://localhost:3000 접속.

`.env.local` 파일에 키 넣어두면 로컬에서도 검색 동작:
```
NAVER_CLIENT_ID=xxxxx
NAVER_CLIENT_SECRET=xxxxx
```

## 💡 작동 흐름

1. 방문자가 **네이버 검색** 탭에서 상품 검색 → 카드 클릭으로 선택
   OR **URL 붙여넣기** 탭에서 쿠팡·지마켓·11번가 URL 입력
2. 수량·예산·납기·연락처 등 폼 작성
3. **💬 카카오톡으로 상담하기** 클릭
   → 폼 내용을 클립보드에 자동 복사 + 카톡 채팅창 새 탭 오픈
   → 방문자는 채팅창에 붙여넣기 한 번만 하면 끝
4. **✉️ 이메일로 견적받기** 클릭
   → `mailto:` 자동 작성 (제목 + 본문 자동 채워짐)

## 📊 다음 단계 (시장 반응 후)

- GA4 / Vercel Analytics 붙여서 전환율 추적
- 견적 요청을 DB에 저장 (현재는 카톡·메일로만 전달)
- 자주 들어오는 카테고리는 미리 만들어둔 견적 페이지로 분기
- 재구매 자동 알림 (이메일/카톡)
