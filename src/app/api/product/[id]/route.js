import { NextRequest, NextResponse } from "next/server";
// import { promises as fs } from 'fs';

export const GET = async (NextRequest) => {
  const id  = NextRequest.url.split('product/')[1];
  console.log("get id is",id)
  return NextResponse.json(`Product: ${id}`)
}

export const DELETE = async (NextRequest) => {
  const id  = NextRequest.url.split('product/')[1];
  console.log("delete id is",id)
  return NextResponse.json(`Product: ${id}`)
}