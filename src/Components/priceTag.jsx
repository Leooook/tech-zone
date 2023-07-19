import React from 'react';

const PriceTag = (props) => {
  const { discount, price, lastPrice, priceOff } = props;

  return (
    <article>
      {discount ? (
        <div className='productPricePart1'>
          <p className='productLastPrice1'>
            TICKET&nbsp;<span className='productLastPrice2'>${lastPrice}</span>
          </p>
          <p className='productNowPrice'>${price}</p>
          <p className='productLastPrice1'>${priceOff} OFF^</p>
        </div>
      ) : (
        <div className='productPricePart1 productPricePart2'>
          <p className='productNowPrice'>${price}</p>
        </div>
      )}
    </article>
  );
};

export default PriceTag;
