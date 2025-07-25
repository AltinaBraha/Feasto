import { NextResponse } from "next/server";
import secrets from "@/data/about-us.json";

export async function GET() {
  return NextResponse.json(secrets);
}
