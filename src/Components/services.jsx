import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { GrDiamond } from 'react-icons/gr';
import { BsArrowCounterclockwise } from 'react-icons/bs';

const Services = () => {
  return (
    <section className='services'>
      <div className='eachService'>
        <FaShippingFast className='serviceLogo' />
        <h3 className='serviceTitle'> Free & Fast Shipping </h3>
        <p className='serviceInfo'>
          Enjoying the free and fast shipping all around the Melbourne, it's
          just needs less than two days that deliver products to your home.
        </p>
      </div>
      <div className='eachService'>
        <MdAttachMoney className='serviceLogo' />
        <h3 className='serviceTitle'> Cheapest price </h3>
        <p className='serviceInfo'>
          We provide the cheapest prices of all products, if you found a lower
          price of products you've bought, we can get a price drop refund.
        </p>
      </div>
      <div className='eachService'>
        <GrDiamond className='serviceLogo' />
        <h3 className='serviceTitle'> Best quailty </h3>
        <p className='serviceInfo'>
          Each products will be check many times before you purchase, we can
          guarantee our products' quality is the best.
        </p>
      </div>
      <div className='eachService'>
        <BsArrowCounterclockwise className='serviceLogo' />
        <h3 className='serviceTitle'> 30 Days Return Policy </h3>
        <p className='serviceInfo'>
          If you have changed your mind you can return most unused whether
          purchased anywhere, you can return items to any local store or via
          post.
        </p>
      </div>
    </section>
  );
};

export default Services;
