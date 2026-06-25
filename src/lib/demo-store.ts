import type { DemoOrder } from "@/modules/order/types";

declare global {
  var __hanbeolOrders: Map<string, DemoOrder> | undefined;
  var __hanbeolSubscribers: Set<string> | undefined;
}

export const demoOrders =
  globalThis.__hanbeolOrders ?? new Map<string, DemoOrder>();
export const demoSubscribers =
  globalThis.__hanbeolSubscribers ?? new Set<string>();

if (process.env.NODE_ENV !== "production") {
  globalThis.__hanbeolOrders = demoOrders;
  globalThis.__hanbeolSubscribers = demoSubscribers;
}
