import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {
  constructor() {
    super();
    this.state = {
      imgSrc: '',
    };
  }
  addPost = () => {
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    const fileRef = this.state.file;
    const category = 'funny';
    if (titleRef.value && contentRef.value && fileRef) {
      this.props.addPost(titleRef.value, category, fileRef);
      titleRef.value = contentRef.value = '';
    }
  };
  loadFile(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        imgSrc: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }
  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Đăng bài mới</h2>
          <input placeholder="Tiêu đề" className={styles['form-field']} ref="title" />
          <textarea placeholder="Nội dung" className={styles['form-field']} ref="content" />
          <input type="file" ref="file" onChange={(e) => this.loadFile(e)} />
          <Link to={this.state.imgSrc} target="_blank">
            <img src={this.state.imgSrc} alt="" />
          </Link>
          <a className={styles['post-submit-button']} onClick={this.addPost}><FormattedMessage id="submit" /></a>
        </div>
        <div className={styles.backgroundPost}>
        </div>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PostCreateWidget);
