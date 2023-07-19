import React, { useState, useContext } from 'react';
import ReactMarkDown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClose,
  AiOutlineShopping,
} from 'react-icons/ai';
import { GiReturnArrow } from 'react-icons/gi';
import { FaShippingFast, FaCartPlus } from 'react-icons/fa';

import { increase } from '../Store/Redux';
import ProductContext from '../Store/Context';
import Load from '../Components/load';
import PriceTag from '../Components/priceTag.jsx';

const DetailPage = () => {
  const [picBox, setPicBox] = useState({
    picOrder: -1,
    photoBox: [],
    showPhoto: false,
    photo: null,
  });
  const [myClass, setMyClass] = useState({
    class: null,
    class1: null,
    class2: null,
    class3: null,
  });
  const {
    isCartOpen,
    getRoom,
    closeList,
    cartCanOpen,
    cartClose,
    cartOpen,
    cartCountFlash,
  } = useContext(ProductContext);
  const dispatch = useDispatch();

  const params = useParams().slug;
  const product = getRoom(params.slice(1));

  const trigger = () => {
    closeList();
    cartCanOpen();
    cartClose();
  };

  const picTo = (photo, direction) => {
    let photoBox = [];
    let picOrder =
      direction === 'left' ? picBox.picOrder - 1 : picBox.picOrder + 1;

    if (picOrder === photo.length && direction === 'right') {
      picOrder = 0;
    } else if (picOrder < 0 && direction === 'left') {
      picOrder += photo.length;
    }

    let count = picOrder;
    for (let i = 0; i < 5; i++) {
      if (count === photo.length) {
        count = 0;
      }
      photoBox.push(photo[count]);
      count += 1;
    }
    setTimeout(
      setPicBox((prevState) => ({ ...prevState, picOrder, photoBox }), 400)
    );
  };

  const photoActive = (direction) => {
    if (direction === 'left') {
      setMyClass((prevState) => ({
        ...prevState,
        class: 'detailPhotoActive1',
        class1: 'picButtonSwitch1Active',
        class3: 'picButtonSwitch1Active',
      }));
      setTimeout(() => {
        setMyClass({
          ...myClass,
          class: null,
          class1: null,
          class3: null,
        });
      }, 400);
    } else {
      setMyClass((prevState) => ({
        ...prevState,
        class: 'detailPhotoActive2',
        class1: 'picButtonSwitch2Active',
        class2: 'picButtonSwitch2Active',
      }));

      setTimeout(() => {
        setMyClass({
          ...myClass,
          class: null,
          class1: null,
          class2: null,
        });
      }, 400);
    }
  };

  const draftPhoto = (photo) => {
    let newPhoto = [];
    newPhoto.push(photo[photo.length - 1]);
    for (let i = 0; i < photo.length; i++) {
      newPhoto.push(photo[i]);
    }
    return newPhoto;
  };

  const showPhotoFun = (eachPhoto) => {
    eachPhoto
      ? setPicBox((prevState) => ({
          ...prevState,
          showPhoto: !picBox.showPhoto,
          photo: eachPhoto,
        }))
      : setPicBox((prevState) => ({
          ...prevState,
          showPhoto: !picBox.showPhoto,
          photo: null,
        }));
  };

  if (product) {
    const {
      name,
      slug,
      price,
      discount,
      freeShipping,
      freeReturn,
      brandPic,
      photo,
      extras,
      detail,
    } = product;
    let lastPrice, priceOff;
    if (discount) {
      lastPrice = product.lastPrice;
      priceOff = lastPrice - price;
    }

    const newPhoto = draftPhoto(photo);

    if (picBox.showPhoto) {
      return (
        <div className='detailPagePic'>
          <AiOutlineClose
            className='detailPicClose'
            onClick={() => showPhotoFun()}
          />
          <img src={picBox.photo} alt='product' className='detailFullPic' />
        </div>
      );
    } else {
      return (
        <div className='detailPage'>
          <section className='detailMainPart'>
            <div className='detailTitle'>
              <img src={brandPic} alt='logo' className='detailLogo' />
              <h6 className='detailName'>{name}</h6>
            </div>
            <div className='detailInfoPart'>
              <div className='detailCorePart'>
                <div className='picSwithchBox'>
                  <div className='picBox'>
                    {picBox.photoBox.length !== 0
                      ? picBox.photoBox.slice(0, 4).map((eachPhoto, index) => (
                          <img
                            src={eachPhoto}
                            key={index}
                            alt={`product${index}`}
                            className={`detailPhoto ${myClass.class}`}
                            onClick={() => {
                              showPhotoFun(eachPhoto);
                            }}
                          />
                        ))
                      : newPhoto.slice(0, 4).map((eachPhoto, index) => (
                          <img
                            src={eachPhoto}
                            key={index}
                            alt={`product${index}`}
                            className={`detailPhoto ${myClass.class}`}
                            onClick={() => {
                              showPhotoFun(eachPhoto);
                            }}
                          />
                        ))}
                  </div>
                  <div className='picSwitchTrigger'>
                    <AiOutlineLeft
                      className='picButtonSwitch1'
                      onClick={() => {
                        picTo(photo, 'right');
                        photoActive('left');
                      }}
                    />
                    <AiOutlineRight
                      className='picButtonSwitch2'
                      onClick={() => {
                        picTo(photo, 'left');
                        photoActive('right');
                      }}
                    />
                    {picBox.photoBox.length !== 0
                      ? picBox.photoBox.map((eachPhoto, index) => (
                          <img
                            src={eachPhoto}
                            key={index}
                            alt={`product${index}`}
                            className={
                              index === 1
                                ? `detailTriggerBox detailTriggerBoxActive ${myClass.class1}`
                                : index === 0
                                ? `detailTriggerBoxNone1 ${myClass.class2}`
                                : index === 4
                                ? `detailTriggerBoxNone1 ${myClass.class3}`
                                : `detailTriggerBox ${myClass.class1}`
                            }
                          />
                        ))
                      : newPhoto.map((eachPhoto, index) => (
                          <img
                            src={eachPhoto}
                            key={index}
                            alt={`product${index}`}
                            className={
                              index === 1
                                ? `detailTriggerBox detailTriggerBoxActive ${myClass.class1}`
                                : index === 0
                                ? `detailTriggerBoxNone1 ${myClass.class2}`
                                : index === 4
                                ? `detailTriggerBoxNone1 ${myClass.class3}`
                                : `detailTriggerBox ${myClass.class1}`
                            }
                          />
                        ))}
                  </div>
                </div>
                <div className='detailInfo'>
                  {freeShipping ? (
                    <div className='detailInfo1'>
                      <GiReturnArrow />
                      &nbsp;Free shipping
                    </div>
                  ) : null}
                  {freeReturn ? (
                    <div className='detailInfo1 detailInfoColor'>
                      <FaShippingFast />
                      &nbsp;Free return
                    </div>
                  ) : null}
                </div>
              </div>
              <div className='detailEtrasPart'>
                <ReactMarkDown source={extras} />
              </div>
            </div>
            <div
              className={
                discount
                  ? 'detailPricePart detailPricePartDiscount'
                  : 'detailPricePart'
              }
            >
              <PriceTag
                discount={discount}
                price={price}
                lastPrice={lastPrice}
                priceOff={priceOff}
              />
              <Link
                to='/products'
                onClick={() => {
                  trigger();
                }}
                className='detailPriceLink'
              >
                <div className='detailPriceReturn'>
                  <AiOutlineShopping />
                  &nbsp;Continue Shopping
                </div>
              </Link>
              <div
                className='detailPriceReturn detailCartButton'
                onClick={() => {
                  dispatch(increase({ slug, price }));
                  if (!isCartOpen) {
                    cartOpen();
                  }
                  cartCountFlash();
                }}
              >
                <FaCartPlus className='detailPriceIcon' />
                &nbsp;Add to Cart
              </div>
            </div>
          </section>
          <section className='detailOverviewPart'>
            <ReactMarkDown source={detail} />
          </section>
        </div>
      );
    }
  } else {
    return (
      <div className='detailPage'>
        <Load />
      </div>
    );
  }
};

export default DetailPage;
