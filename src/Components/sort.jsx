import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withConsumer } from '../Context.js'

class Sort extends Component {
	uniqueBrands = (products) => {
		return [ ...new Set(products.map((product) => product.brand)) ].sort()
	}

	render() {
		let { products } = this.props
		let { search, price, maxPrice, discount, freeShipping, freeReturn, handleChange } = this.props.context
		const all_brands = [ 'All', ...this.uniqueBrands(products) ]
		const all_sort = [ 'Defualt', 'Price: High - Low', 'Price: Low - High', 'Name: A - Z', 'Name: Z - A' ]

		return (
			<section className="sort">
				<h2 className="featureTitle">Our Products</h2>
				<form className="sortForm">
					<article className="sortFormPart">
						<label className="sortTitles" htmlFor="search">
							Search Products
						</label>
						<input className="inputSearch" name="search" onChange={handleChange} value={search} />
					</article>
					<article className="sortFormPart">
						<label className="sortTitles" htmlFor="brands">
							Brands
						</label>
						<select className="sortSelect" name="brands" onChange={handleChange}>
							{all_brands.map((brand, index) => (
								<option key={index} value={brand}>
									{brand}
								</option>
							))}
						</select>
					</article>
					<article className="sortFormPart">
						<label className="sortTitles" htmlFor="price">
							Products Price: &nbsp; ${price}
						</label>
						<input
							type="range"
							name="price"
							min={0}
							max={maxPrice}
							value={price}
							onChange={handleChange}
							step={1}
							className="sortInput"
						/>
					</article>
					<article className="sortFormPart">
						<div>
							<input type="checkbox" name="discount" checked={discount} onChange={handleChange} />
							<label htmlFor="discount" className="sortTitles1">
								Discount
							</label>
						</div>
						<div>
							<input type="checkbox" name="freeReturn" checked={freeReturn} onChange={handleChange} />
							<label htmlFor="freeReturn" className="sortTitles1">
								30 Days Warranty
							</label>
						</div>
						<div>
							<input type="checkbox" name="freeShipping" checked={freeShipping} onChange={handleChange} />
							<label htmlFor="freeShipping" className="sortTitles1">
								Free Shipping
							</label>
						</div>
					</article>
					<article className="sortFormPart">
						<label className="sortTitles" htmlFor="sort">
							Sorted By
						</label>
						<select className="sortSelect sortSelect1" onChange={handleChange} name="sort">
							{all_sort.map((sort, index) => (
								<option key={index} value={sort}>
									{sort}
								</option>
							))}
						</select>
					</article>
				</form>
			</section>
		)
	}
}

Sort.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			slug: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			discount: PropTypes.bool.isRequired,
			price: PropTypes.number.isRequired,
			lastPrice: PropTypes.number,
			brandPic: PropTypes.string.isRequired,
			photo: PropTypes.arrayOf(PropTypes.string).isRequired
		})
	)
}

export default withConsumer(Sort)
