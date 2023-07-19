import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footerInfo'>
        Copyright © Tech Zone 2020. All Rights Reserved.
      </p>
      <div className='footerLogo'>
        <a href='http://www.facebook.com' target='view_window'>
          <FaFacebook className='footerEachLogo' />
        </a>
        <a href='http://www.twitter.com' target='view_window'>
          <FaTwitter className='footerEachLogo' />
        </a>
        <a href='http://www.linkedin.com' target='view_window'>
          <FaLinkedin className='footerEachLogo' />
        </a>
        <a href='http://www.github.com' target='view_window'>
          <FaGithub className='footerEachLogo' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
