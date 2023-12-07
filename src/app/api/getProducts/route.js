import { NextResponse } from "next/server";
import { promises as fs } from 'fs';

export async function GET(request) {
  const file = await fs.readFile(process.cwd() + '/public/data/items.json', 'utf8');
  return NextResponse.json(JSON.parse(file))
}