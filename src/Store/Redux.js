import { createSlice, configureStore } from '@reduxjs/toolkit';

const Reducers = createSlice({
  name: 'cartCalculate',
  initialState: {
    cart: [],
    amount: 0,
    total: 0,
  },
  reducers: {
    increase(state, action) {
      const { slug, price } = action.payload;
      let tmpCart;

      if (
        state.cart.filter((cartItem) => cartItem.slug === slug).length !== 0
      ) {
        tmpCart = state.cart.map((cartItem) => {
          if (cartItem.slug === slug) {
            cartItem = {
              ...cartItem,
              totalPrice: (cartItem.totalPrice += price),
              productAmount: (cartItem.productAmount += 1),
            };
          }
          return cartItem;
        });
      } else {
        let cartItem = { slug: slug, totalPrice: price, productAmount: 1 };
        tmpCart = [...state.cart, cartItem];
      }

      state = {
        cart: (state.cart = tmpCart),
        amount: (state.amount += 1),
        total: (state.total += price),
      };
    },
    decrease(state, action) {
      const { slug, price } = action.payload;
      let tmpCart;
      if (
        state.cart.filter((cartItem) => cartItem.slug === slug)[0]
          .productAmount === 1
      ) {
        tmpCart = state.cart.filter((cartItem) => cartItem.slug !== slug);
      } else {
        tmpCart = state.cart.map((cartItem) => {
          if (cartItem.slug === slug) {
            cartItem = {
              ...cartItem,
              totalPrice: (cartItem.totalPrice -= price),
              productAmount: (cartItem.productAmount -= 1),
            };
          }
          return cartItem;
        });
      }

      state = {
        cart: (state.cart = tmpCart),
        amount: (state.amount -= 1),
        total: (state.total -= price),
      };
    },
    remove(state, action) {
      const { slug } = action.payload;
      const item = state.cart.filter((cartItem) => cartItem.slug === slug)[0];
      const tmpCart = state.cart.filter((cartItem) => cartItem.slug !== slug);
      state = {
        cart: (state.cart = tmpCart),
        amount: (state.amount -= item.productAmount),
        total: (state.total -= item.totalPrice),
      };
    },
  },
});

export const { increase, decrease, remove } = Reducers.actions;

const store = configureStore({
  reducer: {
    reducer: Reducers.reducer,
  },
});

export default store;
