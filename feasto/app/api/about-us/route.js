import { NextResponse } from "next/server";
import secrets from "@/app/data/about-us.json";

export async function GET() {
  return NextResponse.json(secrets);
}
