import { NextResponse } from "next/server";
import { z } from "zod";
import { calculatePrice, checkoutSelectionSchema } from "@/modules/checkout/domain";
import { currentDrop } from "@/modules/drop/demo-data";
import { demoOrders, demoSubscribers } from "@/lib/demo-store";
import { createOrderNumber, createPublicToken } from "@/lib/ids";

const orderRequestSchema = z.object({
  selection: checkoutSelectionSchema,
  customer: z.object({
    buyerName: z.string().trim().min(2).max(30),
    buyerPhone: z
      .string()
      .transform((value) => value.replaceAll(/\D/g, ""))
      .pipe(z.string().regex(/^01[016789]\d{7,8}$/)),
    postalCode: z.string().trim().min(5).max(7),
    address: z.string().trim().min(5).max(120),
    addressDetail: z.string().trim().max(120),
    deliveryNote: z.string().trim().max(100),
    privacyConsent: z.literal(true),
    marketingConsent: z.boolean(),
  }),
});

export async function POST(request: Request) {
  try {
    const payload = orderRequestSchema.parse(await request.json());
    const summary = calculatePrice(currentDrop, payload.selection);
    const publicToken = createPublicToken();
    const orderNumber = createOrderNumber();

    demoOrders.set(publicToken, {
      orderNumber,
      publicToken,
      status: "PAID",
      createdAt: new Date().toISOString(),
      buyerName: payload.customer.buyerName,
      phoneLast4: payload.customer.buyerPhone.slice(-4),
      dropTitle: currentDrop.title,
      sizeId: payload.selection.sizeId,
      quantity: payload.selection.quantity,
      addOns: currentDrop.addOns
        .map((addOn) => ({
          name: addOn.name,
          quantity: payload.selection.addOns[addOn.id] ?? 0,
        }))
        .filter((addOn) => addOn.quantity > 0),
      totalAmount: summary.totalAmount,
      shippingStartsAt: currentDrop.shippingStartsAt,
    });

    if (payload.customer.marketingConsent) {
      demoSubscribers.add(payload.customer.buyerPhone);
    }

    return NextResponse.json(
      {
        orderNumber,
        publicToken,
        orderUrl: `/orders/${publicToken}`,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "입력한 주문 정보를 다시 확인해 주세요." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "주문 생성 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
