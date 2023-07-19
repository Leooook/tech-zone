import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RiHandbagFill } from 'react-icons/ri';

import ProductContext from '../Store/Context';
import CartItem2 from '../Components/cartItem2';

const Cart = () => {
  const { closeList, cartClose, cartCanOpen } = useContext(ProductContext);
  const { cart, total } = useSelector((state) => state.reducer);
  const trigger = () => {
    closeList();
    cartCanOpen();
    cartClose();
  };

  return (
    <div className='cartPage'>
      {cart.length === 0 ? (
        <div className='cartPageEmptyPart'>
          <p className='cartPageEmpty'>There are no items in your cart</p>
          <Link
            to={`/products`}
            className='cartPageLink'
            onClick={() => {
              trigger();
            }}
          >
            <p className='cartPageButton'>Continue Shopping</p>
          </Link>
        </div>
      ) : (
        <div className='cartPagePart'>
          <h3 className='cartPageTitle'>Cart Summary</h3>
          <div className='cartPageItem'>
            {cart.map((eachItem) => (
              <CartItem2
                key={eachItem.slug}
                eachItem={eachItem}
                cartClass='cart2'
              />
            ))}
          </div>
          <div className='cartPageDiv'>
            <div className='cartPagePriceDiv'>
              <p className='cartPageTitle1'>Subtotal</p>
              <p className='cartPageTitle1'>${total}</p>
            </div>
            <div className='cartPageInfoDiv'>
              <p className='cartPageInfo1'>Excludes delivery</p>
              <p className='cartPageInfo2'>GST Included</p>
            </div>
          </div>
          <div className='navPageLinkDiv'>
            <div className='cartPageLink1'>
              <RiHandbagFill className='cartPageLogo' />
              <p className='cartPageButton1'>Proceed to Checkout</p>
            </div>
            <Link
              to={`/products`}
              className='cartPageLink1 cartPageLink2'
              onClick={() => {
                window.scrollTo(0, 0);
                trigger();
              }}
            >
              <p>Continue Shopping</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
