import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const POST = async (request) => {
    try {
        const { name, description, price, category, brand, color, availability, rating } = await request.json()
        const result = await query({
            query: "INSERT INTO products (name,description,price,category,brand,color,availability,rating) VALUES (?,?,?,?,?,?,?,?)",
            values: [name, description, price, category, brand, color, availability, rating],
        })
        if (result.insertId) {
            return NextResponse.json({"Added with success":result.insertId}, { message: "success" }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json(JSON.stringify(error))
    }
}