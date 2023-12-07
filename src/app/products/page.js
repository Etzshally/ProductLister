import Link from 'next/link'

export const getProducts = async () => {
  const res = await fetch('http://localhost:3000/api/getProducts', {
    cache: "no-store",
  })
  const products = await res.json()
  return products.products
}

const page = async () => {
  const products = await getProducts()
  return (
    <div>
      {products && products.map((product) => (
        <>
          <Link href={`/product/${product.id}`}>
            <div className='mt-10 mb-10' key={product.id}>
              <p>product {product.id} details</p>
              <p>name: {product.name}</p>
            </div>
          </Link>
        </>
      ))}
    </div>
  )
}

export default page
