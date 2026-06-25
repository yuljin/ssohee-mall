export const metadata = {
  title: "개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <main className="policy-page">
      <span className="section-kicker">POLICY</span>
      <h1>개인정보처리방침</h1>
      <p>
        이 페이지는 데모용 초안입니다. 실제 서비스 오픈 전 수집 항목, 이용 목적,
        보유 기간, 처리 위탁 업체와 파기 절차를 사업 운영 방식에 맞게 확정해야
        합니다.
      </p>
      <h2>데모에서 처리하는 정보</h2>
      <p>주문자 이름, 휴대폰 번호, 배송 주소, 주문 상품과 선택 옵션입니다.</p>
      <h2>보관</h2>
      <p>
        현재 데모 주문은 개발 서버 메모리에만 임시 저장되며 서버가 재시작되면
        삭제됩니다.
      </p>
    </main>
  );
}
