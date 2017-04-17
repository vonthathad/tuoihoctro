import React from 'react';

// Import Style
import styles from './index.css';

// Import Images
// import bg from '../../header-bk.png';

const Footer = () => {
  return (
    <footer className={styles['main-footer']}>
      <div className="container">
        <div className={styles['pull-middle']}>
          <a href="">Về chúng tôi</a> | <a href="">Chính sách</a> | <a
          href=""
        >Điều luật</a> |
          <a href=""> Liên hệ</a>
        </div>
        <div className={`${styles['pull-middle']} ${styles['copyright-note']}`}>&#169; 2017 Tuổi học trò. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
