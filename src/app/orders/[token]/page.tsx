import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import {
  ArrowLeft,
  Check,
  Circle,
  PackageCheck,
  ReceiptText,
  Truck,
} from "lucide-react";
import { demoOrders } from "@/lib/demo-store";
import {
  decodeDemoOrder,
  getDemoOrderCookieName,
} from "@/lib/demo-order-cookie";
import { formatWon } from "@/modules/checkout/domain";

export const dynamic = "force-dynamic";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const cookieStore = await cookies();
  const cookieOrder = decodeDemoOrder(
    cookieStore.get(getDemoOrderCookieName(token))?.value,
  );
  const order =
    demoOrders.get(token) ??
    (cookieOrder?.publicToken === token ? cookieOrder : undefined);

  if (!order) {
    notFound();
  }

  return (
    <main className="order-page">
      <Link className="back-link" href="/">
        <ArrowLeft size={17} />
        이번 주 한 벌
      </Link>
      <section className="order-result">
        <div className="success-mark">
          <Check size={28} />
        </div>
        <span className="section-kicker">ORDER COMPLETE</span>
        <h1>주문이 접수되었습니다.</h1>
        <p>
          프리오더 마감 후 상품을 발주하고, 입고부터 배송까지 이 페이지에서
          알려드립니다.
        </p>
        <div className="order-number">
          <span>주문번호</span>
          <strong>{order.orderNumber}</strong>
        </div>
      </section>

      <section className="order-status-panel">
        <h2>진행 상황</h2>
        <ol className="status-timeline">
          <li className="active">
            <span><ReceiptText size={18} /></span>
            <div>
              <strong>결제 완료</strong>
              <small>주문과 결제를 확인했어요.</small>
            </div>
          </li>
          <li>
            <span><PackageCheck size={18} /></span>
            <div>
              <strong>상품 준비</strong>
              <small>드롭 마감 후 전체 수량을 발주해요.</small>
            </div>
          </li>
          <li>
            <span><Truck size={18} /></span>
            <div>
              <strong>배송 시작</strong>
              <small>
                {new Intl.DateTimeFormat("ko-KR", {
                  month: "long",
                  day: "numeric",
                }).format(new Date(order.shippingStartsAt))}{" "}
                부터 순차 발송 예정
              </small>
            </div>
          </li>
          <li>
            <span><Circle size={18} /></span>
            <div>
              <strong>배송 완료</strong>
              <small>송장 등록 후 배송 흐름이 표시됩니다.</small>
            </div>
          </li>
        </ol>
      </section>

      <section className="order-summary-panel">
        <div>
          <span>상품</span>
          <strong>{order.dropTitle}</strong>
        </div>
        <div>
          <span>선택</span>
          <strong>{order.sizeId} 사이즈 · {order.quantity}벌</strong>
        </div>
        {order.addOns.length > 0 ? (
          <div>
            <span>추가</span>
            <strong>
              {order.addOns.map((addOn) => `${addOn.name} ${addOn.quantity}`).join(", ")}
            </strong>
          </div>
        ) : null}
        <div>
          <span>주문자</span>
          <strong>{order.buyerName} · ****-{order.phoneLast4}</strong>
        </div>
        <div className="order-total">
          <span>결제 금액</span>
          <strong>{formatWon(order.totalAmount)}</strong>
        </div>
      </section>
    </main>
  );
}
