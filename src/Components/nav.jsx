import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { myContext } from '../Context'
import { GoGrabber } from 'react-icons/go'
import { GrFormClose } from 'react-icons/gr'
import { GiTechnoHeart } from 'react-icons/gi'
import { AiOutlineShoppingCart } from 'react-icons/ai'

import CartItem from './cartItem'

class Nav extends Component {
	static contextType = myContext

	trigger = (openList, cartCanOpen, cartClose) => {
		openList()
		cartCanOpen()
		cartClose()
	}
	triggerCart = (closeList, cartCantOpen) => {
		closeList()
		cartCantOpen()
	}

	render() {
		let {
			isFixed,
			isListOpen,
			isCartOpen,
			openList,
			closeList,
			cartOpen,
			cartClose,
			cartCanOpen,
			cartCantOpen,
			cartCountLogo
		} = this.context
		return (
			<div>
				<div className={isFixed ? 'navCenter' : 'navCenter navNoFixed'}>
					<button type="button" className="navButton" onClick={openList}>
						{isListOpen ? <GrFormClose className="navButtonShow" /> : <GoGrabber />}
					</button>
					<Link
						to="/"
						className="navLogo"
						onClick={() => {
							window.scrollTo(0, 0)
							cartCanOpen()
							cartClose()
							closeList()
						}}
					>
						<GiTechnoHeart className="navIcon" />
						<h2 className="navTitle"> TECH ZONE </h2>
					</Link>
					<ul className={isListOpen ? 'navList' : 'navList  openNav'}>
						<li
							className="eachNavList"
							onClick={() => {
								this.trigger(openList, cartCanOpen, cartClose)
							}}
						>
							<Link to="/">Home</Link>
						</li>
						<li
							className="eachNavList"
							onClick={() => {
								this.trigger(openList, cartCanOpen, cartClose)
							}}
						>
							<Link to="/products">Products</Link>
						</li>
						<li
							className="eachNavList"
							onClick={() => {
								openList()
								cartCantOpen()
							}}
						>
							<Link to="/cart">Cart</Link>
						</li>
						<li
							className="eachNavList"
							onClick={() => {
								this.trigger(openList, cartCanOpen, cartClose)
							}}
						>
							<Link to="/contact">Contact</Link>
						</li>
						<li
							className="eachNavList"
							onClick={() => {
								this.trigger(openList, cartCanOpen, cartClose)
							}}
						>
							<Link to="/about">About</Link>
						</li>
					</ul>
					<div className="navCart" onClick={cartOpen}>
						<AiOutlineShoppingCart className="navCartIcon" />
						<p
							className={
								this.props.amount === 0 ? (
									'navCount navCountZero'
								) : cartCountLogo ? (
									'navCount cartCountFlash'
								) : (
									'navCount'
								)
							}
						>
							{this.props.amount}
						</p>
					</div>
					<div className={isCartOpen ? 'cartList' : 'cartList openCart'}>
						{this.props.cart.length === 0 ? (
							<p className="cartEmpty">Your Cart Is Currently Empty</p>
						) : (
							<div>
								<h3 className="navCartTitle">Cart Summary</h3>
								<div className="navCartItem">
									{this.props.cart.map((eachItem) => (
										<CartItem key={eachItem.slug} eachItem={eachItem} />
									))}
								</div>
								<div className="navPriceDiv">
									<p className="CartTitle">Subtotal</p>
									<p className="CartTitle">${this.props.total}</p>
								</div>
								<p className="cartInfo">Excludes delivery</p>
								<div className="navLinkDiv">
									<Link
										className="navCartLink"
										to="../cart"
										onClick={() => {
											this.triggerCart(closeList, cartCantOpen)
										}}
									>
										View Cart
									</Link>
									<Link
										className="navCartLink navCartColor"
										to="./checkout"
										onClick={() => {
											this.triggerCart(closeList, cartCantOpen)
										}}
									>
										Check Out
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { cart: state.cart, amount: state.amount, total: state.total }
}

export default connect(mapStateToProps)(Nav)
