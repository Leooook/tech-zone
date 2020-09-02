import React, { Component } from 'react'

import Client from './Contentful'

const myContext = React.createContext()

class ContextProvider extends Component {
	state = {
		products: [],
		featureProducts: [],
		sortedProducts: [],
		load: true,
		isCartOpen: false,
		isListOpen: false,
		isFixed: true,
		cartCountLogo: false,
		top: 0
	}

	getData = async () => {
		try {
			const data = await Client.getEntries({ content_type: 'techZone' })

			let products = this.formData(data).sort(this.sortCompare('slug'))
			let featureProducts = products.filter((product) => product.popular === true)
			let sortedProducts = products

			this.setState({ products, featureProducts, sortedProducts, load: false })
		} catch (error) {
			console.log(error)
		}
	}

	sortCompare = (property) => {
		return function(a, b) {
			var value1 = a[property]
			var value2 = b[property]
			return value1 - value2
		}
	}

	formData = (data) => {
		let tmpData = data.items.map((product) => {
			let brandPic = product.fields.brandPic.fields.file.url
			let photo = product.fields.photo.map((image) => image.fields.file.url)
			product = { ...product.fields, brandPic, photo }

			return product
		})
		return tmpData
	}

	componentDidMount() {
		this.getData()
		window.onscroll = () => {
			let scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
			if (scrollTop >= this.state.top && this.state.isListOpen === false && this.state.isCartOpen === false) {
				this.setState({ top: scrollTop, isFixed: false })
			} else {
				this.setState({ top: scrollTop, isFixed: true })
			}
		}
	}

	openList = () => {
		this.setState({ isListOpen: !this.state.isListOpen })
	}

	cartOpen = () => {
		this.setState({ isCartOpen: !this.state.isCartOpen, isFixed: true })
	}

	cartCountFlash = () => {
		this.setState({ cartCountLogo: true })
		setTimeout(() => {
			this.setState({ cartCountLogo: false })
		}, 200)
	}

	render() {
		return (
			<myContext.Provider
				value={{
					...this.state,
					openList: this.openList,
					cartOpen: this.cartOpen,
					cartCountFlash: this.cartCountFlash
				}}
			>
				{this.props.children}
			</myContext.Provider>
		)
	}
}

const ContextConsumer = myContext.Consumer

function withConsumer(Component) {
	return function consumerWrapper(props) {
		return <ContextConsumer>{(value) => <Component {...props} context={value} />}</ContextConsumer>
	}
}

export { ContextProvider, withConsumer, myContext }
