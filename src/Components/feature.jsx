import React, { Component } from 'react'

import { withConsumer } from '../Context'
import Load from './load'
import Product from './product'

class Feature extends Component {
	render() {
		const { featureProducts, load } = this.props.context
		const product = featureProducts.map((product) => <Product key={product.slug} product={product} />)

		return (
			<section className="feature">
				<h2 className="featureTitle">Most Popular</h2>
				{load ? <Load /> : <div className="featureInfo"> {product} </div>}
			</section>
		)
	}
}

export default withConsumer(Feature)
