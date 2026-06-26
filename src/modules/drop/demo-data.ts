import type { Drop } from "./types";

const now = new Date();
const closesAt = new Date(now);
closesAt.setDate(closesAt.getDate() + 5);
closesAt.setHours(23, 59, 59, 999);

const shippingStartsAt = new Date(closesAt);
shippingStartsAt.setDate(shippingStartsAt.getDate() + 10);

export const currentDrop: Drop = {
  id: "drop-12",
  slug: "forest-morning-look",
  sequence: 12,
  type: "WEEKLY_LOOK",
  status: "OPEN",
  title: "포레스트 모닝 룩",
  subtitle: "부드러운 색감과 편안한 움직임을 담은 이번 주 등원 코디",
  description:
    "아침마다 고민하지 않도록 색과 소재의 균형을 맞춘 한 벌입니다. 가디건, 티셔츠, 팬츠를 그대로 입혀도 좋고 날씨에 따라 한 겹씩 덜어 입힐 수 있습니다.",
  opensAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  closesAt: closesAt.toISOString(),
  shippingStartsAt: shippingStartsAt.toISOString(),
  basePrice: 49900,
  compareAtPrice: 59800,
  shippingPrice: 3000,
  freeShippingThreshold: 70000,
  paidQuantity: 0,
  targetQuantity: 120,
  publicRewardThreshold: 30,
  guaranteedBenefit: {
    badge: "전원",
    title: "방수 네임택 스티커 증정",
    description:
      "세트 주문마다 등원 가방과 물병에 붙이기 좋은 이름표를 함께 보내요.",
  },
  model: {
    height: "96cm",
    weight: "14kg",
    wearing: "100",
  },
  lookItems: [
    {
      id: "cardigan",
      label: "가디건",
      title: "크림 골지 가디건",
      included: true,
      tagPosition: { x: 36, y: 44 },
      previewColor: "#eee3ce",
      previewShape: "cardigan",
      description:
        "아침 기온에 맞춰 가볍게 걸치기 좋은 크림 톤 가디건입니다. 티셔츠와 팬츠 사이의 색감을 부드럽게 이어줍니다.",
      material: "면 92%, 폴리 8%",
      fit: "여유 있는 레이어드 핏",
      care: "찬물 단독 세탁, 그늘 건조",
      details: ["단추 여밈", "도톰한 골지 조직", "소매와 밑단 립 마감"],
    },
    {
      id: "shirt",
      label: "티셔츠",
      title: "세이지 코튼 티셔츠",
      included: true,
      tagPosition: { x: 55, y: 46 },
      previewColor: "#9daa8b",
      previewShape: "shirt",
      description:
        "피부에 닿는 면을 부드럽게 잡은 긴소매 티셔츠입니다. 단독으로 입어도 코디의 중심색이 유지됩니다.",
      material: "면 100%",
      fit: "몸에 붙지 않는 기본 핏",
      care: "찬물 세탁, 낮은 온도 다림질",
      details: ["라운드 넥", "부드러운 터치감", "가디건 안쪽 배색 포인트"],
    },
    {
      id: "pants",
      label: "팬츠",
      title: "차콜 코튼 팬츠",
      included: true,
      tagPosition: { x: 51, y: 69 },
      previewColor: "#42413d",
      previewShape: "pants",
      description:
        "움직임이 많은 등원 시간에도 편한 밴딩 팬츠입니다. 밝은 상의와 균형이 맞도록 차분한 차콜로 골랐습니다.",
      material: "면 97%, 스판 3%",
      fit: "발목에 살짝 모이는 스트레이트 핏",
      care: "뒤집어 세탁, 건조기 사용 금지",
      details: ["허리 밴딩", "롤업 가능한 밑단", "활동성을 위한 스판 혼방"],
    },
  ],
  material: "상의 면 100%, 가디건 면 92% 폴리 8%, 하의 면 97% 스판 3%",
  care: "찬물 단독 세탁, 건조기 사용 금지, 그늘 건조",
  sizeOptions: [
    { id: "90", label: "90", detail: "키 85-92cm", price: 49900, available: true },
    { id: "100", label: "100", detail: "키 92-100cm", price: 49900, available: true },
    { id: "110", label: "110", detail: "키 100-108cm", price: 49900, available: true },
    { id: "120", label: "120", detail: "키 108-116cm", price: 51900, available: true },
  ],
  addOns: [
    {
      id: "socks",
      name: "아이보리 골지 양말",
      description: "코디 사진과 같은 톤의 미끄럼 방지 양말",
      price: 4900,
      imageTone: "ivory",
      maxQuantity: 2,
    },
    {
      id: "mini-bag",
      name: "포레스트 미니백",
      description: "가벼운 등원 소품을 담는 캔버스 미니백",
      price: 15900,
      imageTone: "green",
      maxQuantity: 1,
    },
    {
      id: "gift-wrap",
      name: "선물 포장",
      description: "메시지 카드가 포함된 재사용 포장백",
      price: 3000,
      imageTone: "charcoal",
      maxQuantity: 1,
    },
  ],
  rewards: [
    {
      threshold: 30,
      title: "패브릭 리본 포장",
      description: "모든 주문을 패브릭 리본으로 마감해요.",
    },
    {
      threshold: 70,
      title: "코디 양말 1켤레 증정",
      description: "세트 주문마다 아이보리 양말을 무료로 챙겨요.",
    },
    {
      threshold: 120,
      title: "다음 드롭 3,000원",
      description: "다음 한 벌에 사용할 수 있는 쿠폰을 드려요.",
    },
  ],
  palette: ["#e9e4d9", "#8d9b7b", "#3e433d", "#f6f3ec"],
};

export const archivedDrops = [
  {
    slug: "rainy-day-play",
    sequence: 11,
    title: "레인 데이 플레이 룩",
    type: "Weekly Look",
    result: 87,
    palette: ["#cfd8d3", "#dfbe5c", "#34433e"],
  },
  {
    slug: "tiny-traveler-bag",
    sequence: 10,
    title: "타이니 트래블러 백",
    type: "Special Drop",
    result: 124,
    palette: ["#c9795a", "#f0e9da", "#4e5a55"],
  },
  {
    slug: "blue-picnic-look",
    sequence: 9,
    title: "블루 피크닉 룩",
    type: "Weekly Look",
    result: 63,
    palette: ["#6f8da3", "#f4eee4", "#d35646"],
  },
];
