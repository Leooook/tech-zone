import React from 'react';

const ProductContext = React.createContext({
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
  sort: 'Default',

  openList: () => {},
  closeList: () => {},
  cartOpen: () => {},
  cartClose: () => {},
  cartCountFlash: () => {},
  cartCantOpen: () => {},
  cartCanOpen: () => {},
  getRoom: () => {},
  handleChange: () => {},
});

export default ProductContext;
