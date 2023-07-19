import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { increase, decrease, remove } from '../Store/Redux';
import ProductContext from '../Store/Context';

const CartItem = (props) => {
  const { eachItem } = props;
  const { products, closeList, cartCanOpen, cartClose } =
    useContext(ProductContext);
  const product = products.filter(
    (eachProduct) => +eachProduct.slug === +eachItem.slug
  );

  const dispatch = useDispatch();

  const { slug, price, name, photo } = product[0];
  const trigger = () => {
    closeList();
    cartCanOpen();
    cartClose();
  };

  return (
    <article className='cart1'>
      <Link to={`/products/:${slug}`} className='cartLink' onClick={() => {}}>
        <img src={photo[0]} alt='Product' className='cartItemPhoto' />
      </Link>
      <div className='cartItemMainPart'>
        <Link
          to={`/products/:${slug}`}
          className='cartLink'
          onClick={() => {
            trigger();
          }}
        >
          <h6 className='cartItemName'>{name}</h6>
        </Link>
        <div className='cartAmountBox'>
          <div
            className='cartAmountTrigger'
            onClick={() => dispatch(decrease({ slug, price }))}
          >
            -
          </div>
          <div className='cartAmount'>{eachItem.productAmount}</div>
          <div
            className='cartAmountTrigger'
            onClick={() => dispatch(increase({ slug, price }))}
          >
            +
          </div>
        </div>
        <div className='cartRemove' onClick={() => dispatch(remove({ slug }))}>
          Remove
        </div>
      </div>
      <div className='cartPrice'>${eachItem.totalPrice}</div>
    </article>
  );
};

CartItem.propTypes = {
  eachItem: PropTypes.shape({
    slug: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    productAmount: PropTypes.number.isRequired,
  }),
};

export default CartItem;
