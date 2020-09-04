import React, { Component } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import { withConsumer } from '../Context'
import Load from '../Components/load'
import PriceTag from '../Components/priceTag.jsx'

class DetailPage extends Component {
	state = {
		picOrder: -1,
		photoBox: [],
		class: null,
		class1: null,
		class2: null,
		class3: null
	}

	picToLeft = (photo) => {
		let photoBox = []
		let picOrder = this.state.picOrder - 1

		if (picOrder < 0) {
			picOrder += photo.length
		}
		let count = picOrder

		for (let i = 0; i < 5; i++) {
			if (count === photo.length) {
				count = 0
			}
			photoBox.push(photo[count])
			count += 1
		}
		setTimeout(() => this.setState({ picOrder, photoBox }), 400)
	}

	picToRight = (photo) => {
		let photoBox = []
		let picOrder = this.state.picOrder + 1

		if (picOrder === photo.length) {
			picOrder = 0
		}

		let count = picOrder

		for (let i = 0; i < 5; i++) {
			if (count === photo.length) {
				count = 0
			}
			photoBox.push(photo[count])
			count += 1
		}
		setTimeout(() => this.setState({ picOrder, photoBox }), 400)
	}

	draftPhoto = (photo) => {
		let newPhoto = []
		newPhoto.push(photo[photo.length - 1])
		for (let i = 0; i < photo.length; i++) {
			newPhoto.push(photo[i])
		}
		return newPhoto
	}

	photoActiveLeft = () => {
		this.setState({
			class: 'detailPhotoActive1',
			class1: 'picButtonSwitch1Active',
			class3: 'picButtonSwitch1Active'
		})
		setTimeout(() => {
			this.setState({ class: null, class1: null, class3: null })
		}, 400)
	}

	photoActiveRight = () => {
		this.setState({
			class: 'detailPhotoActive2',
			class1: 'picButtonSwitch2Active',
			class2: 'picButtonSwitch2Active'
		})
		setTimeout(() => {
			this.setState({ class: null, class1: null, class2: null })
		}, 400)
	}

	render() {
		const product = this.props.context.getRoom(this.props.match.params.slug.slice(1))

		if (product) {
			const { name, price, discount, freeShipping, freeReturn, brandPic, photo, extras, detail } = product
			let lastPrice, priceOff
			if (discount) {
				lastPrice = product.lastPrice
				priceOff = lastPrice - price
			}

			const newPhoto = this.draftPhoto(photo)

			return (
				<div className="detailPage">
					<section className="detailMainPart">
						<div className="detailInfoPart">
							<div className="detailTitle">
								<img src={brandPic} alt="logo" className="detailLogo" />
								<h6 className="detailName">{name}</h6>
							</div>
							<div className="detailCorePart">
								<div className="picSwithchBox">
									<div className="picBox">
										{this.state.photoBox.length !== 0 ? (
											this.state.photoBox
												.slice(0, 4)
												.map((eachPhoto, index) => (
													<img
														src={eachPhoto}
														key={index}
														alt={`product${index}`}
														className={`detailPhoto ${this.state.class}`}
													/>
												))
										) : (
											newPhoto
												.slice(0, 4)
												.map((eachPhoto, index) => (
													<img
														src={eachPhoto}
														key={index}
														alt={`product${index}`}
														className={`detailPhoto ${this.state.class}`}
													/>
												))
										)}
									</div>
									<div className="picSwitchTrigger">
										<AiOutlineLeft
											className="picButtonSwitch1"
											onClick={() => {
												this.picToRight(photo)
												this.photoActiveLeft()
											}}
										/>
										<AiOutlineRight
											className="picButtonSwitch2"
											onClick={() => {
												this.picToLeft(photo)
												this.photoActiveRight()
											}}
										/>
										{this.state.photoBox.length !== 0 ? (
											this.state.photoBox.map((eachPhoto, index) => (
												<img
													src={eachPhoto}
													key={index}
													alt={`product${index}`}
													className={
														index === 1 ? (
															`detailTriggerBox detailTriggerBoxActive ${this.state
																.class1}`
														) : index === 0 ? (
															`detailTriggerBoxNone1 ${this.state.class2}`
														) : index === 4 ? (
															`detailTriggerBoxNone1 ${this.state.class3}`
														) : (
															`detailTriggerBox ${this.state.class1}`
														)
													}
												/>
											))
										) : (
											newPhoto.map((eachPhoto, index) => (
												<img
													src={eachPhoto}
													key={index}
													alt={`product${index}`}
													className={
														index === 1 ? (
															`detailTriggerBox detailTriggerBoxActive ${this.state
																.class1}`
														) : index === 0 ? (
															`detailTriggerBoxNone1 ${this.state.class2}`
														) : index === 4 ? (
															`detailTriggerBoxNone1 ${this.state.class3}`
														) : (
															`detailTriggerBox ${this.state.class1}`
														)
													}
												/>
											))
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="detailPricePart" />
					</section>

					<section className="detailOverviewPart" />
				</div>
			)
		} else {
			return (
				<div className="detailPage">
					<Load />
				</div>
			)
		}
	}
}

export default withConsumer(DetailPage)
