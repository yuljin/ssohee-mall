import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { demoOrders } from "@/lib/demo-store";
import {
  decodeDemoOrder,
  DEMO_ORDER_COOKIE_PREFIX,
} from "@/lib/demo-order-cookie";

const lookupSchema = z.object({
  orderNumber: z.string().trim().min(10).max(30),
  phoneLast4: z.string().regex(/^\d{4}$/),
});

export async function POST(request: NextRequest) {
  const parsed = lookupSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { message: "주문번호와 휴대폰 뒤 4자리를 확인해 주세요." },
      { status: 400 },
    );
  }

  const cookieOrders = request.cookies
    .getAll()
    .filter((cookie) => cookie.name.startsWith(DEMO_ORDER_COOKIE_PREFIX))
    .map((cookie) => decodeDemoOrder(cookie.value))
    .filter((order) => order !== null);
  const order = [...demoOrders.values(), ...cookieOrders].find(
    (candidate) =>
      candidate.orderNumber === parsed.data.orderNumber &&
      candidate.phoneLast4 === parsed.data.phoneLast4,
  );

  if (!order) {
    return NextResponse.json(
      { message: "일치하는 데모 주문을 찾지 못했습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({ orderUrl: `/orders/${order.publicToken}` });
}
