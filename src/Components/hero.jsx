import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

import ProductContext from '../Store/Context';
import hero1 from '../Images/Hero/hero1.jpg';
import hero2 from '../Images/Hero/hero2.jpg';
import hero3 from '../Images/Hero/hero3.jpg';
import productImg from '../Images/Hero/productImg.jpg';

const Hero = (props) => {
  const heroImgs = [hero1, hero2, hero3];
  const [hero, setHero] = useState({ heroImg: hero1, count: 0 });
  const { closeList, cartCanOpen, cartClose } = useContext(ProductContext);

  const trigger = () => {
    closeList();
    cartCanOpen();
    cartClose();
  };

  const imgShift = (direction) => {
    let count = hero.count;
    if (direction === 'left')
      if (count === 0) {
        count = 2;
      } else {
        count--;
      }
    else if (direction === 'right') {
      if (count === 2) {
        count = 0;
      } else {
        count++;
      }
    }
    setHero({ ...hero, heroImg: heroImgs[count], count });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (hero.count === 2) {
        setHero({ ...hero, heroImg: heroImgs[0], count: 0 });
      } else {
        setHero({
          ...hero,
          heroImg: heroImgs[hero.count + 1],
          count: hero.count + 1,
        });
      }
    }, 20000);
    return clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroImgs]);

  if (props.class) {
    return (
      <section
        className='hero heroProduct'
        style={{ backgroundImage: `url(${productImg})` }}
      >
        <h1 className='heroTitle'> {props.title} </h1>
        <div className='heroCenter heroCenterProduct'>
          <Link
            to={`${props.path}`}
            className='heroBanner'
            onClick={() => {
              window.scrollTo(0, 0);
              trigger();
            }}
          >
            {props.banner}
          </Link>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className='hero'
        style={{ backgroundImage: `url(${hero.heroImg})` }}
      >
        <h1 className='heroTitle'> {props.title} </h1>
        <div className='heroCenter'>
          <IoIosArrowDropleft
            onClick={() => imgShift('left')}
            className='heroLogo'
          />
          <Link
            to={`${props.path}`}
            className='heroBanner'
            onClick={() => {
              window.scrollTo(0, 0);
              trigger();
            }}
          >
            {props.banner}
          </Link>
          <IoIosArrowDropright
            onClick={() => imgShift('right')}
            className='heroLogo'
          />
        </div>
        <ul className='heroImgList'>
          <li
            className={
              hero.count === 0 ? 'heroImgSelected' : 'heroImgNotSelected'
            }
          />
          <li
            className={
              hero.count === 1 ? 'heroImgSelected' : 'heroImgNotSelected'
            }
          />
          <li
            className={
              hero.count === 2 ? 'heroImgSelected' : 'heroImgNotSelected'
            }
          />
        </ul>
      </section>
    );
  }
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
  err: PropTypes.bool,
};

export default Hero;
