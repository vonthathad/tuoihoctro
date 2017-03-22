import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './index.css';
// import bootstrap from '../../assets/styles/bootstrap.css';
// import fontAwesome from '../../assets/styles/font-awesome.css'
import logo from '../../../assets/logos/iconweb.png';

export function Header(props) {
  const curentUser = props.curentUser;
  return (
    <nav className={`nav navbar-inverse navbar-fixed-top ${styles['navbar-inverse']}`}>
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
            <a className={`navbar-brand ${styles['navbar-brand']}`} href="/"><img
              src={logo}
              className={styles.logo}
              alt="Tuổi học trò"
            /></a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className={`nav navbar-nav ${styles['navbar-nav']} ${styles['navbar-text']}`}>
              <li><a>Home</a></li>
              <li><a>Hot</a></li>
              <li><a>Top</a></li>
              <li><a>Fresh</a></li>
              <li className="dropdown"><a
                href="index.html#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button" aria-expanded="false"
              >More <span className="caret"></span></a>
                <ul className="dropdown-menu" role="menu">
                  <li><a >GIF</a></li>
                  <li><a >Comic</a></li>
                  <li><a >Cool</a></li>
                  <li><a >Cute</a></li>
                  <li><a >Food</a></li>
                  <li><a >Geeky</a></li>
                  <li><a >Meme</a></li>
                  <li><a >WTF</a></li>
                </ul>
              </li>
            </ul>
            {
              curentUser._id && curentUser
                ? <ul className={`nav navbar-nav navbar-right ${styles['navbar-right']}`}>
                  <li className="btn-upload"><a>Xin chào: {curentUser.username}</a></li>

                  <li className="btn-upload"><a onClick={props.toggleAddPost}>Upload</a></li>
                  <li className="btn-upload"><a onClick={props.logout}>Đăng xuất</a></li>
                </ul>
                : <ul className={`nav navbar-nav navbar-right ${styles['navbar-right']}`}>
                  <li><a onClick={props.toggleLogin}>Đăng nhập</a></li>
                  <li><Link to="/admin">Admin</Link></li>
                  <li><a onClick={props.toggleRegister}>Đăng ký</a></li>
                </ul>
            }
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
  toggleRegister: PropTypes.func.isRequired,
  curentUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Header;
