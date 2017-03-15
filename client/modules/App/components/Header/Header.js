import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

import logo from '../../../../assets/img/logo/iconweb2.png';

export function Header(props) {
  const curentUser = props.curentUser;
  const languageNodes = props
    .intl
    .enabledLanguages
    .map(lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>);
  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <ul>

          <li><FormattedMessage id="switchLanguage" /></li>
          {
            languageNodes
          }
        </ul>
      </div>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <Link to="/">
            Home
          </Link>
          <Link to="/">
            Hot
          </Link>
          <Link to="/">
            Top
          </Link>
          <Link to="/">
            Fresh
          </Link>
        </h1>
        {
          curentUser._id && curentUser
            ? <a className={styles['add-post-button']} href="#" onClick={props.toggleAddPost}>
              <FormattedMessage
                id="addPost"
              />
            </a>
            : <div>
              <a className={styles['add-post-button']} href="#" onClick={props.toggleRegister}>Register</a>
              <a className={styles['add-post-button']} href="#" onClick={props.toggleLogin}>Login</a>
            </div>
        }
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  curentUser: PropTypes.object.isRequired,
};

export default Header;
