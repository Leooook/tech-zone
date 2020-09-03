import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'

import { myContext } from '../Context.js'

import hero1 from '../Images/Hero/hero1.jpg'
import hero2 from '../Images/Hero/hero2.jpg'
import hero3 from '../Images/Hero/hero3.jpg'

const heroImgs = [ hero1, hero2, hero3 ]

class Hero extends Component {
	static contextType = myContext

	state = {
		heroImg: hero1,
		count: 0,
		timer: null
	}

	trigger = (closeList, cartCanOpen, cartClose) => {
		closeList()
		cartCanOpen()
		cartClose()
	}

	imgLeft = () => {
		let count = this.state.count
		if (count === 0) {
			count = 2
		} else {
			count--
		}
		this.setState({ heroImg: heroImgs[count], count })
	}

	imgRight = () => {
		let count = this.state.count
		if (count === 2) {
			count = 0
		} else {
			count++
		}
		this.setState({ heroImg: heroImgs[count], count })
	}

	componentWillUnmount() {
		clearInterval(this.state.timer)
	}

	componentDidMount() {
		const timer = setInterval(() => {
			if (this.state.count === 2) {
				this.setState({ heroImg: heroImgs[0], count: 0 })
			} else {
				this.setState({ heroImg: heroImgs[this.state.count + 1], count: this.state.count + 1 })
			}
		}, 10000)
		this.setState({ timer })
	}

	render() {
		const { closeList, cartCanOpen, cartClose } = this.context
		return (
			<section className="hero" style={{ backgroundImage: `url(${this.state.heroImg})` }}>
				<h1 className="heroTitle"> {this.props.title} </h1>
				<div className="heroCenter">
					<IoIosArrowDropleft onClick={this.imgLeft} className="heroLogo" />
					<Link
						to={`${this.props.path}`}
						className="heroBanner"
						onClick={() => {
							this.trigger(closeList, cartCanOpen, cartClose)
						}}
					>
						{this.props.banner}
					</Link>
					<IoIosArrowDropright onClick={this.imgRight} className="heroLogo" />
				</div>
				<ul className="heroImgList">
					<li className={this.state.count === 0 ? 'heroImgSelected' : 'heroImgNotSelected'} />
					<li className={this.state.count === 1 ? 'heroImgSelected' : 'heroImgNotSelected'} />
					<li className={this.state.count === 2 ? 'heroImgSelected' : 'heroImgNotSelected'} />
				</ul>
			</section>
		)
	}
}

Hero.propTypes = {
	title: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	banner: PropTypes.string.isRequired,
	err: PropTypes.bool
}

export default Hero
