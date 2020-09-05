import React from 'react'

import { withConsumer } from '../Context'
import Hero from '../Components/hero.jsx'
import Sort from '../Components/sort.jsx'
import Product from '../Components/product.jsx'
import Load from '../Components/load.jsx'

function ProductsPage({ context }) {
	let {
		products,
		sortedProducts,
		load,
		isCartOpen,
		cartOpen,
		cartCountFlash,
		closeList,
		cartCanOpen,
		cartClose
	} = context

	const product = sortedProducts.map((product) => (
		<Product
			key={product.slug}
			product={product}
			isCartOpen={isCartOpen}
			cartOpen={cartOpen}
			cartCountFlash={cartCountFlash}
			closeList={closeList}
			cartCanOpen={cartCanOpen}
			cartClose={cartClose}
		/>
	))

	return (
		<div className="productsPage">
			<Hero title="Explore Our Amazing Products" path="/" banner="Return Home" class="product" />
			<Sort products={products} />
			{load ? <Load /> : <div className="productsPageInfo"> {product} </div>}
		</div>
	)
}

export default withConsumer(ProductsPage)
