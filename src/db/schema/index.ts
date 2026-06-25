import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const dropStatus = pgEnum("drop_status", [
  "DRAFT",
  "SCHEDULED",
  "OPEN",
  "CLOSED",
  "ORDERING",
  "FULFILLING",
  "COMPLETED",
  "CANCELLED",
]);

export const orderStatus = pgEnum("order_status", [
  "PENDING_PAYMENT",
  "PAID",
  "SUPPLIER_ORDERED",
  "RECEIVED",
  "PACKING",
  "SHIPPED",
  "DELIVERED",
  "EXPIRED",
  "CANCEL_REQUESTED",
  "CANCELLED",
]);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  productType: text("product_type").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("ACTIVE"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const productVariants = pgTable("product_variants", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  sku: text("sku").notNull().unique(),
  optionValues: jsonb("option_values").notNull(),
  costPrice: integer("cost_price").notNull(),
  defaultSalePrice: integer("default_sale_price").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const drops = pgTable("drops", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  status: dropStatus("status").notNull().default("DRAFT"),
  opensAt: timestamp("opens_at", { withTimezone: true }).notNull(),
  closesAt: timestamp("closes_at", { withTimezone: true }).notNull(),
  shippingStartsAt: timestamp("shipping_starts_at", { withTimezone: true }),
  heroImagePath: text("hero_image_path").notNull(),
  content: jsonb("content").notNull(),
  finalPaidQuantity: integer("final_paid_quantity"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const dropItems = pgTable("drop_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  dropId: uuid("drop_id")
    .notNull()
    .references(() => drops.id),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  role: text("role").notNull(),
  displayName: text("display_name").notNull(),
  isRequired: boolean("is_required").notNull().default(false),
  maxQuantity: integer("max_quantity").notNull().default(1),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const dropVariants = pgTable("drop_variants", {
  id: uuid("id").primaryKey().defaultRandom(),
  dropItemId: uuid("drop_item_id")
    .notNull()
    .references(() => dropItems.id),
  productVariantId: uuid("product_variant_id")
    .notNull()
    .references(() => productVariants.id),
  salePrice: integer("sale_price").notNull(),
  purchaseLimit: integer("purchase_limit"),
  isAvailable: boolean("is_available").notNull().default(true),
});

export const rewardTiers = pgTable(
  "reward_tiers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    dropId: uuid("drop_id")
      .notNull()
      .references(() => drops.id),
    thresholdQuantity: integer("threshold_quantity").notNull(),
    rewardType: text("reward_type").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [
    uniqueIndex("reward_tier_drop_threshold_unique").on(
      table.dropId,
      table.thresholdQuantity,
    ),
  ],
);

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderNumber: text("order_number").notNull().unique(),
  publicToken: text("public_token").notNull().unique(),
  dropId: uuid("drop_id")
    .notNull()
    .references(() => drops.id),
  status: orderStatus("status").notNull().default("PENDING_PAYMENT"),
  itemsAmount: integer("items_amount").notNull(),
  shippingAmount: integer("shipping_amount").notNull(),
  discountAmount: integer("discount_amount").notNull().default(0),
  totalAmount: integer("total_amount").notNull(),
  buyerName: text("buyer_name").notNull(),
  buyerPhone: text("buyer_phone").notNull(),
  buyerEmail: text("buyer_email"),
  recipientName: text("recipient_name").notNull(),
  recipientPhone: text("recipient_phone").notNull(),
  postalCode: text("postal_code").notNull(),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  deliveryNote: text("delivery_note"),
  marketingConsent: boolean("marketing_consent").notNull().default(false),
  paymentExpiresAt: timestamp("payment_expires_at", { withTimezone: true }).notNull(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id),
  dropItemId: uuid("drop_item_id").references(() => dropItems.id),
  productVariantId: uuid("product_variant_id").references(() => productVariants.id),
  sku: text("sku").notNull(),
  itemName: text("item_name").notNull(),
  optionSnapshot: jsonb("option_snapshot").notNull(),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
  lineAmount: integer("line_amount").notNull(),
});

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id),
  provider: text("provider").notNull().default("TOSS"),
  providerPaymentKey: text("provider_payment_key").unique(),
  providerOrderId: text("provider_order_id").notNull().unique(),
  status: text("status").notNull(),
  method: text("method"),
  approvedAmount: integer("approved_amount").notNull().default(0),
  cancelledAmount: integer("cancelled_amount").notNull().default(0),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  rawSummary: jsonb("raw_summary"),
});
