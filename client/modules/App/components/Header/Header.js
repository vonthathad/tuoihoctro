import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
// import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';
import nav from '../../../../assets/css/nav.css';
import logo from '../../../../assets/img/logo/iconweb2.png';

export function Header() {
  return (
    <nav className="nav navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            ><span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="index.html"><img
              src={logo}
              className={styles.logo}
              alt="Tuổi học trò"
            /></a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="index.html">Home</a></li>
              <li><a href="hot.html">Hot</a></li>
              <li><a href="trending.html">Top</a></li>
              <li><a href="fresh.html">Fresh</a></li>
              <li className="dropdown"><a
                href="index.html#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button" aria-expanded="false"
              >More <span className="caret"></span></a>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="gif.html">GIF</a></li>
                  <li><a href="category-4-comic-1.html">Comic</a></li>
                  <li><a href="category-7-cool-1.html">Cool</a></li>
                  <li><a href="category-3-cute-1.html">Cute</a></li>
                  <li><a href="category-5-food-1.html">Food</a></li>
                  <li><a href="category-1-geeky-1.html">Geeky</a></li>
                  <li><a href="category-2-meme-1.html">Meme</a></li>
                  <li><a href="category-6-wtf-1.html">WTF</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a data-toggle="modal" data-target="#myModal" href="index.html#">Đăng nhập</a></li>
              <li><a data-toggle="modal" data-target="#modalRegister" href="index.html#">Đăng ký</a></li>
              <li className="btn-upload"><a
                href="index.html#"
              >Upload</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
