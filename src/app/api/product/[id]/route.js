import { query } from "@/lib/db";
import { NextResponse } from "next/server";
// import { NextRequest, NextResponse } from "next/server";
// import { promises as fs } from 'fs';

// export const GET = async (NextRequest) => {
//   const id = NextRequest.url.split('product/')[1];
//   const file = await fs.readFile(process.cwd() + '/public/data/items.json', 'utf8');
//   const {products} = JSON.parse(file);
//   const product = products && products.find((product) => product.id === parseInt(id, 10));
//   if (product) {
//     return NextResponse.json({ product },{status:200});
//   } else {
//     return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//   }
// }

// export const DELETE = async (NextRequest) => {
//   const id = NextRequest.url.split('product/')[1];
//   return NextResponse.json(`Product: ${id}`)
// }

export const GET = async (request) => {
  try {
    const id = request.url.split('product/')[1];
    const productsWithReviews = await query({
      query: `
        SELECT p.id, p.name, p.description, p.price, p.category, p.brand, p.color, p.availability, p.rating, r.user, r.comment
        FROM products p
        LEFT JOIN reviews r ON p.id = r.p_id
        WHERE p.id = ${id}
      `
    });

    if (productsWithReviews.length > 0) {
      const productWithGroupedReviews = productsWithReviews.reduce((acc, row) => {
        const existingProduct = acc.find((p) => p.id === row.id);
        const review = row.user ? { user: row.user, comment: row.comment } : null;

        if (existingProduct) {
          if (review) {
            existingProduct.reviews.push(review);
          }
        } else {
          acc.push({
            id: row.id,
            name: row.name,
            description: row.description,
            price: row.price,
            category: row.category,
            brand: row.brand,
            color: row.color,
            availability: row.availability,
            rating: row.rating,
            reviews: review ? [review] : [],
          });
        }
        return acc;
      }, []);

      return NextResponse.json({ "product": productWithGroupedReviews }, { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

