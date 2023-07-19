import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductContext from '../Store/Context';
import CartItem from './cartItem';

import { GoGrabber } from 'react-icons/go';
import { GrFormClose } from 'react-icons/gr';
import { GiTechnoHeart } from 'react-icons/gi';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Nav = () => {
  const {
    isFixed,
    isListOpen,
    isCartOpen,
    openList,
    closeList,
    cartOpen,
    cartClose,
    cartCanOpen,
    cartCantOpen,
    cartCountLogo,
  } = useContext(ProductContext);
  const { cart, amount, total } = useSelector((state) => state.reducer);

  const trigger = () => {
    openList();
    cartCanOpen();
    cartClose();
  };
  const triggerCart = () => {
    closeList();
    cartCantOpen();
  };

  return (
    <>
      <div className={isFixed ? 'navCenter' : 'navCenter navNoFixed'}>
        <button type='button' className='navButton' onClick={() => openList()}>
          {isListOpen ? (
            <GrFormClose className='navButtonShow' />
          ) : (
            <GoGrabber />
          )}
        </button>
        <Link
          to='/'
          className='navLogo'
          onClick={() => {
            window.scrollTo(0, 0);
            cartCanOpen();
            cartClose();
            closeList();
          }}
        >
          <GiTechnoHeart className='navIcon' />
          <h2 className='navTitle'> TECH ZONE </h2>
        </Link>
        <ul className={isListOpen ? 'navList' : 'navList  openNav'}>
          <li
            className='eachNavList'
            onClick={() => {
              window.scrollTo(0, 0);
              trigger();
            }}
          >
            <Link to='/'>Home</Link>
          </li>
          <li
            className='eachNavList'
            onClick={() => {
              window.scrollTo(0, 0);
              trigger();
            }}
          >
            <Link to='/products'>Products</Link>
          </li>
          <li
            className='eachNavList'
            onClick={() => {
              window.scrollTo(0, 0);
              openList();
              cartCantOpen();
            }}
          >
            <Link to='/cart'>Cart</Link>
          </li>
          <li
            className='eachNavList'
            onClick={() => {
              window.scrollTo(0, 0);
              trigger();
            }}
          >
            <Link to='/contact'>Contact</Link>
          </li>
          <li
            className='eachNavList'
            onClick={() => {
              window.scrollTo(0, 0);
              trigger();
            }}
          >
            <Link to='/about'>About</Link>
          </li>
        </ul>
        <div className='navCart' onClick={() => cartOpen()}>
          <AiOutlineShoppingCart className='navCartIcon' />
          <p
            className={
              amount === 0
                ? 'navCount navCountZero'
                : cartCountLogo
                ? 'navCount cartCountFlash'
                : 'navCount'
            }
          >
            {amount}
          </p>
        </div>
        <div className={isCartOpen ? 'cartList' : 'cartList openCart'}>
          {cart.length === 0 ? (
            <p className='cartEmpty'>Your Cart Is Currently Empty</p>
          ) : (
            <div>
              <h3 className='navCartTitle'>Cart Summary</h3>
              <div className='navCartItem'>
                {cart.map((eachItem) => (
                  <CartItem key={eachItem.slug} eachItem={eachItem} />
                ))}
              </div>
              <div className='navPriceDiv'>
                <p className='CartTitle'>Subtotal</p>
                <p className='CartTitle'>${total}</p>
              </div>
              <p className='cartInfo'>Excludes delivery</p>
              <div className='navLinkDiv'>
                <Link
                  className='navCartLink'
                  to='../cart'
                  onClick={() => {
                    window.scrollTo(0, 0);
                    triggerCart();
                  }}
                >
                  View Cart
                </Link>
                <div className='navCartLink navCartColor'>Check Out</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
