import React from 'react';

// Import Style
import styles from './index.css';

// Import Images
// import bg from '../../header-bk.png';

export function Footer() {
  return (
    <footer className={styles['main-footer']}>
      <div className="container">
        <div className={styles['pull-middle']}>
          <a href="about_us.html">About Us</a> | <a href="privacy_policy.html">Privacy Policy</a> | <a
            href="tos.html"
          >Terms of Use</a> | <a href="dmca.html">DMCA</a> | <a href="rss.html">Rss Feeds</a>|
          <a href="contact_us.html">Contact Us</a>
        </div>
        <div className={`${styles['pull-middle']} ${styles['copyright-note']}`}>&#169; 2017 Tuổi học trò. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
