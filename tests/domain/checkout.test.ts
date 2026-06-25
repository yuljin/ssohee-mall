import { describe, expect, it } from "vitest";
import { calculatePrice } from "@/modules/checkout/domain";
import { currentDrop } from "@/modules/drop/demo-data";

describe("calculatePrice", () => {
  it("adds shipping below the free-shipping threshold", () => {
    expect(
      calculatePrice(currentDrop, {
        sizeId: "100",
        quantity: 1,
        addOns: {},
      }),
    ).toEqual({
      mainItemsAmount: 49900,
      addOnsAmount: 0,
      shippingAmount: 3000,
      totalAmount: 52900,
    });
  });

  it("removes shipping when items reach the threshold", () => {
    const result = calculatePrice(currentDrop, {
      sizeId: "100",
      quantity: 1,
      addOns: { "mini-bag": 1, socks: 1 },
    });

    expect(result.totalAmount).toBe(70700);
    expect(result.shippingAmount).toBe(0);
  });

  it("uses the selected size price", () => {
    const result = calculatePrice(currentDrop, {
      sizeId: "120",
      quantity: 1,
      addOns: {},
    });

    expect(result.mainItemsAmount).toBe(51900);
  });

  it("rejects an add-on quantity over its limit", () => {
    expect(() =>
      calculatePrice(currentDrop, {
        sizeId: "100",
        quantity: 1,
        addOns: { "mini-bag": 2 },
      }),
    ).toThrow("포레스트 미니백은 최대 1개까지");
  });

  it("rejects an unavailable size", () => {
    expect(() =>
      calculatePrice(currentDrop, {
        sizeId: "999",
        quantity: 1,
        addOns: {},
      }),
    ).toThrow("판매 가능한 사이즈");
  });
});
