import Link from "next/link";
import {
  ArrowUpRight,
  CircleDollarSign,
  Clock3,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import { currentDrop } from "@/modules/drop/demo-data";
import { demoOrders, demoSubscribers } from "@/lib/demo-store";
import { formatWon } from "@/modules/checkout/domain";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const orders = Array.from(demoOrders.values());
  const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const demoOrderQuantity = orders.reduce((sum, order) => sum + order.quantity, 0);
  const confirmedQuantity = currentDrop.paidQuantity + demoOrderQuantity;
  const nextReward = currentDrop.rewards.find(
    (reward) => reward.threshold > confirmedQuantity,
  );

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <Link className="brand" href="/">한벌</Link>
        <nav>
          <a className="active" href="#overview">개요</a>
          <a href="#drop">드롭</a>
          <a href="#orders">주문</a>
          <a href="#fulfillment">발주·배송</a>
        </nav>
        <Link className="admin-store-link" href="/">
          스토어 보기
          <ArrowUpRight size={16} />
        </Link>
      </aside>
      <div className="admin-content">
        <header className="admin-header" id="overview">
          <div>
            <span>2026년 운영 데모</span>
            <h1>이번 주 현황</h1>
          </div>
          <Link className="admin-header-link" href="/">
            스토어 보기
            <ArrowUpRight size={15} />
          </Link>
        </header>

        <section className="metric-grid">
          <article>
            <ShoppingBag size={20} />
            <span>결제 주문</span>
            <strong>{confirmedQuantity}</strong>
            <small>데모 주문 +{demoOrderQuantity}세트</small>
          </article>
          <article>
            <CircleDollarSign size={20} />
            <span>데모 매출</span>
            <strong>{formatWon(revenue)}</strong>
            <small>실결제 미연동</small>
          </article>
          <article>
            <Users size={20} />
            <span>알림 신청</span>
            <strong>{demoSubscribers.size}</strong>
            <small>마케팅 동의 기준</small>
          </article>
          <article>
            <Clock3 size={20} />
            <span>드롭 상태</span>
            <strong>OPEN</strong>
            <small>마감 스케줄 정상</small>
          </article>
        </section>

        <section className="admin-section" id="drop">
          <div className="admin-section-title">
            <div>
              <span>ACTIVE DROP</span>
              <h2>{currentDrop.title}</h2>
            </div>
            <span className="status-badge">판매 중</span>
          </div>
          <div className="drop-admin-grid">
            <div>
              <span>공개 기간</span>
              <strong>
                {new Intl.DateTimeFormat("ko-KR", {
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(currentDrop.closesAt))}까지
              </strong>
            </div>
            <div>
              <span>기본 판매가</span>
              <strong>{formatWon(currentDrop.basePrice)}</strong>
            </div>
            <div>
              <span>기본 혜택</span>
              <strong>{currentDrop.guaranteedBenefit.title}</strong>
            </div>
            <div>
              <span>다음 목표</span>
              <strong>
                {nextReward
                  ? `${nextReward.threshold}세트 · ${nextReward.threshold - confirmedQuantity}세트 남음`
                  : "모든 혜택 공개"}
              </strong>
            </div>
          </div>
        </section>

        <section className="admin-section" id="orders">
          <div className="admin-section-title">
            <div>
              <span>RECENT ORDERS</span>
              <h2>최근 데모 주문</h2>
            </div>
          </div>
          {orders.length > 0 ? (
            <div className="admin-table">
              <div className="admin-table-row head">
                <span>주문번호</span>
                <span>주문자</span>
                <span>옵션</span>
                <span>금액</span>
                <span>상태</span>
              </div>
              {orders.toReversed().map((order) => (
                <div className="admin-table-row" key={order.orderNumber}>
                  <Link href={`/orders/${order.publicToken}`}>{order.orderNumber}</Link>
                  <span>{order.buyerName}</span>
                  <span>{order.sizeId} · {order.quantity}벌</span>
                  <span>{formatWon(order.totalAmount)}</span>
                  <span className="status-badge paid">결제 완료</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="admin-empty">
              <Package size={28} />
              <strong>아직 데모 주문이 없습니다.</strong>
              <p>스토어에서 주문을 완료하면 이 목록에 바로 반영됩니다.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
