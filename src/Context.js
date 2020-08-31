import React, { Component } from 'react'

import Client from './Contentful'

const myContext = React.createContext()

class ContextProvider extends Component {
	state = {
		products: [],
		featureProducts: [],
		sortedProducts: [],
		load: true
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
	}

	render() {
		return <myContext.Provider value={{ ...this.state }}>{this.props.children}</myContext.Provider>
	}
}

const ContextConsumer = myContext.Consumer

function withConsumer(Component) {
	return function consumerWrapper(props) {
		return <ContextConsumer>{(value) => <Component {...props} context={value} />}</ContextConsumer>
	}
}

export { ContextProvider, withConsumer, myContext }
