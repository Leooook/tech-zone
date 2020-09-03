import { INCREASE, DECREASE, REMOVE } from './action'

const initialStore = {
	cart: [],
	amount: 0,
	total: 0
}

function Reducers(state = initialStore, action) {
	switch (action.type) {
		case INCREASE: {
			const { slug, price } = action.payload
			let tmpCart
			if (state.cart.filter((cartItem) => cartItem.slug === slug).length !== 0) {
				tmpCart = state.cart.map((cartItem) => {
					if (cartItem.slug === slug) {
						cartItem = {
							...cartItem,
							totalPrice: (cartItem.totalPrice += price),
							productAmount: (cartItem.productAmount += 1)
						}
					}
					return cartItem
				})
			} else {
				let cartItem = { slug: slug, totalPrice: price, productAmount: 1 }
				tmpCart = [ ...state.cart, cartItem ]
			}
			state = { cart: tmpCart, amount: (state.amount += 1), total: (state.total += price) }

			return state
		}
		case DECREASE: {
			const { slug, price } = action.payload
			let tmpCart
			if (state.cart.filter((cartItem) => cartItem.slug === slug)[0].productAmount === 1) {
				tmpCart = state.cart.filter((cartItem) => cartItem.slug !== slug)
			} else {
				tmpCart = state.cart.map((cartItem) => {
					if (cartItem.slug === slug) {
						cartItem = {
							...cartItem,
							totalPrice: (cartItem.totalPrice -= price),
							productAmount: (cartItem.productAmount -= 1)
						}
					}
					return cartItem
				})
			}

			state = { cart: tmpCart, amount: (state.amount -= 1), total: (state.total -= price) }

			return state
		}
		case REMOVE: {
			const { slug } = action.payload
			const item = state.cart.filter((cartItem) => cartItem.slug === slug)[0]
			const tmpCart = state.cart.filter((cartItem) => cartItem.slug !== slug)
			state = {
				cart: tmpCart,
				amount: (state.amount -= item.productAmount),
				total: (state.total -= item.totalPrice)
			}
			return state
		}
		default:
			return state
	}
}

export default Reducers
