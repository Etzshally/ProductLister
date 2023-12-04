import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Hello from Shahpaal :)" }, { status: 200 });
};