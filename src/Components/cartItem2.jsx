import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { INCREASE, DECREASE, REMOVE } from '../Redux/action.js'
import { myContext } from '../Context.js'

class CartItem2 extends Component {
	static contextType = myContext

	trigger = (closeList, cartCanOpen, cartClose) => {
		closeList()
		cartCanOpen()
		cartClose()
	}

	render() {
		const { eachItem } = this.props
		const { products, closeList, cartCanOpen, cartClose } = this.context
		const product = products.filter((eachProduct) => eachProduct.slug === eachItem.slug)
		const { slug, name, photo } = product[0]

		return (
			<article className="cart2">
				<div className="cartItem2">
					<Link
						to={`/products/:${slug}`}
						className="cartLink"
						onClick={() => {
							this.trigger(closeList, cartCanOpen, cartClose)
						}}
					>
						<img src={photo[0]} alt="Product" className="cartItemPhoto2" />
					</Link>
					<Link
						to={`/products/:${slug}`}
						className="cartLink"
						onClick={() => {
							this.trigger(closeList, cartCanOpen, cartClose)
						}}
					>
						<h6 className="cartItemName2">{name}</h6>
					</Link>
				</div>
				<div className="cartItemMain">
					<div className="cartPrice2">${eachItem.totalPrice}</div>
					<div className="cartAmountBox2">
						<div className="cartAmountTrigger2" onClick={() => this.props.decrease()}>
							-
						</div>
						<div className="cartAmount2">{eachItem.productAmount}</div>
						<div className="cartAmountTrigger2" onClick={() => this.props.increase()}>
							+
						</div>
					</div>
					<div className="cartRemove2" onClick={() => this.props.remove()}>
						Remove
					</div>
				</div>
			</article>
		)
	}
}

CartItem2.propTypes = {
	eachItem: PropTypes.shape({
		slug: PropTypes.number.isRequired,
		totalPrice: PropTypes.number.isRequired,
		productAmount: PropTypes.number.isRequired
	})
}

const mapDispatchToProps = (dispatch, ownerProps) => {
	const { slug, productAmount, totalPrice } = ownerProps.eachItem
	const price = totalPrice / productAmount

	return {
		increase: () => dispatch({ type: INCREASE, payload: { slug, price } }),
		decrease: () => dispatch({ type: DECREASE, payload: { slug, price } }),
		remove: () => dispatch({ type: REMOVE, payload: { slug } })
	}
}

export default connect(null, mapDispatchToProps)(CartItem2)
