import Link from "next/link";
import { OrderLookupForm } from "@/components/order-lookup-form";

export const metadata = {
  title: "주문 조회",
};

export default function OrdersLookupPage() {
  return (
    <main className="simple-page lookup-page">
      <span className="section-kicker">ORDER LOOKUP</span>
      <h1>주문 조회</h1>
      <p>
        데모 주문을 완료하면 발급되는 전용 주소에서 주문 상태를 확인할 수 있습니다.
      </p>
      <OrderLookupForm />
      <Link className="back-link" href="/">
        이번 주 한 벌 보러 가기
      </Link>
    </main>
  );
}
