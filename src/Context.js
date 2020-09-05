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
		cartNotOpen: false,
		isListOpen: false,
		isFixed: true,
		cartCountLogo: false,
		top: 0,

		search: '',
		brands: 'All',
		price: 0,
		maxPrice: 0,
		discount: false,
		freeShipping: false,
		freeReturn: false,
		sort: 'Default'
	}

	getData = async () => {
		try {
			const data = await Client.getEntries({ content_type: 'techZone' })

			let products = this.formData(data).sort(this.sortCompare('slug'))
			let maxPrice = Math.max(...products.map((product) => product.price))
			let price = maxPrice
			let featureProducts = products.filter((product) => product.popular === true)
			let sortedProducts = products

			this.setState({ products, featureProducts, sortedProducts, load: false, price, maxPrice })
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

	closeList = () => {
		this.setState({ isListOpen: false })
	}

	cartOpen = () => {
		if (!this.state.cartNotOpen) {
			this.setState({ isCartOpen: !this.state.isCartOpen, isFixed: true })
		}
	}

	cartClose = () => {
		if (!this.state.cartNotOpen) {
			this.setState({ isCartOpen: false, isFixed: true })
		}
	}

	cartCantOpen = () => {
		if (!this.state.cartNotOpen) {
			this.setState({ cartNotOpen: true, isCartOpen: false })
		}
	}

	cartCanOpen = () => {
		if (this.state.cartNotOpen) {
			this.setState({ cartNotOpen: false })
		}
	}

	cartCountFlash = () => {
		this.setState({ cartCountLogo: true })
		setTimeout(() => {
			this.setState({ cartCountLogo: false })
		}, 200)
	}

	getRoom = (slug) => {
		return this.state.products.filter((product) => product.slug === parseInt(slug))[0]
	}

	compare = (value, type) => {
		if (value === 'price') {
			return (x, y) => {
				let a = x[value]
				let b = y[value]
				if (type === 0) {
					return a - b
				} else {
					return b - a
				}
			}
		}
		if (value === 'name') {
			return (x, y) => {
				let a = x[value]
				let b = y[value]
				if (type === 0) {
					return a.localeCompare(b)
				} else {
					return -a.localeCompare(b)
				}
			}
		}
	}

	handleChange = (event) => {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name

		this.setState({ [name]: value }, this.sortProducts)
	}

	sortProducts = () => {
		let { products, search, brands, price, maxPrice, discount, freeShipping, freeReturn, sort } = this.state
		let tmpProducts = products

		if (search !== '') {
			let reg = new RegExp(search, 'i')
			tmpProducts = tmpProducts.filter((tmpProduct) => reg.test(tmpProduct.name) === true)
		}
		if (brands !== 'All') {
			tmpProducts = tmpProducts.filter((tmpProduct) => tmpProduct.brand === brands)
		}
		if (parseInt(price) !== maxPrice) {
			tmpProducts = tmpProducts.filter((tmpProduct) => tmpProduct.price <= parseInt(price))
		}
		if (discount === true) {
			tmpProducts = tmpProducts.filter((tmpProduct) => tmpProduct.discount === true)
		}
		if (freeReturn === true) {
			tmpProducts = tmpProducts.filter((tmpProduct) => tmpProduct.freeReturn === true)
		}
		if (freeShipping === true) {
			tmpProducts = tmpProducts.filter((tmpProduct) => tmpProduct.freeShipping === true)
		}
		if (sort === 'Price: High - Low') {
			tmpProducts = tmpProducts.sort(this.compare('price', 1))
		}
		if (sort === 'Price: Low - High') {
			tmpProducts = tmpProducts.sort(this.compare('price', 0))
		}
		if (sort === 'Name: A - Z') {
			tmpProducts = tmpProducts.sort(this.compare('name', 0))
		}
		if (sort === 'Name: Z - A') {
			tmpProducts = tmpProducts.sort(this.compare('name', 1))
		}

		this.setState({ sortedProducts: tmpProducts })
	}

	render() {
		return (
			<myContext.Provider
				value={{
					...this.state,
					openList: this.openList,
					closeList: this.closeList,
					cartOpen: this.cartOpen,
					cartClose: this.cartClose,
					cartCountFlash: this.cartCountFlash,
					cartCantOpen: this.cartCantOpen,
					cartCanOpen: this.cartCanOpen,
					getRoom: this.getRoom,
					handleChange: this.handleChange
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
