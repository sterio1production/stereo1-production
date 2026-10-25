import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const quoteSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(20),
  eventType: z.string().trim().min(1).max(80),
  eventDate: z.string().trim().max(40).optional().default(""),
  venue: z.string().trim().min(2).max(200),
  message: z.string().trim().min(5).max(2000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid form data" },
        { status: 400 }
      );
    }

    const quote = await db.quoteRequest.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        eventType: parsed.data.eventType,
        eventDate: parsed.data.eventDate ?? "",
        venue: parsed.data.venue,
        message: parsed.data.message,
      },
    });

    return NextResponse.json({ ok: true, id: quote.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save quote request:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
