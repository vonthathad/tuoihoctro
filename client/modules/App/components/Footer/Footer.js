import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';

// Import Images
import bg from '../../header-bk.png';

export function Footer() {
  return (
    <div className={styles.footer} style={{ background: `#FFF url(${bg}) center` }}>
      <div >
        <p>About Us | Privacy Policy | Terms of Use | DMCA | Rss Feeds | Contact Us</p>
        <p>&#169; 2017 <FormattedMessage id="twitterMessage" /></p>
      </div>
    </div>
  );
}

export default Footer;
