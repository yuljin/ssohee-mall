import Link from "next/link";

export default function NotFound() {
  return (
    <main className="simple-page">
      <span className="section-kicker">NOT FOUND</span>
      <h1>페이지를 찾지 못했습니다.</h1>
      <p>주문 조회 주소가 정확한지 확인해 주세요.</p>
      <Link className="primary-link" href="/">이번 주 한 벌 보기</Link>
    </main>
  );
}
