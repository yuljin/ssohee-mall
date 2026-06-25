import Image from "next/image";

export function ProductFlatlay() {
  return (
    <div
      className="product-flatlay product-photo"
      role="img"
      aria-label="크림 가디건, 세이지 티셔츠, 차콜 팬츠와 그린 미니백을 착용한 아이"
    >
      <Image
        src="/images/forest-morning-look-model.png"
        alt=""
        fill
        priority
        sizes="(max-width: 820px) 100vw, 58vw"
      />
    </div>
  );
}
