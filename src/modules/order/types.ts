export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "SUPPLIER_ORDERED"
  | "RECEIVED"
  | "PACKING"
  | "SHIPPED"
  | "DELIVERED"
  | "EXPIRED"
  | "CANCEL_REQUESTED"
  | "CANCELLED";

export type DemoOrder = {
  orderNumber: string;
  publicToken: string;
  status: OrderStatus;
  createdAt: string;
  buyerName: string;
  phoneLast4: string;
  dropTitle: string;
  sizeId: string;
  quantity: number;
  addOns: Array<{ name: string; quantity: number }>;
  totalAmount: number;
  shippingStartsAt: string;
};
