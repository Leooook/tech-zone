import React from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import PropTypes from 'prop-types';

import { increase } from '../Store/Redux';
import PriceTag from './priceTag';

const Product = memo(
  ({
    product,
    isCartOpen,
    cartOpen,
    closeList,
    cartCanOpen,
    cartClose,
    cartCountFlash,
  }) => {
    const { slug, name, discount, price, brandPic, photo } = product;
    const dispatch = useDispatch();

    let lastPrice, priceOff;
    if (discount) {
      lastPrice = product.lastPrice;
      priceOff = lastPrice - price;
    }

    return (
      <article className='product'>
        {discount ? (
          <h4 className='productSaleTitle'>ON SALE</h4>
        ) : (
          <div className='productBlock' />
        )}
        <div className='productMainPart'>
          <div className='productInfoPart'>
            <img src={photo[0]} className='productPhoto' alt='product' />
            <div className='productNamePart'>
              <img src={brandPic} className='productBrandPic' alt='brand' />
              <h6 className='productName'>{name}</h6>
            </div>
          </div>
          <Link
            to={`/products/:${slug}`}
            className='productLink'
            onClick={() => {
              window.scrollTo(0, 0);
              closeList();
              cartCanOpen();
              cartClose();
            }}
          >
            EXPLORE
          </Link>
        </div>
        <div className='productLastPart'>
          <PriceTag
            discount={discount}
            price={price}
            lastPrice={lastPrice}
            priceOff={priceOff}
          />
          <div
            className='productCart'
            onClick={() => {
              dispatch(increase({ slug, price }));
              if (!isCartOpen) {
                cartOpen();
              }
              cartCountFlash();
            }}
          >
            <p className='productCartPlus'>+</p>
            <HiOutlineShoppingCart
              className='productCartLogo'
              alt='product cart logo'
            />
          </div>
        </div>
      </article>
    );
  }
);

Product.propTypes = {
  product: PropTypes.shape({
    product: PropTypes.shape({
      slug: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      discount: PropTypes.bool.isRequired,
      price: PropTypes.number.isRequired,
      lastPrice: PropTypes.number,
      brandPic: PropTypes.string.isRequired,
      photo: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  }),
};

export default Product;
