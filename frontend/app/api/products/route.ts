import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? "";

  const backend = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  try {
    const resp = await fetch(
      `${backend}/api/products?category=${encodeURIComponent(category)}`,
      { cache: "no-store" }
    );

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json(
        { error: "Backend error", detail: text },
        { status: resp.status }
      );
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Proxy fetch failed", detail: String(err) },
      { status: 500 }
    );
  }
}
