import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { GoGrabber } from 'react-icons/go'
import { GrFormClose } from 'react-icons/gr'
import { GiTechnoHeart } from 'react-icons/gi'
import { AiOutlineShoppingCart } from 'react-icons/ai'

class Nav extends Component {
	state = {
		isOpen: true,
		isFixed: true,
		top: 0,
		count: 1
	}

	componentDidMount(event) {
		window.onscroll = () => {
			let scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
			if (scrollTop >= this.state.top && this.state.isOpen === true) {
				this.setState({ top: scrollTop, isFixed: false })
			} else {
				this.setState({ top: scrollTop, isFixed: true })
			}
		}
	}

	openList = () => {
		this.setState({ isOpen: !this.state.isOpen })
	}

	render() {
		return (
			<div>
				<div className={this.state.isFixed ? 'navCenter' : 'navCenter navNoFixed'}>
					<button type="button" className="navButton" onClick={this.openList}>
						{this.state.isOpen ? <GoGrabber /> : <GrFormClose className="navButtonShow" />}
					</button>
					<Link to="/" className="navLogo" onClick={() => window.scrollTo(0, 0)}>
						<GiTechnoHeart className="navIcon" />
						<h2 className="navTitle"> TECH ZONE </h2>
					</Link>
					<ul className={this.state.isOpen ? 'navList openNav' : 'navList'}>
						<li className="eachNavList">
							<Link to="/">Home</Link>
						</li>
						<li className="eachNavList">
							<Link to="/products">Products</Link>
						</li>
						<li className="eachNavList">
							<Link to="/cart">Cart</Link>
						</li>
						<li className="eachNavList">
							<Link to="/contact">Contact</Link>
						</li>
						<li className="eachNavList">
							<Link to="/about">About</Link>
						</li>
					</ul>
					<Link to="/cart" className="navCart">
						<AiOutlineShoppingCart className="navCartIcon" />
						<p className={this.state.count === 0 ? 'navCount navCountZero' : 'navCount'}>
							{this.state.count}
						</p>
					</Link>
				</div>
			</div>
		)
	}
}

export default Nav
