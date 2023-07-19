import React, { useContext } from 'react';

import ProductContext from '../Store/Context';
import Load from './load';
import Product from './product';

const Feature = () => {
  const {
    featureProducts,
    load,
    isCartOpen,
    cartOpen,
    closeList,
    cartCanOpen,
    cartClose,
    cartCountFlash,
  } = useContext(ProductContext);

  const product = featureProducts.map((product) => (
    <Product
      key={product.slug}
      product={product}
      isCartOpen={isCartOpen}
      cartOpen={cartOpen}
      cartCountFlash={cartCountFlash}
      closeList={closeList}
      cartCanOpen={cartCanOpen}
      cartClose={cartClose}
    />
  ));

  return (
    <section className='feature'>
      <h2 className='featureTitle'>Most Popular</h2>
      {load ? <Load /> : <div className='featureInfo'> {product} </div>}
    </section>
  );
};

export default Feature;
