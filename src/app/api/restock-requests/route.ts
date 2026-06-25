import { NextResponse } from "next/server";
import { z } from "zod";
import { demoSubscribers } from "@/lib/demo-store";

const requestSchema = z.object({
  dropSlug: z.string().min(3).max(80),
  phone: z
    .string()
    .transform((value) => value.replaceAll(/\D/g, ""))
    .pipe(z.string().regex(/^01[016789]\d{7,8}$/)),
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: "invalid request" }, { status: 400 });
  }

  demoSubscribers.add(`${parsed.data.dropSlug}:${parsed.data.phone}`);

  return NextResponse.json({ ok: true }, { status: 201 });
}
