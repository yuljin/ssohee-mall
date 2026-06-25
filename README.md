# 한벌 Kids Drop Shop

매주 하나의 키즈 코디를 프리오더로 판매하는 드롭형 편집샵 프로젝트.

## Run

```bash
npm install
npm run dev
```

기본 주소는 `http://localhost:3000`이다. 포트가 사용 중이면 Next.js가 다음
가용 포트를 출력한다.

환경변수 없이 실행하면 데모 모드로 동작한다. 주문은 실제 결제 없이 즉시
`PAID` 상태가 되며 개발 서버 메모리에만 저장된다.

## Implemented MVP

- 이번 주 드롭 상품 상세
- 실시간 마감 카운트다운
- 사이즈, 수량, 추가 상품 선택
- 서버 가격 재계산과 무료배송 기준
- 게스트 주문서와 데모 결제 완료
- 공개 토큰 기반 주문 상태 페이지
- 주문번호와 휴대폰 뒤 4자리 조회
- 지난 드롭 아카이브와 앙코르 알림 신청
- 참여 수량별 커뮤니티 리워드
- 데모 주문/매출/알림 운영 대시보드
- PostgreSQL용 Drizzle 초기 스키마
- 데스크톱/모바일 E2E 테스트

## Verification

```bash
npm run lint
npm test
npm run build
npm run test:e2e
npm audit --omit=dev
```

## Production Integrations

실제 판매 전 다음 어댑터를 연결해야 한다.

- Supabase PostgreSQL과 마이그레이션
- Supabase Storage 상품 이미지
- Supabase Auth 관리자 인증과 MFA
- Toss Payments 결제 승인, 취소, 웹훅
- 카카오 알림톡/SMS 발송
- 관리자 권한, 감사 로그, rate limit
- 사업자 정보, 약관, 개인정보 보관/파기 정책
- 상품별 KC 인증 및 안전 표시

## Documents

- [Launch Plan](kids-drop-shop-launch-plan.md)
- [Application Architecture](docs/application-architecture.md)
- [Initial Data Model](docs/data-model.md)
- [ADR 0001: Modular Monolith](docs/adr/0001-modular-monolith.md)
- [Original Idea Notes](business-ideas-2026-06-23.md)

## Architecture Summary

- Next.js App Router + TypeScript
- PostgreSQL on Supabase
- Drizzle ORM
- Supabase Storage and admin authentication
- Toss Payments
- Vercel deployment
- Guest checkout with one active preorder drop

## Next Development Milestone

1. Supabase 프로젝트와 Drizzle 마이그레이션 연결
2. 관리자 로그인과 드롭 편집기
3. Toss Payments 테스트 결제
4. 주문/배송 상태 변경과 송장 등록
5. 실제 상품 사진 업로드
