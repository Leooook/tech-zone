import React from 'react';

import Hero from '../Components/hero';
import Services from '../Components/services';
import Feature from '../Components/feature';

const MainPage = () => {
  return (
    <div>
      <Hero title='Amazing Products' path='/products' banner='Our Products' />
      <Services />
      <Feature />
    </div>
  );
};

export default MainPage;
