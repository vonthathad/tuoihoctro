import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
// Import Style
import st from './index.css';
import logo from '../../../assets/logos/iconweb.svg';
// import NavBar from '../../layouts/NavBar/NavBar';
// import logo from '../../../assets/images/ribbon.svg';
class Header extends Component {
  constructor(props) {
    super(props);
    this.scrollTop = this.scrollTop.bind(this);
    this.burgerToggle = this.burgerToggle.bind(this);
  }
  componentDidMount = () => {
    document.addEventListener('click', this.handleClick, false);
  }
  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClick, false);
  }
  handleClick = e => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      const linksEl = this.narrowLinkRef;
      linksEl.style.display = 'none';
    }
  }
  scrollTop() {
    window.scrollTo(0, 0);
  }

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
    // console.log(curentUser.role);
    return (
      <nav className={`navbar-fixed-top ${st['header-wrapper']}`}>
        <div className={`${st['nav-wide']} container`}>
          <Link to="/" className={`navbar-brand ${st['logo-wrapper']}`} onClick={this.scrollTop}>
            <img
              src={logo}
              className={st.logo}
              alt="Tuổi học trò"
            />
          </Link>
          <div className={st['wide-div']}>
            <ul className={`${st.menu} nav navbar-nav`}>
              <li><Link to="/order/hot">Đừng bỏ lỡ</Link></li>
              <li><Link to="/order/top">Cũ mà hay</Link></li>
              <li><Link to="/order/created">Mới nhất</Link></li>
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
                  {curentUser.role === 'admin' &&
                  <li className="btn-upload"><a onClick={this.props.toggleAddPost}>Upload</a></li>}
                  <li className="btn-upload"><a onClick={this.props.logout}>Đăng xuất</a></li>
                </ul>
                :
                <ul className={`${st.rightMenu} nav navbar-nav navbar-right`}>
                  <li><a onClick={this.props.toggleLogin}>Đăng nhập</a></li>
                  <li><a onClick={this.props.toggleRegister}>Đăng ký</a></li>
                </ul>
            }
          </div>
        </div>
        <div className={`${st['nav-narrow']} container`}>
          <div className={st['mobile-header-nav']}>
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
          </div>
          <div
            className={st['narrow-links']}
            ref={narrowLinkRef => {
              this.narrowLinkRef = narrowLinkRef;
            }}
          >
            {/* <a onClick={() => {
              this.burgerToggle();
            }}
            ></a>*/}
            <li><Link to="/" onClick={this.burgerToggle}>Home</Link></li>
            <li><Link to="/order/hot" onClick={this.burgerToggle}>Đừng bỏ lỡ</Link></li>
            <li><Link to="/order/top" onClick={this.burgerToggle}>Cũ mà hay</Link></li>
            <li><Link to="/order/created" onClick={this.burgerToggle} >Mới nhất</Link></li>
            {
              curentUser._id && curentUser ?
                <li>
                  {curentUser.role === 'admin' && <a onClick={() => {
                    this.props.toggleAddPost();
                    this.burgerToggle();
                  }}>Upload</a>}
                  <a
                    onClick={() => {
                      this.props.logout();
                      this.burgerToggle();
                    }}
                  >Đăng xuất</a>
                  <Link to="/admin">Admin</Link>
                </li>
                :
                <li>
                  <a
                    onClick={() => {
                      this.props.toggleLogin();
                      this.burgerToggle();
                    }}
                  >Đăng nhập</a>
                  <a
                    onClick={() => {
                      this.props.toggleRegister();
                      this.burgerToggle();
                    }}
                  >Đăng ký</a>
                </li>
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
