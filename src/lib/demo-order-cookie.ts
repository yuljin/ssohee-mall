import type { DemoOrder } from "@/modules/order/types";

export const DEMO_ORDER_COOKIE_PREFIX = "hanbeol_order_";

export function getDemoOrderCookieName(publicToken: string) {
  return `${DEMO_ORDER_COOKIE_PREFIX}${publicToken}`;
}

export function encodeDemoOrder(order: DemoOrder) {
  return Buffer.from(JSON.stringify(order), "utf8").toString("base64url");
}

export function decodeDemoOrder(value: string | undefined) {
  if (!value) return null;

  try {
    const parsed = JSON.parse(
      Buffer.from(value, "base64url").toString("utf8"),
    ) as Partial<DemoOrder>;

    if (
      typeof parsed.orderNumber !== "string" ||
      typeof parsed.publicToken !== "string" ||
      typeof parsed.buyerName !== "string" ||
      typeof parsed.phoneLast4 !== "string" ||
      typeof parsed.dropTitle !== "string" ||
      typeof parsed.sizeId !== "string" ||
      typeof parsed.quantity !== "number" ||
      typeof parsed.totalAmount !== "number" ||
      typeof parsed.shippingStartsAt !== "string" ||
      !Array.isArray(parsed.addOns)
    ) {
      return null;
    }

    return parsed as DemoOrder;
  } catch {
    return null;
  }
}
