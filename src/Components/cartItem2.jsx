import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { increase, decrease, remove } from '../Store/Redux';
import ProductContext from '../Store/Context';

const CartItem2 = (props) => {
  const { eachItem } = props;
  const { products, closeList, cartCanOpen, cartClose } =
    useContext(ProductContext);
  const product = products.filter(
    (eachProduct) => eachProduct.slug === eachItem.slug
  );
  const dispatch = useDispatch();

  const { slug, price, name, photo } = product[0];
  const trigger = () => {
    closeList();
    cartCanOpen();
    cartClose();
  };
  return (
    <article className='cart2'>
      <div className='cartItem2'>
        <Link
          to={`/products/:${slug}`}
          className='cartLink'
          onClick={() => {
            trigger();
          }}
        >
          <img src={photo[0]} alt='Product' className='cartItemPhoto2' />
        </Link>
        <Link
          to={`/products/:${slug}`}
          className='cartLink'
          onClick={() => {
            trigger();
          }}
        >
          <h6 className='cartItemName2'>{name}</h6>
        </Link>
      </div>
      <div className='cartItemMain'>
        <div className='cartPrice2'>${eachItem.totalPrice}</div>
        <div className='cartAmountBox2'>
          <div
            className='cartAmountTrigger2'
            onClick={() => dispatch(decrease({ slug, price }))}
          >
            -
          </div>
          <div className='cartAmount2'>{eachItem.productAmount}</div>
          <div
            className='cartAmountTrigger2'
            onClick={() => dispatch(increase({ slug, price }))}
          >
            +
          </div>
        </div>
        <div className='cartRemove2' onClick={() => dispatch(remove({ slug }))}>
          Remove
        </div>
      </div>
    </article>
  );
};

CartItem2.propTypes = {
  eachItem: PropTypes.shape({
    slug: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    productAmount: PropTypes.number.isRequired,
  }),
};

export default CartItem2;
