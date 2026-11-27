import { NextResponse } from "next/server";
import { resetCases, listCases } from "@/lib/store";

export async function POST() {
  resetCases();
  return NextResponse.json({ ok: true, cases: listCases() });
}
