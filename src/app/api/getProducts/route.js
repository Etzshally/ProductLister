import { NextResponse } from "next/server";
import { query } from "@/lib/db";
// import { promises as fs } from 'fs';

// export const GET = async (request) => {
//   const file = await fs.readFile(process.cwd() + '/public/data/items.json', 'utf8');
//   return NextResponse.json(JSON.parse(file))
// }

export const GET = async (request) => {
  try {
    const productsWithReviews = await query({
      query: `
        SELECT p.*, r.user, r.comment
        FROM products p
        LEFT JOIN reviews r ON p.id = r.p_id
      `
    });

    if (productsWithReviews) {
      const productsWithGroupedReviews = productsWithReviews.reduce((acc, product) => {
        const existingProduct = acc.find((p) => p.id === product.id);
        if (existingProduct) {
          existingProduct.reviews.push({
            user: product.user,
            comment: product.comment,
          });
        } else {
          acc.push({
            ...product,
            reviews: product.user ? [{ user: product.user, comment: product.comment }] : [],
          });
        }
        return acc;
      }, []);

      return NextResponse.json(productsWithGroupedReviews, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data from the database." }, { status: 500 });
  }
};
