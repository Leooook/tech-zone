import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { RiHandbagFill } from 'react-icons/ri'

import { myContext } from '../Context'
import CartItem2 from '../Components/cartItem2'

class Cart extends Component {
	static contextType = myContext

	trigger = (openList, cartCanOpen, cartClose) => {
		openList()
		cartCanOpen()
		cartClose()
	}

	render() {
		let { closeList, cartClose, cartCanOpen } = this.context
		const { cart, total } = this.props
		return (
			<div className="cartPage">
				{cart.length === 0 ? (
					<div className="cartPageEmptyPart">
						<p className="cartPageEmpty">There are no items in your cart</p>
						<Link
							to={`/products`}
							className="cartPageLink"
							onClick={() => {
								closeList()
								cartCanOpen()
								cartClose()
							}}
						>
							<p className="cartPageButton">Continue Shopping</p>
						</Link>
					</div>
				) : (
					<div className="cartPagePart">
						<h3 className="cartPageTitle">Cart Summary</h3>
						<div className="cartPageItem">
							{cart.map((eachItem) => (
								<CartItem2 key={eachItem.slug} eachItem={eachItem} cartClass="cart2" />
							))}
						</div>
						<div className="cartPageDiv">
							<div className="cartPagePriceDiv">
								<p className="cartPageTitle1">Subtotal</p>
								<p className="cartPageTitle1">${total}</p>
							</div>
							<div className="cartPageInfoDiv">
								<p className="cartPageInfo1">Excludes delivery</p>
								<p className="cartPageInfo2">GST Included</p>
							</div>
						</div>
						<div className="navPageLinkDiv">
							<Link
								to={`/checkout`}
								className="cartPageLink1"
								onClick={() => {
									closeList()
									cartClose()
								}}
							>
								<RiHandbagFill className="cartPageLogo" />
								<p className="cartPageButton1">Proceed to Checkout</p>
							</Link>
							<Link
								to={`/products`}
								className="cartPageLink1 cartPageLink2"
								onClick={() => {
									closeList()
									cartCanOpen()
									cartClose()
								}}
							>
								<p>Continue Shopping</p>
							</Link>
						</div>
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { cart: state.cart, total: state.total }
}

export default connect(mapStateToProps)(Cart)
