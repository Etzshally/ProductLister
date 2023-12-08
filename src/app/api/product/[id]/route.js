import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';

export const GET = async (NextRequest) => {
  const id = NextRequest.url.split('product/')[1];
  const file = await fs.readFile(process.cwd() + '/public/data/items.json', 'utf8');
  const {products} = JSON.parse(file);
  const product = products && products.find((product) => product.id === parseInt(id, 10));
  if (product) {
    return NextResponse.json({ product },{status:200});
  } else {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}

export const DELETE = async (NextRequest) => {
  const id = NextRequest.url.split('product/')[1];
  return NextResponse.json(`Product: ${id}`)
}