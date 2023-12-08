"use client"
import React from 'react'

export const getProductDetails = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/product/${id}`, {
            cache: 'no-store'
        })
        const parsed = await response.json()
        return parsed
    } catch (error) {
        console.log(error)
    }
}

const page = async ({ params }) => {
    const { product } = await getProductDetails(params.id)
    return (
        <>
            <div className='w-full min-h-screen flex flex-col justify-center items-center'>
                <div className='w-[500px] h-[500px] rounded-xl bg-red-700 flex flex-col justify-center items-center text-white'>
                    <div key={product.id} className="product-card">
                        <div className="product-details text-center">
                            <h2 className="text-white font-semibold product-name">{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price.toFixed(2)}</p>
                            <p className="product-category">Category: {product.category}</p>
                            <p className="product-brand">Brand: {product.brand}</p>
                            <p className="product-color">Color: {product.color}</p>
                            <p className={`product-availability ${product.availability ? 'available' : 'out-of-stock'}`}>
                                Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
                            </p>
                            <div className="product-rating">
                                <p>Rating: {product.rating}</p>
                                <div className="product-reviews">
                                    {product.reviews.map((review, index) => (
                                        <div key={index} className="review">
                                            <p className="review-user">{review.user}</p>
                                            <p className="review-comment">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page