import { z } from "zod";
import type { Drop } from "@/modules/drop/types";

export const checkoutSelectionSchema = z.object({
  sizeId: z.string().min(1),
  quantity: z.number().int().min(1).max(3),
  addOns: z.record(z.string(), z.number().int().min(0)).default({}),
});

export type CheckoutSelection = z.infer<typeof checkoutSelectionSchema>;

export type PriceSummary = {
  mainItemsAmount: number;
  addOnsAmount: number;
  shippingAmount: number;
  totalAmount: number;
};

export function calculatePrice(
  drop: Drop,
  input: CheckoutSelection,
): PriceSummary {
  const selection = checkoutSelectionSchema.parse(input);
  const size = drop.sizeOptions.find(
    (option) => option.id === selection.sizeId && option.available,
  );

  if (!size) {
    throw new Error("판매 가능한 사이즈를 선택해 주세요.");
  }

  const mainItemsAmount = size.price * selection.quantity;
  const addOnsAmount = drop.addOns.reduce((sum, addOn) => {
    const quantity = selection.addOns[addOn.id] ?? 0;

    if (quantity > addOn.maxQuantity) {
      throw new Error(`${addOn.name}은 최대 ${addOn.maxQuantity}개까지 선택할 수 있습니다.`);
    }

    return sum + addOn.price * quantity;
  }, 0);
  const itemsAmount = mainItemsAmount + addOnsAmount;
  const shippingAmount =
    itemsAmount >= drop.freeShippingThreshold ? 0 : drop.shippingPrice;

  return {
    mainItemsAmount,
    addOnsAmount,
    shippingAmount,
    totalAmount: itemsAmount + shippingAmount,
  };
}

export function formatWon(amount: number) {
  return `${new Intl.NumberFormat("ko-KR").format(amount)}원`;
}
