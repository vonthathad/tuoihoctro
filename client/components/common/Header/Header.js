import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// Import Style
import st from './index.css';
import logo from '../../../assets/logos/iconweb.svg';
// import NavBar from '../../layouts/NavBar/NavBar';
// import logo from '../../../assets/images/ribbon.svg';
class Header extends Component {
  // constructor(props) {
  //   super(props);
  // }

  burgerToggle = () => {
    const linksEl = this.narrowLinkRef;
    if (linksEl.style.display === 'block') {
      linksEl.style.display = 'none';
    } else {
      linksEl.style.display = 'block';
    }
  };

  render() {
    const curentUser = this.props.curentUser;
    return (
      <nav className={`navbar-fixed-top ${st['header-wrapper']}`}>
        <div className={`${st.body_ribbon} ${st.esi_ribbon}`}></div>
        <div className={`${st['nav-wide']} container`}>
          <Link to="/" className={`navbar-brand ${st['logo-wrapper']}`}>
            <img
              src={logo}
              className={st.logo}
              alt="Tuổi học trò"
            />
          </Link>
          <div className={st['wide-div']}>
            <ul className={`${st.menu} nav navbar-nav`}>
              <li><a href="hot.html">Nóng hổi</a></li>
              <li><a href="trending.html">Top</a></li>
              <li><a href="fresh.html">Mới</a></li>
              <li className="dropdown"><a
                href="index.html#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button" aria-expanded="false"
              >Thêm <span className="caret"></span></a>
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
             {
               curentUser._id && curentUser ?
                 <ul className={`${st.rightMenu} nav navbar-nav navbar-right`}>
                   <li className="btn-upload">
                     <a className={st.userinfo}>
                      {curentUser.username}
                       <img src={curentUser.avatar} alt={curentUser.username} height={30} width={30} />
                     </a>
                   </li>
                   <li className="btn-upload"><a onClick={this.props.toggleAddPost}>Upload</a></li>
                   <li className="btn-upload"><a onClick={this.props.logout}>Đăng xuất</a></li>
                 </ul>
                 :
                 <ul className={'nav navbar-nav navbar-right'}>
                   <li><a onClick={this.props.toggleLogin}>Đăng nhập</a></li>
                   <li><a onClick={this.props.toggleRegister}>Đăng ký</a></li>
                 </ul>
             }
          </div>
        </div>
        <div className={`${st['nav-narrow']} container`}>
          <div className={st['mobile-logo-wrapper']}>
            <a className={`navbar-brand ${st['logo-wrapper']}`} href="/">
              <img
                src={logo}
                className={st.logo}
                alt="Tuổi học trò"
              />
            </a>
          </div>
          <div className={st['mobile-menu-icon-wrapper']}>
            <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
          </div>
          <div
            className={st['narrow-links']}
            ref={narrowLinkRef => {
              this.narrowLinkRef = narrowLinkRef;
            }}
          >
            <a onClick={() => { this.burgerToggle(); }}>Home</a>
            <a href="hot.html">Hot</a>
            <a href="trending.html">Top</a>
            <a href="fresh.html">Fresh</a>
            {
              curentUser._id && curentUser ?
                <div>
                  <a onClick={() => { this.props.toggleAddPost(); this.burgerToggle(); }}>Upload</a>
                  <a onClick={() => { this.props.logout(); this.burgerToggle(); }}>Đăng xuất</a>
                  <Link to="/admin">Admin</Link>
                </div>
                :
                <div>
                  <a onClick={() => { this.props.toggleLogin(); this.burgerToggle(); }}>Đăng nhập</a>
                  <a onClick={() => { this.burgerToggle(); }}>Đăng nhập</a>

                  <a onClick={() => { this.props.toggleRegister(); this.burgerToggle(); }}>Đăng ký</a>
                </div>
            }
          </div>
        </div>
      </nav>
    );
  }
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
