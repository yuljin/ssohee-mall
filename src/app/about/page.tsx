import { CalendarClock, PackageCheck, RefreshCw, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "이용 안내",
};

const steps = [
  {
    icon: CalendarClock,
    title: "7일 동안 주문",
    copy: "공개된 한 벌을 정해진 기간 동안만 주문받습니다.",
  },
  {
    icon: PackageCheck,
    title: "마감 후 일괄 발주",
    copy: "판매 수량을 확정하고 거래처에 필요한 만큼 발주합니다.",
  },
  {
    icon: ShieldCheck,
    title: "한 벌씩 검수",
    copy: "입고된 상품의 오염, 봉제, 옵션을 확인한 뒤 포장합니다.",
  },
  {
    icon: RefreshCw,
    title: "다음 주 새로운 조합",
    copy: "마감된 한 벌은 아카이브에 남고 새로운 코디가 공개됩니다.",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <header>
        <span className="section-kicker">HOW IT WORKS</span>
        <h1>많이 보여주지 않고,<br />한 벌을 제대로 고릅니다.</h1>
        <p>
          한벌은 재고를 쌓아두는 쇼핑몰이 아니라, 매주 선택한 코디를 필요한
          수량만 준비하는 프리오더 편집샵입니다.
        </p>
      </header>
      <ol className="how-list">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="how-number">0{index + 1}</span>
            <step.icon size={24} />
            <div>
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>
      <section className="policy-copy">
        <h2>판매 전 확인할 운영 기준</h2>
        <p>
          실제 오픈 시 상품별 KC 인증·안전 표시 대상 여부, 공급처 품절 시 환불
          절차, 배송 예정일, 교환·반품 비용을 상세 페이지에 명확히 표시합니다.
        </p>
      </section>
    </main>
  );
}
