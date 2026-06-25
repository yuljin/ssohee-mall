import { describe, expect, it } from "vitest";
import {
  decodeDemoOrder,
  encodeDemoOrder,
} from "@/lib/demo-order-cookie";
import type { DemoOrder } from "@/modules/order/types";

const order: DemoOrder = {
  orderNumber: "HB260626-DEMO1234",
  publicToken: "demo-token",
  status: "PAID",
  createdAt: "2026-06-26T00:00:00.000Z",
  buyerName: "김한별",
  phoneLast4: "5678",
  dropTitle: "포레스트 모닝 룩",
  sizeId: "100",
  quantity: 1,
  addOns: [{ name: "포레스트 미니백", quantity: 1 }],
  totalAmount: 68800,
  shippingStartsAt: "2026-07-10T00:00:00.000Z",
};

describe("demo order cookie", () => {
  it("round-trips a non-sensitive demo order summary", () => {
    expect(decodeDemoOrder(encodeDemoOrder(order))).toEqual(order);
  });

  it("rejects malformed values", () => {
    expect(decodeDemoOrder("not-an-order")).toBeNull();
  });
});
