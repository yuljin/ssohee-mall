"use client";

import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Info,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Countdown } from "@/components/countdown";
import { ProductFlatlay } from "@/components/product-flatlay";
import { RewardProgress } from "@/components/reward-progress";
import {
  calculatePrice,
  formatWon,
  type CheckoutSelection,
} from "@/modules/checkout/domain";
import type { Drop } from "@/modules/drop/types";

type CheckoutForm = {
  buyerName: string;
  buyerPhone: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  deliveryNote: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
};

const emptyCheckout: CheckoutForm = {
  buyerName: "",
  buyerPhone: "",
  postalCode: "",
  address: "",
  addressDetail: "",
  deliveryNote: "",
  privacyConsent: false,
  marketingConsent: false,
};

export function DropExperience({ drop }: { drop: Drop }) {
  const [sizeId, setSizeId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addOns, setAddOns] = useState<Record<string, number>>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [form, setForm] = useState(emptyCheckout);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const summary = useMemo(() => {
    if (!sizeId) return null;

    try {
      return calculatePrice(drop, { sizeId, quantity, addOns });
    } catch {
      return null;
    }
  }, [addOns, drop, quantity, sizeId]);

  const selection: CheckoutSelection = { sizeId, quantity, addOns };

  const updateAddOn = (id: string, nextQuantity: number, maxQuantity: number) => {
    setAddOns((current) => ({
      ...current,
      [id]: Math.max(0, Math.min(nextQuantity, maxQuantity)),
    }));
  };

  const openCheckout = () => {
    if (!sizeId) {
      setError("먼저 아이의 사이즈를 선택해 주세요.");
      document.getElementById("size-options")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setError("");
    setCheckoutOpen(true);
  };

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.privacyConsent) {
      setError("주문을 위해 필수 약관에 동의해 주세요.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selection, customer: form }),
      });
      const result = (await response.json()) as {
        message?: string;
        orderUrl?: string;
      };

      if (!response.ok || !result.orderUrl) {
        throw new Error(result.message ?? "주문을 만들지 못했습니다.");
      }

      window.location.href = result.orderUrl;
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "잠시 후 다시 시도해 주세요.",
      );
      setSubmitting(false);
    }
  };

  return (
    <main>
      <section className="drop-hero">
        <div className="visual-column">
          <div className="drop-label">
            <span>WEEKLY LOOK</span>
            <span>DROP {String(drop.sequence).padStart(2, "0")}</span>
          </div>
          <ProductFlatlay />
          <div className="visual-caption">
            <span>이번 주의 조합</span>
            <span>01 / 01</span>
          </div>
        </div>

        <div className="purchase-column">
          <div className="purchase-inner">
            <p className="eyebrow">7 DAYS PREORDER</p>
            <h1>{drop.title}</h1>
            <p className="subtitle">{drop.subtitle}</p>

            <div className="price-row">
              <strong>{formatWon(drop.basePrice)}</strong>
              {drop.compareAtPrice ? (
                <del>{formatWon(drop.compareAtPrice)}</del>
              ) : null}
              <span>세트 구성</span>
            </div>

            <div className="deadline-block">
              <div className="deadline-title">
                <span>주문 마감까지</span>
                <time dateTime={drop.closesAt}>
                  {new Intl.DateTimeFormat("ko-KR", {
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                  }).format(new Date(drop.closesAt))}{" "}
                  23:59
                </time>
              </div>
              <Countdown target={drop.closesAt} />
            </div>

            <div className="option-section" id="size-options">
              <div className="option-heading">
                <label>사이즈</label>
                <button
                  className="text-button"
                  type="button"
                  aria-expanded={sizeGuideOpen}
                  onClick={() => setSizeGuideOpen((current) => !current)}
                >
                  <Ruler size={16} />
                  사이즈표
                </button>
              </div>
              {sizeGuideOpen ? (
                <div className="size-guide">
                  <div>
                    <span>사이즈</span>
                    <span>권장 키</span>
                    <span>권장 몸무게</span>
                  </div>
                  <div><strong>90</strong><span>85-92cm</span><span>10-13kg</span></div>
                  <div><strong>100</strong><span>92-100cm</span><span>13-16kg</span></div>
                  <div><strong>110</strong><span>100-108cm</span><span>16-19kg</span></div>
                  <div><strong>120</strong><span>108-116cm</span><span>19-22kg</span></div>
                </div>
              ) : null}
              <div className="size-grid">
                {drop.sizeOptions.map((option) => (
                  <button
                    className={sizeId === option.id ? "selected" : ""}
                    type="button"
                    key={option.id}
                    onClick={() => {
                      setSizeId(option.id);
                      setError("");
                    }}
                    disabled={!option.available}
                  >
                    <strong>{option.label}</strong>
                    <span>{option.detail}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-row">
              <span>세트 수량</span>
              <div className="stepper">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="수량 줄이기"
                  title="수량 줄이기"
                >
                  <Minus size={16} />
                </button>
                <strong>{quantity}</strong>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.min(3, current + 1))}
                  aria-label="수량 늘리기"
                  title="수량 늘리기"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="add-on-section">
              <div className="option-heading">
                <label>같이 담기</label>
                <span>선택</span>
              </div>
              {drop.addOns.map((addOn) => {
                const addOnQuantity = addOns[addOn.id] ?? 0;

                return (
                  <div className="add-on-row" key={addOn.id}>
                    <span className={`add-on-swatch ${addOn.imageTone}`} />
                    <div>
                      <strong>{addOn.name}</strong>
                      <small>{addOn.description}</small>
                    </div>
                    <span className="add-on-price">{formatWon(addOn.price)}</span>
                    <div className="mini-stepper">
                      <button
                        type="button"
                        onClick={() =>
                          updateAddOn(
                            addOn.id,
                            addOnQuantity - 1,
                            addOn.maxQuantity,
                          )
                        }
                        aria-label={`${addOn.name} 수량 줄이기`}
                      >
                        <Minus size={13} />
                      </button>
                      <span>{addOnQuantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateAddOn(
                            addOn.id,
                            addOnQuantity + 1,
                            addOn.maxQuantity,
                          )
                        }
                        aria-label={`${addOn.name} 수량 늘리기`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {error && !checkoutOpen ? (
              <p className="inline-error" role="alert">
                <Info size={16} />
                {error}
              </p>
            ) : null}

            <button className="primary-purchase" type="button" onClick={openCheckout}>
              <span>
                <small>마감 후 제작 · 순차 발송</small>
                주문하기
              </span>
              <span>
                {summary ? formatWon(summary.totalAmount) : formatWon(drop.basePrice)}
                <ArrowRight size={18} />
              </span>
            </button>

            <ul className="purchase-notes">
              <li>
                <CalendarDays size={17} />
                {new Intl.DateTimeFormat("ko-KR", {
                  month: "long",
                  day: "numeric",
                }).format(new Date(drop.shippingStartsAt))}
                부터 순차 발송
              </li>
              <li>
                <Truck size={17} />
                {formatWon(drop.freeShippingThreshold)} 이상 무료배송
              </li>
              <li>
                <ShieldCheck size={17} />
                실물 검수 후 판매하는 프리오더
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="story-band">
        <div className="story-copy">
          <span className="section-kicker">WHY THIS LOOK</span>
          <h2>고르는 시간은 줄이고,<br />입는 날은 늘렸어요.</h2>
          <p>{drop.description}</p>
          <dl className="model-info">
            <div>
              <dt>모델</dt>
              <dd>
                {drop.model.height} · {drop.model.weight}
              </dd>
            </div>
            <div>
              <dt>착용</dt>
              <dd>{drop.model.wearing} 사이즈</dd>
            </div>
            <div>
              <dt>구성</dt>
              <dd>가디건 · 티셔츠 · 팬츠</dd>
            </div>
          </dl>
        </div>
        <div className="detail-visual">
          <span className="texture fabric-one" />
          <span className="texture fabric-two" />
          <span className="texture fabric-three" />
          <p>soft layers<br />for little days</p>
        </div>
      </section>

      <div className="content-grid">
        <RewardProgress drop={drop} />
        <section className="product-details">
          <div className="section-heading">
            <div>
              <span className="section-kicker">DETAILS & CARE</span>
              <h2>오래 입기 위한 정보</h2>
            </div>
            <Sparkles size={22} />
          </div>
          <details open>
            <summary>
              소재와 세탁법
              <ChevronDown size={18} />
            </summary>
            <p>{drop.material}</p>
            <p>{drop.care}</p>
          </details>
          <details>
            <summary>
              프리오더와 배송
              <ChevronDown size={18} />
            </summary>
            <p>
              주문 마감 후 전체 수량을 발주합니다. 도매처 사정으로 품절될 경우
              해당 상품 금액을 전액 환불합니다.
            </p>
          </details>
          <details>
            <summary>
              교환과 반품
              <ChevronDown size={18} />
            </summary>
            <p>
              수령 후 7일 이내 신청할 수 있습니다. 착용·세탁하거나 상품 가치가
              훼손된 경우에는 처리가 어렵습니다.
            </p>
          </details>
        </section>
      </div>

      <div className="mobile-purchase-bar">
        <div>
          <small>{sizeId ? `${sizeId} 사이즈 · ${quantity}벌` : "사이즈를 선택해 주세요"}</small>
          <strong>
            {summary ? formatWon(summary.totalAmount) : formatWon(drop.basePrice)}
          </strong>
        </div>
        <button type="button" onClick={openCheckout}>
          주문하기
        </button>
      </div>

      {checkoutOpen && summary ? (
        <div className="checkout-overlay" role="presentation">
          <div className="checkout-backdrop" onClick={() => setCheckoutOpen(false)} />
          <section
            className="checkout-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
          >
            <div className="drawer-header">
              <div>
                <span className="section-kicker">GUEST CHECKOUT</span>
                <h2 id="checkout-title">주문서</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={() => setCheckoutOpen(false)}
                aria-label="주문서 닫기"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitOrder}>
              <div className="order-snapshot">
                <ProductFlatlay />
                <div>
                  <strong>{drop.title}</strong>
                  <span>{sizeId} 사이즈 · {quantity}벌</span>
                  <span>
                    추가 {Object.values(addOns).reduce((sum, value) => sum + value, 0)}개
                  </span>
                </div>
              </div>

              <div className="form-grid">
                <label>
                  주문자 이름
                  <input
                    required
                    autoComplete="name"
                    value={form.buyerName}
                    onChange={(event) =>
                      setForm({ ...form, buyerName: event.target.value })
                    }
                  />
                </label>
                <label>
                  휴대폰 번호
                  <input
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="01012345678"
                    value={form.buyerPhone}
                    onChange={(event) =>
                      setForm({ ...form, buyerPhone: event.target.value })
                    }
                  />
                </label>
                <label className="postal-field">
                  우편번호
                  <input
                    required
                    inputMode="numeric"
                    autoComplete="postal-code"
                    value={form.postalCode}
                    onChange={(event) =>
                      setForm({ ...form, postalCode: event.target.value })
                    }
                  />
                </label>
                <label className="wide-field">
                  주소
                  <input
                    required
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(event) =>
                      setForm({ ...form, address: event.target.value })
                    }
                  />
                </label>
                <label className="wide-field">
                  상세 주소
                  <input
                    autoComplete="address-line2"
                    value={form.addressDetail}
                    onChange={(event) =>
                      setForm({ ...form, addressDetail: event.target.value })
                    }
                  />
                </label>
                <label className="wide-field">
                  배송 메모
                  <select
                    value={form.deliveryNote}
                    onChange={(event) =>
                      setForm({ ...form, deliveryNote: event.target.value })
                    }
                  >
                    <option value="">배송 메모를 선택해 주세요</option>
                    <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                    <option value="배송 전 연락해주세요">배송 전 연락해주세요</option>
                    <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                  </select>
                </label>
              </div>

              <div className="consent-list">
                <label>
                  <input
                    type="checkbox"
                    checked={form.privacyConsent}
                    onChange={(event) =>
                      setForm({ ...form, privacyConsent: event.target.checked })
                    }
                  />
                  <span>
                    <strong>필수</strong> 주문·배송을 위한 개인정보 수집과 구매조건에
                    동의합니다.
                  </span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={form.marketingConsent}
                    onChange={(event) =>
                      setForm({ ...form, marketingConsent: event.target.checked })
                    }
                  />
                  <span>
                    <strong>선택</strong> 다음 드롭 공개 알림을 받습니다.
                  </span>
                </label>
              </div>

              <div className="payment-summary">
                <div>
                  <span>상품</span>
                  <strong>{formatWon(summary.mainItemsAmount + summary.addOnsAmount)}</strong>
                </div>
                <div>
                  <span>배송</span>
                  <strong>
                    {summary.shippingAmount === 0
                      ? "무료"
                      : formatWon(summary.shippingAmount)}
                  </strong>
                </div>
                <div className="payment-total">
                  <span>결제 예정 금액</span>
                  <strong>{formatWon(summary.totalAmount)}</strong>
                </div>
              </div>

              {error ? (
                <p className="inline-error" role="alert">
                  <Info size={16} />
                  {error}
                </p>
              ) : null}

              <button className="checkout-submit" disabled={submitting} type="submit">
                {submitting ? (
                  "주문을 만들고 있어요"
                ) : (
                  <>
                    데모 결제 완료
                    <span>{formatWon(summary.totalAmount)}</span>
                  </>
                )}
              </button>
              <p className="demo-payment-note">
                현재는 테스트 주문으로 즉시 결제 완료 처리됩니다. Toss 키를 연결하면
                이 단계가 실제 결제창으로 대체됩니다.
              </p>
            </form>
          </section>
        </div>
      ) : null}
    </main>
  );
}
