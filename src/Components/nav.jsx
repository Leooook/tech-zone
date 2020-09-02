import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { myContext } from '../Context'
import { GoGrabber } from 'react-icons/go'
import { GrFormClose } from 'react-icons/gr'
import { GiTechnoHeart } from 'react-icons/gi'
import { AiOutlineShoppingCart } from 'react-icons/ai'

class Nav extends Component {
	static contextType = myContext

	render() {
		let { isFixed, isListOpen, isCartOpen, openList, cartOpen, cartCountLogo } = this.context
		return (
			<div>
				<div className={isFixed ? 'navCenter' : 'navCenter navNoFixed'}>
					<button type="button" className="navButton" onClick={openList}>
						{isListOpen ? <GrFormClose className="navButtonShow" /> : <GoGrabber />}
					</button>
					<Link to="/" className="navLogo" onClick={() => window.scrollTo(0, 0)}>
						<GiTechnoHeart className="navIcon" />
						<h2 className="navTitle"> TECH ZONE </h2>
					</Link>
					<ul className={isListOpen ? 'navList' : 'navList  openNav'}>
						<li className="eachNavList" onClick={this.openList}>
							<Link to="/">Home</Link>
						</li>
						<li className="eachNavList" onClick={this.openList}>
							<Link to="/products">Products</Link>
						</li>
						<li className="eachNavList" onClick={this.openList}>
							<Link to="/cart">Cart</Link>
						</li>
						<li className="eachNavList" onClick={this.openList}>
							<Link to="/contact">Contact</Link>
						</li>
						<li className="eachNavList" onClick={this.openList}>
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
						<h3 className="navCartTitle">Cart Summary</h3>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { amount: state.amount }
}

export default connect(mapStateToProps)(Nav)
