"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { type CSSProperties, useState } from "react";
import { createPortal } from "react-dom";
import type { Drop, LookItem } from "@/modules/drop/types";

type ProductFlatlayProps = {
  drop: Pick<Drop, "lookItems" | "title">;
  interactive?: boolean;
};

export function ProductFlatlay({ drop, interactive = true }: ProductFlatlayProps) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const activeItem =
    interactive && activeItemId
      ? drop.lookItems.find((item) => item.id === activeItemId) ?? null
      : null;
  const canUsePortal = typeof document !== "undefined";

  return (
    <>
      <div
        className="product-flatlay product-photo"
      >
        <Image
          src="/images/forest-morning-look-model.png"
          alt="크림 가디건, 세이지 티셔츠, 차콜 팬츠와 그린 미니백을 착용한 아이"
          fill
          priority
          sizes="(max-width: 820px) 100vw, 58vw"
        />
        {interactive ? (
          <div className="look-tag-layer" aria-label={`${drop.title} 구성품 상세`}>
            {drop.lookItems.map((item) => (
              <button
                className="look-tag"
                key={item.id}
                type="button"
                style={{
                  left: `${item.tagPosition.x}%`,
                  top: `${item.tagPosition.y}%`,
                }}
                onClick={() => setActiveItemId(item.id)}
                aria-label={`${item.label} 평면 상세 보기`}
              >
                <span className="look-tag-dot" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {activeItem && canUsePortal
        ? createPortal(
            <ItemDetailOverlay
              item={activeItem}
              onClose={() => setActiveItemId(null)}
            />,
            document.body,
          )
        : null}
    </>
  );
}

function ItemDetailOverlay({
  item,
  onClose,
}: {
  item: LookItem;
  onClose: () => void;
}) {
  return (
    <div className="item-detail-overlay" role="presentation">
      <button
        className="item-detail-backdrop"
        type="button"
        onClick={onClose}
        aria-label="아이템 상세 닫기"
      />
      <section
        className="item-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`item-detail-title-${item.id}`}
      >
        <div className="drawer-header">
          <div>
            <span className="section-kicker">ITEM DETAIL</span>
            <h2 id={`item-detail-title-${item.id}`}>{item.title}</h2>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="아이템 상세 닫기"
            title="아이템 상세 닫기"
          >
            <X size={19} />
          </button>
        </div>

        <FlatItemMedia item={item} />

        <div className="item-detail-copy">
          <span className={item.included ? "included" : ""}>
            {item.included ? "세트 포함" : "선택 추가"}
          </span>
          <p>{item.description}</p>
        </div>

        <dl className="item-detail-specs">
          <div>
            <dt>소재</dt>
            <dd>{item.material}</dd>
          </div>
          <div>
            <dt>핏</dt>
            <dd>{item.fit}</dd>
          </div>
          <div>
            <dt>관리</dt>
            <dd>{item.care}</dd>
          </div>
        </dl>

        <ul className="item-detail-list">
          {item.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function FlatItemMedia({ item }: { item: LookItem }) {
  if (item.flatImage) {
    return (
      <div className="item-flat-media">
        <Image
          src={item.flatImage}
          alt={item.flatImageAlt ?? `${item.title} 평면 사진`}
          fill
          sizes="(max-width: 820px) 92vw, 460px"
        />
      </div>
    );
  }

  return (
    <div
      className={`item-flat-media item-flat-fallback shape-${item.previewShape}`}
      role="img"
      aria-label={`${item.title} 평면 프리뷰`}
      style={{ "--item-color": item.previewColor } as CSSProperties}
    >
      <span className="flat-garment" aria-hidden="true">
        <span className="flat-sleeve left" />
        <span className="flat-sleeve right" />
        <span className="flat-body" />
        <span className="flat-neck" />
      </span>
    </div>
  );
}
